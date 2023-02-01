import Link from 'next/link'
import React, { useState } from 'react'
import {AiOutlineSearch,AiOutlineHome,AiOutlineHeart,AiOutlineFileAdd} from 'react-icons/ai'
import {MdOutlineExplore} from 'react-icons/md';
import {CgProfile} from 'react-icons/cg'
import {GiHamburgerMenu} from 'react-icons/gi'
import {FiSend} from 'react-icons/fi'
import SrchModal from './SrchModal';
import CreateModal from './CreateModal';
import Image from 'next/image';
const Navbar = () => {
    const [srchModal, setSrchModal] = useState(false)
    const [createModal, setCreateModal] = useState(true)
    const handleSearch = ()=>{
        setSrchModal(!srchModal)
    }
    const handleNewPost = ()=>{
        setCreateModal(!createModal)
    }
    const handleModal = ()=>{
        setCreateModal(!createModal)
    }
    return (
        <>
        <div className='flex md:flex-col bg-black/50 md:w-48 w-screen h-14 md:h-screen fixed left-0 md:top-0 bottom-0 z-10'>
                <Link href='/' className='hidden md:block w-fit pl-4 pt-2'>
                {<Image src="/logod.png" alt="Tattoo fonts" width={100} height={50}/>}
                </Link>
            <div className='flex md:flex-col w-full md:w-40 md:h-[70vh] justify-around font-semibold px-4 '>
                <Link href={'/'} className='flex items-center' >
                    <AiOutlineHome className='mr-2 text-2xl' /> <p className='hidden md:block' >Home</p>
                </Link>
                <button onClick={handleSearch} className='items-center hidden md:flex' >
                    <AiOutlineSearch className='mr-2 text-2xl' /> <p className='' >Search</p>
                </button>
                <Link href={'/'} className='flex items-center' >
                    <MdOutlineExplore className='mr-2 text-2xl' /> <p className='hidden md:block' >Explore</p>
                </Link>
                <Link href={'/'} className='flex items-center' >
                    <FiSend className='mr-2 text-2xl' /> <p className='hidden md:block' >Message</p>
                </Link>
                <Link href={'/'} className='items-center hidden md:flex' >
                    <AiOutlineHeart className='mr-2 text-2xl' /> <p className='hidden md:block' >Notifications</p>
                </Link>
                <Link onClick={handleNewPost} href={'/'} className='flex items-center' >
                    <AiOutlineFileAdd className='mr-2 text-2xl' /> <p className='hidden md:block' >Create</p>
                </Link>
                <Link href={'/'} className='flex items-center' >
                    <CgProfile className='mr-2 text-2xl' /> <p className='hidden md:block' >Profile</p>
                </Link>
            </div>
                <SrchModal srchModal={srchModal} />

        </div>
                <CreateModal handleModal={handleModal} createModal={createModal} />
        {/* mobile nav  */}
                <div className='md:hidden flex flex-row items-center z-10 bg-black/50 fixed top-0 left-0 right-0 h-14  ' >
                <Image src="/logod.png" alt="Tattoo fonts" width={100} height={50} className="ml-2" />
                    <input type="text" placeholder='search' className='w-3/5 m-auto outline-2 bg-gray-600/80 h-8 rounded-lg pl-2 text-white' />
                </div>
        </>
    )
}

export default Navbar