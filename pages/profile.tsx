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
import { GetServerSideProps } from 'next';
import { verifyAuth } from '@/lib/auth';
import Router from 'next/router';
import Link from 'next/link';
type dataTypes = {
    data:postDataType[]
  }
const Profile=()=>{
    const [logoutMenu, setLogoutMenu] = useState(false)
    const user = useSelector((val: rootReducertype) => val?.user?.user)
    const dispatch:Dispatch<any> = useDispatch()
    const [showPosts,setShowPosts] = useState(true)
    const [allPosts,setAllPosta] = useState([])
useEffect(()=>{
    // dispatch(getOneUserPost(user.id))
},[dispatch, user])
const handleLogoutMenu = (e: { stopPropagation: () => void; })=>{
    e.stopPropagation()
    setLogoutMenu(true)
}
const handleLogout = ()=>{
    dispatch(signoutUser())
   Router.push("/login")
}
return <>
<Navbar />
<div onClick={()=>setLogoutMenu(false)} className=' px-1 md:m-auto py-16' >
<div className='flex items-center justify-around md:w-[40%] m-auto'>
    <div className='border-2 rounded-full relative border-blue-300'>
    <Image  className="rounded-full" src={user?.profile}  width={80} height={80} alt="user.name"/>
    <div className={`w-4 h-4 absolute bottom-2 right-0 rounded-full ${user?"bg-green-500":"bg-red-500"}`} ></div>
    </div>
    <div className='flex flex-col items-end' >
    <p className='text-xl border-b-2 border-blue-300 px-2 mb-2'>{user?.name}</p>
    <div onClick={handleLogoutMenu} className='flex items-center relative'>
    <p className='text-gray-200 hover:underline'>username</p>
    <AiOutlineSetting className='mx-2 cursor-pointer'/>
   {logoutMenu&&<div onClick={(e)=>{e.stopPropagation()}} className='w-full h-20 absolute top-8 right-0 bg-black/60 text-center'> 
   <button className='border-b-[1px] border-blue-500 rounded-md pb-2 w-11/12'>Edit</button>
   <button onClick={handleLogout} className='mt-1 pb-2 border-b-[1px] border-blue-500 rounded-md w-11/12'>Logout</button>
    </div>}
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

export const getServerSideProps:GetServerSideProps = async(context)=>{
    const {req,res}  = context
    
return {
    props:{
        data:{ }
    }
}
}

export default Profile;