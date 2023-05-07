import { getComments } from '@/redux/comments/comments.action'
import React,{useState,Dispatch} from 'react'
import { AiFillHeart, AiFillMessage } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import CardSwiper from './CardSwiper'
import PostDetails from './PostDetails'
import { postDataType } from '@/helpers/dataTypes'
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
    <div onClick={()=>showPosts(data)} className='border-2 border-gray-600 rounded-xl overflow-hidden relative group' >
        <CardSwiper data={data} />
        <div className='justify-center items-center my-2 absolute z-20 top-0 w-full h-full bottom-0 bg-black/30 hidden group-hover:flex'>
        <p className='flex justify-center items-center mx-4 text-4xl text-gray-200'>{data.likes.length} <AiFillHeart className='mx-2' /> </p>
        <p className='flex justify-center items-center text-4xl text-gray-200'>{data.comments_count}<AiFillMessage className='mx-2'/> </p>
        </div>
    </div>
   { modal&&<PostDetails data={data} closeModal={closePostData} />}
    </>
  )
}

export default ProfileCard