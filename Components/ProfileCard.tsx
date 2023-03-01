import { getComments } from '@/redux/comments/comments.action'
import React,{useState,Dispatch} from 'react'
import { AiFillHeart, AiFillMessage } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import CardSwiper from './CardSwiper'
import { postDataType } from './CreateModal'
import PostDetails from './PostDetails'
type postdata = {
  data:postDataType
}
const ProfileCard = ({data}:postdata) => {
  const dispatch:Dispatch<any> = useDispatch()
  const [modal,setModal] = useState(false)
  const closePostData = ()=>{
    setModal(false)
  }
  const showPosts = (data:postDataType)=>{
    setModal(true);
    if(data._id){
      dispatch(getComments(data._id))
    }
  }
  return (
    <>
    <div onClick={()=>showPosts(data)} className='border-2 border-gray-600 rounded-xl overflow-hidden' >
        <CardSwiper data={data.imgUrl} />
        <div className='flex justify-around my-2'>
        <p className='flex justify-center items-center'>{data.likes.length} <AiFillHeart className='mx-2' /> </p>
        <p className='flex justify-center items-center'>{data.comments}<AiFillMessage className='mx-2'/> </p>
        </div>
    </div>
   { modal&&<PostDetails data={data} closeModal={closePostData} />}
    </>
  )
}

export default ProfileCard