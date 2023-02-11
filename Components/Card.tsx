import React,{useState,useEffect,Dispatch} from 'react'
import { FiMoreHorizontal, FiBookmark, FiSend} from 'react-icons/fi'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { BiCommentAdd, BiMessageRounded} from 'react-icons/bi'
import {HiDotsVertical} from 'react-icons/hi'
import CardSwiper from './CardSwiper'
import { useSelector,useDispatch } from 'react-redux'
import { postDataType } from './CreateModal'
import { rootReducertype } from '@/redux/store'
import Image from 'next/image'
import Loader from './Loader'
import PostDetails from './PostDetails'
import ModalEdit from './ModalEdit'
import DeleteModal from './DeleteModal'
import AlertModal from './AlertModal'
import AddMorePhotos from './AddMorePhotos'
import { editPost } from '@/redux/postdata/post.actions'
const elem:postDataType = {caption:"",
imgUrl:[""],
owner: "",
owner_profile:"",
likes: [],
posted_on:"",
comments:[
  {
    user:"",
    comment:""
  }
],
show_Caption:false,
edit_post:false,
_id:""
}
const Card = () => {
    // =========================Hooks at Top ============================
const {del_error, del_loading, loading_post, error_post,postData}=useSelector((val:rootReducertype)=>val?.allPosts)
const user = useSelector((val:rootReducertype)=>val?.user?.user)
const [comment,setComment] = useState("")
const dispatch:Dispatch<any>= useDispatch();
const [expended,setExpended] = useState(true)
const [post,setPost] = useState([])
const [postObj, setPostObj] = useState(elem)
const [modal, setModal] =useState(false)
const [modalEdit, setModalEdit] =useState(false)
const [postEdit, setPostEdit] = useState(true)
const [delModal, setDelModal] = useState(false)
const [addImgModal,setAddImgModal] = useState(false)
const [addComment,setAddComment]=useState(false)
useEffect(()=>{
setPost(postData?.reverse())
console.log(postData)
},[postData])
// =============================Various Functions & Onclick Events=================================

const toggleCaption = (id: string | undefined)=>{
    setExpended(!expended)
  let showCaption = postData.map((el: { _id: string | undefined })=>{
        if(el._id==id){
            let updatedData = {...el,show_Caption:expended}
            console.log(el)
            return updatedData;
        }else{
            return el
        }
    })
    setPost(showCaption)
}
const handlePostDetails = (el:postDataType)=>{
    setModal(true)
setPostObj(el)
}
const closePostDtlModal = ()=>{
    setModal(false)
}
const handlePostEdit = (el:postDataType)=>{
    setModalEdit(true);
    handleEditPost(el._id)
    setPostObj(el)
}
const closePostEditModal = ()=>{
    setModalEdit(false)
}
const handleEditPost = (id:string|undefined)=>{
    setPostEdit(!postEdit)
   let showpostData = postData.map((e: { _id: string | undefined })=>{
        if(e._id===id){
            let newData = {...e,edit_post:postEdit}
            return newData
        }else{
            return e
        }
    })
    setPost(showpostData)
}

const handleDelModal = (el:postDataType)=>{
    setDelModal(true)
    handleEditPost(el._id)
    setPostObj(el)
}
const closeDelModal = ()=>{
    setDelModal(false);
}
const openAddImgModal = (el:postDataType)=>{
    setAddImgModal(true)
    handleEditPost(el._id)
    setPostObj(el)
}
const closeAddImgModal = ()=>{
    setAddImgModal(false)
}

const handleCommentChange = (e: { target: { value: React.SetStateAction<string> } })=>{
    setComment(e.target.value)
}


// comments
const handleComment=(el:postDataType)=>{
var newComment={
    user:user.name,
    comment:comment
}
el.comments.push(newComment)
dispatch(editPost(el))
setAddComment(true)
setComment("")
}

// likes

const handleLike=(state:boolean,el:postDataType)=>{
if(state){
    el.likes.push(user.name)
    dispatch(editPost(el))
}
else{
let newLikedel=  el.likes.filter((el)=>{
return el!==user.name
  })
  el.likes= newLikedel
  dispatch(editPost(el))
}
}
if(loading_post){
    return <Loader text="Loading..." />
}
if(error_post){
    return <div>Something Went Wrong.....</div>
}
return (
        <>
        { loading_post||
        post?.map((el:postDataType,id)=>
        <div key={id} className='mt-10 border-[1px] border-gray-600 rounded-md relative' >
            <div className='flex w-full justify-between items-center'>
                <div className='flex items-center h-12' >
                    <div className='md:w-8 md:h-8 overflow-hidden h-10 w-10 rounded-full mx-2'>
                        <Image src={el?.owner_profile} alt="User's Photo" width={200} height={200} />
                    </div>
                    <div className='mx-2 font-semibold'>{el?.owner}</div>
                    <div className='text-sm text-gray-400'> {el?.posted_on} </div>
                </div>
               {el.owner===user?.name? <div className='mr-2' >
                    <FiMoreHorizontal onClick={()=>handleEditPost(el._id)} className='font-bold text-xl cursor-pointer' />
                </div>:''}
            </div>
            <div className='h-fit my-2' >
                <CardSwiper data={el?.imgUrl} />
            </div>
            <div className='p-2' >
                <div className='postactions flex w-full justify-between' >
                    <div className='my-1 flex items-center' >
               {
                el.likes.includes(user?.name) ? <AiFillHeart onClick={()=>handleLike(false,el) } className='text-2xl cursor-pointer text-red-500'  />
                : <AiOutlineHeart onClick={()=>handleLike(true,el)} className='text-2xl cursor-pointer' /> 
               }
                        <BiMessageRounded onClick={()=>handlePostDetails(el)} className='text-2xl cursor-pointer mx-2' />
                        <FiSend className='text-2xl cursor-pointer' />
                    </div>
                    <div className='pr-4'>
                        <FiBookmark className='text-2xl cursor-pointer' />
                    </div>
                </div>
                <div className='border-b-2 border-gray-600 pb-3'>
              <div style={{display:"flex"}}>
                <p>
                {el?.likes?.length} likes
                </p>
                <HiDotsVertical style={{ marginTop:"5px" }}/>
            
                <p>
                {el?.comments?.length-1} Comments
                </p>
                </div>
                <p >
                    <span className='font-semibold mx-2'>{el?.owner}</span>
                    {
                    el.show_Caption?<span className='mx-2' >{el.caption}</span>:
                    el?.caption.split(' ').slice(0,5).join(' ')+"..."}
                    <span className='text-sm text-gray-500 cursor-pointer' onClick={()=>toggleCaption(el._id)} > {el.show_Caption?"less":"more"}</span>
                </p>
                <p className='cursor-pointer underline text-sm text-gray-200 w-fit' onClick={()=>handlePostDetails(el)} >
                    view comments
                </p>
                </div>
                <div className='flex items-center justify-around'>
                    <BiCommentAdd />
                <input value={comment} type="text" placeholder='add a comment...' onChange={handleCommentChange} className='outline-none bg-transparent my-3 w-3/5' />
                <button onClick={()=>handleComment(el)} disabled={comment.length<6} className={`font-bold bg-black/60 px-3 rounded-md ${comment.length<6?"text-gray-500":""}`}>post</button>
                </div>
            </div>
          {(el?.edit_post)?<div className='px-4 h-24 w-40  absolute top-10 right-0 z-10 bg-black/70 text-sm font-bold'>
            <p onClick={()=>handlePostEdit(el)} className='border-b-2 border-gray-500 text-lime-400 cursor-pointer'>Edit Post</p>
            <p onClick={()=>openAddImgModal(el)} className='border-b-2 border-gray-500 text-lime-400 cursor-pointer'>Add photos</p>
            <p onClick={()=>handleDelModal(el)} className='border-b-2 border-gray-500 text-red-500 cursor-pointer'>Delete Post</p>
          </div>:""}
        </div>
        )}
        {modal&&<PostDetails data={postObj} closeModal={closePostDtlModal}  />}
        {modalEdit&&<ModalEdit data={postObj} closeModal={closePostEditModal}  />}
        {delModal&&<DeleteModal id={postObj?._id} closeModal={closeDelModal}  />}
        {del_error&&<AlertModal color="bg-red-600" text='Error in Deleting the post. Try again' />}
        {addImgModal&&<AddMorePhotos closeAddMorePhotos={closeAddImgModal} data={postObj} />}
        {addComment&&<AlertModal text='Comment Added'  color="bg-green-500"/>}
        </>
    )
}

export default Card