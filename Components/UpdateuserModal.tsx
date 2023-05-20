import { logoutUser } from '@/redux/auth/auth.actions'
import Link from 'next/link'
import React, { Dispatch, useState } from 'react'
import { AiOutlineClose, AiOutlinePoweroff, AiTwotoneEdit } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from "next-auth/react"
import Image from 'next/image'
import Router from 'next/router'
import { rootReducertype } from '@/redux/store'
type updateModalType = {
  closeModal: () => void
}
const UpdateuserModal = (props: updateModalType) => {
  const { closeModal } = props
  const { userData } = useSelector((val: rootReducertype) => val.userPost)
  const [data, setData] = useState({name:userData?.name,username:userData?.name,image:userData?.image,cover:userData.cover})
  console.log(userData)
  const dispatch: Dispatch<any> = useDispatch()
  const handleChange:React.ChangeEventHandler<HTMLInputElement>= (e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  const handleUpdate:React.FormEventHandler<HTMLFormElement> = (e)=>{
    e.preventDefault()
    console.log(data)
  }
  const handleProfileChange = ()=>{
    setData({...data, image:""})
  }
  const handleCoverChange = ()=>{
    setData({...data, cover:""})
  }
  return (
    <div onClick={() => closeModal()} className='fixed h-screen flex justify-center items-center right-0 top-0 left-0 bg-black/60 z-50' >
      <div onClick={() => closeModal()} className='fixed md:top-2 top-0 right-0 z-10 md:right-2 m-4 cursor-pointer'>
        <AiOutlineClose className='text-3xl' />
      </div>
      <div onClick={(e) => { e.stopPropagation() }} className='bg-darkbg overflow-y-auto scrollbar-hide animate-in zoom-in p-10 rounded-xl md:w-5/6'>

        <div className='mx-2 my-4 md:flex items-center relative md:w-5/6 rounded-lg'>
          <Image src={data.image} alt="user" width={100} height={100} className='m-auto md:mx-2 rounded-full z-20 md:my-4' />
          <p className='m-2 z-10'>{userData?.email}</p>
          <Image src={data?.cover} alt="cover_img" width={1000} height={500} className='absolute z-0 h-full top-0 bottom-0 left-0 right-0 rounded-lg' />
        </div>

        <form onSubmit={handleUpdate} className='md:w-5/6 z-10' >
          <label className='flex items-center border border-gray-600 rounded-lg pl-3 my-4' htmlFor="name">
            Name:
            <input value={data.name} name='name' onChange={handleChange} type="text" maxLength={14} className='bg-transparent  outline-none pl-2 py-1 md:w-3/4 my-1 text-sm' />
          </label>
          <label className='flex items-center border border-gray-600 rounded-lg pl-3 my-4' htmlFor="name">
            Username:
            <input value={data.username} onChange={handleChange} name='username' type="text" maxLength={12}className='bg-transparent outline-none pl-2 py-1 md:w-3/4 my-1 text-sm' />
          </label>
          <div className='md:flex items-center justify-between' >
            <div className='md:flex items-center justify-between w-2/3' >
              <label htmlFor='imageUpload' className='cursor-pointer flex items-center border-2 border-blue-600 rounded-lg px-3 py-1 my-2 mr-4 '>Update Cover photo
                <input onChange={handleCoverChange} type="file" className='hidden' id="imageUpload" accept="image" multiple={false} />
              </label>
              <label htmlFor='coverUpload' className='cursor-pointer flex items-center border-2 border-blue-600 rounded-lg px-3 my-2 md:mx-4 py-1'>Update Profile photo
                <input onChange={handleProfileChange} type="file" className='hidden' id="coverUpload" accept="image" multiple={false} />
              </label>
            </div>
            <input type="submit" value={"update"} className='cursor-pointer bg-blue-800 border-2 border-blue-500 px-3 py-1 rounded-lg hover:bg-blue-500/40' />
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateuserModal