import Link from 'next/link'
import React, { Dispatch, useState,useEffect } from 'react'
import {AiOutlineSearch,AiOutlineHome} from 'react-icons/ai'
import {IoMdNotificationsOutline} from 'react-icons/io'
import {MdOutlineExplore} from 'react-icons/md';
import {CgProfile} from 'react-icons/cg'
import {FiBookmark} from 'react-icons/fi'
import {BiMessageSquareAdd} from 'react-icons/bi'
import SrchModal from './SrchModal';
import CreateModal from './CreateModal';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { rootReducertype } from '@/redux/store';
import LoginModal from './LoginModal';
import { BsInfoCircle } from 'react-icons/bs';
import GetUser from '../helpers/GetUser';
const Navbar = () => {
    // =========================== All Hooks at the top ====================================
    const dispatch:Dispatch<any> = useDispatch()
    const {login_loading} = useSelector((val:rootReducertype)=>val?.user)
    const loggedInUser = GetUser()
    const get_loading=false
    const [loginModal, setLoginModal] = useState(false)
    const [srchModal, setSrchModal] = useState(false)
    const [createModal, setCreateModal] = useState(false)
    // =====================All The funcitons for Various tasks========================
    const handleSearch = ()=>{
            setSrchModal(!srchModal)
    }
    const closeSrchModal = ()=>{
        setSrchModal(false)
    }
    const handleNewPost = ()=>{
        if(loggedInUser){
            setCreateModal(true)
        }else{
            setLoginModal(true)
        }
    }
    const handleModal = ()=>{
        setCreateModal(false)
    }
    const handleProfileModal = ()=>{
        if(loggedInUser){
           Router.push(`/profile/${loggedInUser._id}`)
        }else{
            setLoginModal(true)
        }   
    }
    const handleExplore = ()=>{
        if(loggedInUser){
            Router.push("/explore")
        }else{
            setLoginModal(true)
        }
    }
    const closeLoginModal =()=>{
        setLoginModal(false)
    }
    return (
        <>
        <div className='flex md:flex-col bg-black/80 md:w-48 w-screen h-14 md:h-screen fixed left-0 md:top-0 bottom-0 z-10'>
            <div className='relative'>
                <Link href='/' className='hidden md:block w-fit pl-4 pt-2'>
                {<Image src="/logod.png" alt="Tattoo fonts" width={100} height={50}/>}
                </Link>
            </div>
            <div className='flex md:flex-col w-full md:w-40 md:h-[70vh] justify-around font-semibold px-4 '>
                <Link href={'/'} onClick={closeSrchModal} className='flex items-center' >
                    <AiOutlineHome  className='mr-2 text-2xl' /> <p className='hidden md:block' >Home</p>
                </Link>
                <button onClick={handleSearch} className='items-center hidden md:flex' >
                    <AiOutlineSearch className='mr-2 text-2xl' /> <p className='' >Search</p>
                </button>
                <button onClick={handleExplore} className='flex items-center' >
                    <MdOutlineExplore className='mr-2 text-2xl' /> <p className='hidden md:block' >Explore</p>
                </button>
                <Link href={'/'} className='flex items-center' >
                    <FiBookmark className='mr-2 text-2xl' /> <p className='hidden md:block' >Bookmarks</p>
                </Link>
                <Link href={'/'} className='items-center hidden md:flex' >
                    <IoMdNotificationsOutline className='mr-2 text-3xl' /> <p className='hidden md:block' >Notifications</p>
                </Link>
                <div onClick={handleNewPost}  className='flex items-center cursor-pointer' >
                    <BiMessageSquareAdd className='mr-2 text-2xl' /> <p className='hidden md:block' >Create</p>
                </div>
                
                <div onClick={handleProfileModal} className='flex items-center cursor-pointer' >
                    {
                        loggedInUser?<div className='rounded-full h-5 w-5 relative overflow-hidden mr-2'><Image src={(loggedInUser?.image)||"/demo_img.png"} width={30} height={30} alt='profile Pic' className='w-6 h-6' /> </div> :
                       get_loading?<Image src='/loading_gif.gif' width={80} height={80} alt='loadingig' /> :<CgProfile className='mr-2 text-2xl' />}<p className='hidden md:block text-sm' >{loggedInUser?.name||"Profile"}</p>
                </div>
            </div>
                        {/* =============================Profile Click List ============================== */}
            
                <SrchModal srchModal={srchModal} closeSrchModal={closeSrchModal} />
        </div>
               {createModal&&<CreateModal handleModal={handleModal} />}
              {loginModal&&<LoginModal closeLoginModal={closeLoginModal} />}
        {/* mobile nav  */}
                <div className='md:hidden flex flex-row items-center z-10 bg-black fixed top-0 left-0 right-0 h-14  ' >
                    <Link href={'/'}>
                <Image src="/logod.png" alt="Instabyte logo" width={100} height={50} className="ml-2" />
                    </Link>
                    <input type="text" placeholder='search' className='w-3/5 m-auto outline-2 bg-gray-600/80 h-8 rounded-lg pl-2 text-white' />
                </div>
        </>
    )
}

export default Navbar