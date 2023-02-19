import Navbar from '@/Components/Navbar'
import React, { useEffect, useState, Dispatch } from 'react'
import { postDataType } from '@/Components/CreateModal.jsx';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux'
import { rootReducertype } from '@/redux/store'
import ProfileCard from '../Components/ProfileCard';
import { AiOutlineSetting } from 'react-icons/ai';
import { signoutUser } from '@/redux/auth/auth.actions';
import PostCard from '@/Components/PostCard';
import { getOneUserPost } from '@/redux/users_post/uesr.action';
type dataTypes = {
    data:postDataType[]
  }
const Profile=(props:dataTypes)=>{
    // const {data} = props;
    const user = useSelector((val: rootReducertype) => val?.user?.user)
    const dispatch:Dispatch<any> = useDispatch()
    const [showPosts,setShowPosts] = useState(true)
    const [allPosts,setAllPosta] = useState([])
useEffect(()=>{
    dispatch(getOneUserPost(user?.name))
    // dispatch(signoutUser())
},[dispatch, user])
return <>
<Navbar />
<div className=' px-1 md:m-auto py-16' >
<div className='flex items-center justify-around md:w-[40%] m-auto'>
    <div className='border-2 rounded-full relative border-blue-300'>
    <Image  className="rounded-full" src={user?.profile}  width={80} height={80} alt="user.name"/>
    <div className='w-4 h-4 absolute bottom-2 right-0 rounded-full bg-green-500' ></div>
    </div>
    <div className='flex flex-col items-end' >
    <p className='text-xl border-b-2 border-blue-300 px-2 mb-2'>{user?.name}</p>
    <div className='flex items-center cursor-pointer'>
    <p className='text-gray-200 hover:underline'>username</p>
    <AiOutlineSetting className='mx-2'/>
    </div>
    </div>
</div>
<div className='md:ml-52' >
<div className='flex justify-evenly mt-4'>
    <p onClick={()=>setShowPosts(true)} className='font-semibold border-b-2 cursor-pointer px-2'>All Posts</p>
    <p onClick={()=>setShowPosts(false)} className='font-semibold border-b-2 cursor-pointer px-2'>Bookmarks</p>
</div>
{
    showPosts ?<ProfileCard />:<div> Bookmarks will be shown here </div>
}
</div>
{/* <div className=''>
    <ProfileCard />
</div> */}
</div>
</>
  }



export default Profile;