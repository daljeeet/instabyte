import Navbar from '@/Components/Navbar'
import React, { useEffect, useState, Dispatch, createRef, useRef} from 'react'
import { postDataType } from '@/Components/CreateModal.jsx';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux'
import { rootReducertype } from '@/redux/store'
import ProfileCard from '../Components/ProfileCard';
import { AiOutlineCheck, AiOutlineEdit, AiOutlinePoweroff, AiOutlineSetting } from 'react-icons/ai';
import { signoutUser } from '@/redux/auth/auth.actions';
import PostCard from '@/Components/PostCard';
import { getOneUserPost } from '@/redux/users_post/uesr.action';
import { GetServerSideProps } from 'next';
import Router from 'next/router';
import CardSwiper from '@/Components/CardSwiper';

// type dataTypes = {
//     data:postDataType[]
//   }
const Profile=()=>{
    // const { del_error,loading_post, error_post, postData } = useSelector((val: rootReducertype) => val?.allPosts)
    const [inputval,setInputval] = useState("")
    const inputRef = useRef<HTMLInputElement>(null);
    const [editUser, setEditUser] = useState(false)
    const {userPosts} =useSelector((val:rootReducertype)=>val.userPost)
    const [logoutMenu, setLogoutMenu] = useState(false)
    const user = useSelector((val: rootReducertype) => val?.user?.user)
    const dispatch:Dispatch<any> = useDispatch()
    const [showPosts,setShowPosts] = useState(true)
    const [allPosts,setAllPosta] = useState([])
useEffect(()=>{
    if(user){
        dispatch(getOneUserPost(user.id))
    }
},[dispatch, user])
useEffect(()=>{
    setAllPosta(userPosts)

},[userPosts])
const handleLogoutMenu = (e: { stopPropagation: () => void; })=>{
    e.stopPropagation()
    setLogoutMenu(true)
}
const handleLogout = ()=>{
    dispatch(signoutUser())
    setLogoutMenu(false)
   Router.push("/login")
}
const handleEdit = ()=>{
    setEditUser(true)
    setLogoutMenu(false)
    setTimeout(() => {
        if (inputRef.current !== null) {
            inputRef.current.focus();
       }
    }, 500);
}
const usernameChange = ()=>{
    setEditUser(false)
    
}

return <>
<Navbar />
<div onClick={()=>setLogoutMenu(false)} className='px-1 md:m-auto py-14' >
<div className='flex h-40 items-center justify-between md:w-[50%] m-auto relative'>
    <div className='bg-blue-900 absolute w-full h-full z-0'> </div>
    <div className='border-2 ml-4 rounded-full relative border-blue-400/60'>
    <Image  className="rounded-full" src={`${user?user.profile:"/demo_img.png"}` }  width={80} height={80} alt="user.name"/>
    <div className={`w-4 h-4 absolute bottom-2 right-0 rounded-full ${user?"bg-green-500":"bg-red-500"}`} ></div>
    </div>
    <div className='flex flex-col items-center mr-4 bg-black/50 z-10 py-2 relative'>
    <p className='text-xl border-b-2 border-blue-300/40 px-4 mb-2 pb-2 z-10'>{ user?.name}</p>
        {editUser?<div className='flex items-center justify-end w-max-lg'>
            <input ref={inputRef} type="text" placeholder='username..' className='md:w-2/3 w-1/2 mx-0 pl-2 bg-transparent rounded-md outline-none border-2' onChange={(e)=>{setInputval(e.target.value)}} value={inputval} />
            <AiOutlineCheck onClick={usernameChange} className='mx-2 cursor-pointer font-bold text-xl'/>
        </div>:<div className='flex items-center'>
            
    <p className='text-gray-200 hover:underline font-semibold'>{(user?.name)?.split(' ')[0]}</p>
    <AiOutlineSetting onClick={handleLogoutMenu} className='mx-2 cursor-pointer'/>
        </div>}
   {logoutMenu&&<div onClick={(e)=>{e.stopPropagation()}} className='w-full h-20 absolute top-[100%] right-0 left-0 bg-black text-center z-10 rounded-md '> 
   <button onClick={handleEdit} className='border-b-[1px] border-blue-500 rounded-md pb-2 w-11/12 text-sm font-semibold flex justify-evenly items-center'> <AiOutlineEdit /> <span>Edit</span></button>
   <button onClick={handleLogout} className='mt-1 pb-2 border-b-[1px] border-blue-500 rounded-md w-11/12 text-sm font-semibold flex justify-evenly items-center'><AiOutlinePoweroff /> <span>Logout</span></button>
    </div>}
    </div>
</div>
<div className='md:ml-52 md:px-10 px-2'>
    <p className='font-semibold text-lg mt-4 bg-black/60 px-4 rounded-full text-center'>Your Posts</p>
<div className='grid md:grid-cols-3 gap-5 my-6 grid-cols-1'>
    {allPosts?.map((el:postDataType,id:number)=><div key={id} className='h-fit rounded-lg overflow-hidden ' ><CardSwiper data={el.imgUrl} /></div>)}
</div>
</div>
{/* <div className=''>
    <ProfileCard />
</div> */}
</div>
</>
  }


export default Profile;