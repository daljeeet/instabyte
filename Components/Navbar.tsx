import Link from 'next/link'
import React, { Dispatch, useState,useEffect } from 'react'
import {AiOutlineSearch,AiOutlineHome} from 'react-icons/ai'
import {IoMdNotificationsOutline} from 'react-icons/io'

import {MdOutlineExplore} from 'react-icons/md';
import {CgProfile} from 'react-icons/cg'
import {FiBookmark, FiSend} from 'react-icons/fi'
import {BiMessageSquareAdd} from 'react-icons/bi'
import SrchModal from './SrchModal';
import CreateModal from './CreateModal';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLogin, signoutUser } from '../redux/auth/auth.actions';
import Router from 'next/router';
import { rootReducertype } from '@/redux/store';
const Navbar = () => {
    // =========================== All Hooks at the top ====================================
    const dispatch:Dispatch<any> = useDispatch()
    const user = useSelector((val:rootReducertype)=>val?.user?.user)
    const [profileDtl,setProfileDtl] = useState(true)
    const [srchModal, setSrchModal] = useState(false)
    const [createModal, setCreateModal] = useState(false)

        useEffect(()=>{
            dispatch(isUserLogin())
        },[dispatch])
    // =====================All The funcitons for Various tasks========================
    const handleSearch = ()=>{
        if(user){
            setSrchModal(!srchModal)
        }else{
            Router.push("/login")
        }
    }
    const closeSrchModal = ()=>{
        setSrchModal(false)
    }
    const handleNewPost = ()=>{
        if(user){
            setCreateModal(true)
        }else{
            Router.push("/login")
        }
    }
    const handleModal = ()=>{
           setCreateModal(false)
    }
    const handleLogout = ()=>{
        dispatch(signoutUser())
    }
    const handleProfileModal = ()=>{ 
        if(user){
            setProfileDtl(!profileDtl)
        }else{
            Router.push("/login")
        }   
    }
    return (
        <>
        <div className='flex md:flex-col bg-black/80 md:w-48 w-screen h-10 md:h-screen fixed left-0 md:top-0 bottom-0 z-10'>
                <Link href='/' className='hidden md:block w-fit pl-4 pt-2'>
                {<Image src="/logod.png" alt="Tattoo fonts" width={100} height={50}/>}
                </Link>
            <div className='flex md:flex-col w-full md:w-40 md:h-[70vh] justify-around font-semibold px-4 '>
                <Link href={'/'} onClick={closeSrchModal} className='flex items-center' >
                    <AiOutlineHome  className='mr-2 text-2xl' /> <p className='hidden md:block' >Home</p>
                </Link>
                <button onClick={handleSearch} className='items-center hidden md:flex' >
                    <AiOutlineSearch className='mr-2 text-2xl' /> <p className='' >Search</p>
                </button>
                <Link href={'/explore'} className='flex items-center' >
                    <MdOutlineExplore className='mr-2 text-2xl' /> <p className='hidden md:block' >Explore</p>
                </Link>
                <Link href={'/'} className='flex items-center' >
                    <FiBookmark className='mr-2 text-2xl' /> <p className='hidden md:block' >Bookmarks</p>
                </Link>
                <Link href={'/'} className='items-center hidden md:flex' >
                    <IoMdNotificationsOutline className='mr-2 text-2xl' /> <p className='hidden md:block' >Notifications</p>
                </Link>
                <div onClick={handleNewPost}  className='flex items-center cursor-pointer' >
                    <BiMessageSquareAdd className='mr-2 text-2xl' /> <p className='hidden md:block' >Create</p>
                </div>
                <div onClick={handleProfileModal} className='flex items-center cursor-pointer' >
                    {
                        user?<div className='rounded-full h-5 w-5 relative overflow-hidden mr-2 ' ><Image src={user.profile} width={30} height={30} alt='profile Pic' /> </div> :
                        <CgProfile className='mr-2 text-2xl' />} <p className='hidden md:block text-sm' >{user?.name||"Profile"}</p>
                </div>
            </div>
                        {/* =============================Profile Click List ============================== */}
                {profileDtl||<div className='absolute right-0 bottom-12 md:relative mx-4 bg-black text-thin text-center pb-3'>
                        <p onClick={handleLogout} className='border-b-2 border-gray-600 mx-2 text-sm cursor-pointer'>Log-out</p>
                        {/* <p className='cursor-pointer border-b-2 border-gray-600 mx-2 text-sm mt-2'>Settings</p> */}
                </div>}
                <SrchModal srchModal={srchModal} closeSrchModal={closeSrchModal} />
        </div>
               {createModal&&<CreateModal handleModal={handleModal} />}
        {/* mobile nav  */}
                <div className='md:hidden flex flex-row items-center z-10 bg-black fixed top-0 left-0 right-0 h-14  ' >
                <Image src="/logod.png" alt="Tattoo fonts" width={100} height={50} className="ml-2" />
                    <input type="text" placeholder='search' className='w-3/5 m-auto outline-2 bg-gray-600/80 h-8 rounded-lg pl-2 text-white' />
                </div>
        </>
    )
}

export default Navbar