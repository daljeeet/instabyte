import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineHome, AiFillHome, AiFillMessage, AiOutlineMessage } from 'react-icons/ai'
import { MdExplore, MdOutlineExplore } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg'
import NavModal from './NavModal';
import CreateModal from '../Post/CreatePost';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router';
import { rootReducertype } from '@/redux/store';
import LoginModal from './LoginModal';
import GetUser from '../../helpers/GetUser';
import { RiAddCircleFill, RiAddCircleLine, RiNotificationFill, RiNotificationLine, RiSearchFill, RiSearchLine } from 'react-icons/ri';
import { BsThreeDotsVertical } from 'react-icons/bs';
import MobNavModal from './MobNavModal';
const Navbar = () => {
    // =========================== All Hooks at the top ====================================
    const { login_loading } = useSelector((val: rootReducertype) => val?.user)
    const loggedInUser = GetUser()
    const [loginModal, setLoginModal] = useState(false)
    const [srchModal, setSrchModal] = useState(false)
    const [createModal, setCreateModal] = useState(false)
    const [isSrch, setIsSrch] = useState(false)
    const reoute = useRouter()
    // =====================All The funcitons for Various tasks========================
    const handleSearch = () => {
        setSrchModal(!srchModal)
        setIsSrch(true)
    }
    const handleNotifications = () => {
        setSrchModal(!srchModal)
        setIsSrch(false)
    }
    const closeSrchModal = () => {
        setSrchModal(false)
    }
    const handleNewPost = () => {
        if (loggedInUser) {
            setCreateModal(true)
        } else {
            setLoginModal(true)
        }
    }
    const handleModal = () => {
        setCreateModal(false)
    }
    const handleProfileModal = () => {
        if (loggedInUser) {
            Router.push(`/profile/${loggedInUser._id}`)
        } else {
            setLoginModal(true)
        }
    }
    const handleExplore = () => {
        if (loggedInUser) {
            Router.push("/explore")
        } else {
            setLoginModal(true)
        }
    }
    return (
        <>
            <div className={`flex md:flex-col bg-black/80 ${!srchModal ? "md:w-48" : "md:w-20"} w-screen h-14 md:h-screen fixed left-0 md:top-0 bottom-0 z-10 `}>
                <div className='relative'>
                    <Link href='/' className='hidden md:block w-fit pl-4 pt-2'>
                        {!srchModal ? <Image src="/logod.png" alt="Tattoo fonts" width={100} height={50} /> : <Image src="/insta_i.png" alt="i" width={50} height={50} className='w-[30px] ' />}
                    </Link>
                </div>
                <div className='flex md:flex-col w-full md:w-40 md:h-[70vh] justify-around font-semibold px-4 '>
                    <Link href={'/'} onClick={closeSrchModal} className='flex items-center hover:text-blue-300 w-fit' >
                        {reoute?.pathname == "/" ? <AiFillHome className='mr-2 text-3xl md:text-2xl' /> : <AiOutlineHome className='mr-2 text-3xl md:text-2xl' />}{!srchModal && <p className='hidden md:block'>Home</p>}
                    </Link>
                    <button onClick={handleSearch} className='items-center hidden md:flex' >
                        {srchModal && isSrch ? <RiSearchFill className='mr-2 text-2xl' /> : <RiSearchLine className='mr-2 text-2xl' />}{!srchModal && <p className='' >Search</p>}
                    </button>
                    <button onClick={handleExplore} className='flex items-center w-fit' >
                        {reoute?.pathname == '/explore' ? <MdExplore className='mr-2 text-3xl md:text-2xl' /> : <MdOutlineExplore className='mr-2 text-3xl md:text-2xl' />} {!srchModal && <p className='hidden md:block' >Explore</p>}
                    </button>
                    <Link href={'/message'} className='flex items-center hover:text-blue-300 w-fit' >
                        {reoute?.pathname === '/message' ? <AiFillMessage className='mr-2 text-3xl md:text-2xl' /> : <AiOutlineMessage className='mr-2 text-3xl md:text-2xl' />} {!srchModal && <p className='hidden md:block' >Message</p>}
                    </Link>
                    <button onClick={handleNotifications} className='items-center w-fit hidden md:flex' >
                        {srchModal && !isSrch ? <RiNotificationFill className='mr-2 text-2xl h-fit' /> : <RiNotificationLine className='mr-2 text-2xl h-fit' />}{!srchModal && <p className='hidden md:block' >Notifications</p>}
                    </button>
                    <div onClick={handleNewPost} className='flex items-center w-fit cursor-pointer' >
                        {createModal ? <RiAddCircleFill className='mr-2 text-3xl md:text-2xl' /> : <RiAddCircleLine className='mr-2 text-3xl md:text-2xl' />} {!srchModal && <p className='hidden md:block' >Create Post</p>}
                    </div>

                    <div onClick={handleProfileModal} className='flex items-center w-fit cursor-pointer' >
                        {
                            loggedInUser ? <div className="flex justify-center items-center rounded-full overflow-hidden h-[25px] w-[25px] mr-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-gradient-x">
                                <Image src={loggedInUser?.image || "/demo_img.png"} width={30} height={30} alt='p' className='w-[25px] h-[25px] rounded-full' />
                            </div> :
                                login_loading ? <Image src='/loading_gif.gif' width={80} height={80} alt='loadingig' /> : <CgProfile className='mr-2 text-2xl' />}{!srchModal && <p className='hidden md:block text-sm' >{loggedInUser?.name || "Profile"}</p>}
                    </div>
                </div>
                {/* =============================Profile Click List ============================== */}

                {srchModal && <NavModal isSrch={isSrch} closeSrchModal={closeSrchModal} />}
            </div>
            {createModal && <CreateModal handleModal={handleModal} />}
            {loginModal && <LoginModal closeLoginModal={() => setLoginModal(false)} />}
            {/* mobile nav  */}
            <div className='md:hidden flex flex-row items-center z-10 bg-black fixed top-0 left-0 right-0 h-14  ' >
                <Link href={'/'}>
                    <Image src="/logod.png" alt="Instabyte" width={90} height={50} className="ml-2" />
                </Link>
                <MobNavModal/>
                <BsThreeDotsVertical className='mr-2' />
            </div>
        </>
    )
}

export default Navbar