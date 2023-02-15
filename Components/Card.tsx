import React,{useState,useEffect,Dispatch} from 'react'
import { FiMoreHorizontal, FiBookmark, FiSend} from 'react-icons/fi'
import { AiFillHeart, AiOutlineDelete, AiOutlineEdit, AiOutlineHeart } from 'react-icons/ai'
import { BiCommentAdd, BiMessageRounded, BiMessageSquareAdd} from 'react-icons/bi'
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
import { editPost, getAllPosts } from '@/redux/postdata/post.actions'
import Router  from 'next/router'
export const elem:postDataType = {caption:"",
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
type objData = {value:any}
const Card = () => {
    // =========================Hooks at Top ============================
const {del_error, del_loading, loading_post, error_post,postData}=useSelector((val:rootReducertype)=>val?.allPosts)
const user = useSelector((val:rootReducertype)=>val?.user?.user)
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
const [comment,setComment] = useState('')
const [page,setPage] = useState(1)

useEffect(()=>{
    dispatch(getAllPosts(page))
},[dispatch, page])
console.log(user)
useEffect(()=>{
setPost(postData)
},[postData])
// =============================Various Functions & Onclick Events=================================

const toggleCaption = (id: string | undefined)=>{
    setExpended(!expended)
  let showCaption = postData.map((el: { _id: string | undefined })=>{
        if(el._id==id){
            let updatedData = {...el,show_Caption:expended}
            return updatedData;
        }else{
            return el
        }
    })
    setPost(showCaption)
}
const handlePostDetails = (el:postDataType)=>{
    if(user){
    setModal(true)
setPostObj(el)       
}else{
    Router.push("/login")
}
}
const closePostDtlModal = ()=>{
    setModal(false)
}
const handlePostEdit = (el:postDataType)=>{
    if(user){
        setModalEdit(true);
        handleEditPost(el._id)
        setPostObj(el)
    }else{
        Router.push("/login")
    }
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
    if(user){
var newComment={
    user:user.name,
    comment:comment
}
el.comments.push(newComment)
dispatch(editPost(el))
setAddComment(true)
setComment("")
el.comment=""
}else{
    Router.push("/login")
}
}

// likes

const handleLike=(state:boolean,el:postDataType)=>{
if(user){
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
}else{
    Router.push("/login")
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
                    <div className='mx-2 font-semibold'> <p>{el?.owner}</p>
                    <p className='text-sm font-semibold text-gray-400'> {el?.posted_on} </p>
                    </div>
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
                el.likes.includes(user?.name) ? <AiFillHeart onClick={()=>handleLike(false,el) } className='text-2xl cursor-pointer text-red-500 animate-in zoom-in'  />
                : <AiOutlineHeart onClick={()=>handleLike(true,el)} className='text-2xl cursor-pointer animate-in zoom-in' /> 
               }
                        <BiMessageRounded onClick={()=>handlePostDetails(el)} className='text-2xl cursor-pointer mx-2' />
                        <FiBookmark className='text-2xl cursor-pointer' />
                        {/* <FiSend className='text-2xl cursor-pointer' /> */}
                    </div>
                </div>
                <div className='border-b-2 border-gray-600 pb-3'>
              <div className='flex items-center' >
                <p>
                {
                 el?.likes.length==0?"No Likes":el.likes.length==1?`1 Like `:` ${el.likes.length} Likes`
                }
                </p>  
                <HiDotsVertical className=''/>          
                <p>
                {
                el?.comments?.length==1?`No Comments`:el.comments.length===2?"1 Comment":  `${el.comments.length} Comments`
                }
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
                <input value={el.comment} type="text" placeholder='add a comment...' onChange={(e)=>handleCommentChange(e)} className='outline-none bg-transparent my-3 w-3/5' />
                <button onClick={()=>handleComment(el)} disabled={comment.length<6} className={`font-bold bg-black/60 px-3 rounded-md ${comment.length<6?"text-gray-500":""}`}>post</button>
                </div>
            </div>
          {(el?.edit_post)?<div onClick={()=>handleEditPost(el.id)} className='fixed h-screen flex justify-center items-center right-0 top-0 left-0 bg-black/20 z-10'> <div onClick={(e)=>{e.stopPropagation()}} className='z-10 bg-black/70 font-bold p-10 rounded-lg animate-in zoom-in'>
            <p onClick={()=>handlePostEdit(el)} className='border-b-2 border-gray-500 my-4 text-lime-100 cursor-pointer flex items-center'><AiOutlineEdit className='mr-2' /> Edit Post</p>
            <p onClick={()=>openAddImgModal(el)} className='border-b-2 border-gray-500 my-4 text-lime-100 cursor-pointer flex items-center'> <BiMessageSquareAdd className='mr-2' /> Add photos</p>
            <p onClick={()=>handleDelModal(el)} className='border-b-2 border-gray-500 my-4 text-red-300 cursor-pointer flex items-center'> <AiOutlineDelete className='mr-2' /> Delete Post</p>
          </div> </div> :""}
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