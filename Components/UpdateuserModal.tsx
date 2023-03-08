import { signoutUser } from '@/redux/auth/auth.actions'
import Link from 'next/link'
import Router  from 'next/router'
import React, { Dispatch } from 'react'
import { AiOutlineClose, AiOutlinePoweroff, AiTwotoneEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
type updateModalType={
  closeModal:()=>void
  handleEditUsername:()=>void
  handleEditCover:()=>void
  handleEditProfile:()=>void
}
const UpdateuserModal = (props:updateModalType) => {
  const dispatch: Dispatch<any> = useDispatch()
  const {closeModal,handleEditUsername,handleEditProfile,handleEditCover} = props;
  const handleLogout = ()=>{
    dispatch(signoutUser())
    closeModal
    Router.push("/login")
  }
  return (
    <div onClick={() => closeModal()} className='fixed h-screen flex justify-center items-center right-0 top-0 left-0 bg-black/60 z-10' >
            <div onClick={() => closeModal()} className='fixed md:top-2 top-0 right-0 z-10 md:right-2 m-4 cursor-pointer'>
                <AiOutlineClose className='text-3xl' />
            </div>
            <div onClick={(e) => { e.stopPropagation() }} className='bg-darkbg overflow-y-auto scrollbar-hide animate-in zoom-in p-10 rounded-xl'>
              <div onClick={handleEditProfile} className='flex items-center cursor-pointer font-semibold p-2 border-blue-500 border-b-2'><AiTwotoneEdit className='mr-4 text-green-200'/> <p>Profile</p></div>
              <div onClick={handleEditCover} className='flex items-center cursor-pointer font-semibold p-2 border-blue-500 border-b-2'><AiTwotoneEdit className='mr-4 text-green-200'/> <p>Cover</p></div>
              <div className='flex items-center cursor-pointer font-semibold p-2 border-blue-500 border-b-2'onClick={handleEditUsername} ><AiTwotoneEdit className='mr-4 text-green-200'/> <p>Uesrname</p></div>
              <div onClick={handleLogout} className='flex items-center cursor-pointer font-semibold p-2 border-blue-500 border-b-2'><AiOutlinePoweroff className='mr-4 text-red-400'/> <p>Logout</p></div>
              <Link href={'/about'} className='flex items-center cursor-pointer font-semibold p-2 border-blue-500 border-b-2'><BsInfoCircle className='mr-4 text-green-200'/> <p>about</p></Link>
                </div>
    </div>
  )
}

export default UpdateuserModal