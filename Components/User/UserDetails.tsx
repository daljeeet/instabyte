import React, { Dispatch, useState } from 'react'
import Image from "next/image"
import { AiFillEdit } from 'react-icons/ai'
import { RiLogoutCircleRFill } from 'react-icons/ri'
import { rootReducertype } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import GetUser from '../../helpers/GetUser'
import { signOut } from "next-auth/react"
import { logoutUser } from '@/redux/auth/auth.actions'
import UpdateuserModal from './UpdateuserModal'

const UserDetails = () => {
    const [editModal, setEditModal]=useState(false)
    const { userData, userPosts, } = useSelector((val: rootReducertype) => val.userPost)
    const dispatch:Dispatch<any> = useDispatch() 
    const loggedInUserData = GetUser()
    const handleLogOut = ()=>{
        dispatch(logoutUser())
        signOut()
    }

    return (
        <>
            <div className='mt-4 md:mt-auto lg:w-3/4 m-auto p-4 md:flex justify-between relative'>
                <Image src={userData?.cover || "/cover.jpg"} width={1000} height={200} alt='p' className='z-0 absolute top-0 bottom-0 left-0 right-0 h-full rounded-md brightness-50'/>
                {/* profile section for desktop */}
                <div className='hidden z-20 w-full m-auto p-4 md:flex justify-between' >
                    <div className="flex justify-center items-center rounded-full overflow-hidden h-[170px] w-[170px] bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-gradient-x">
                        <Image src={userData?.image || "/demo_img.png"} width={100} height={100} alt='p' className='w-[160px] h-[160px] rounded-full' />
                    </div>
                    {/* user's info  */}
                    <div className='mt-6 md:m-2 md:w-2/3'>
                        <div className=' sm:w-full flex justify-center' >
                            <div className='font-semibold text-xl flex h-fit' >
                                <p className='text-2xl'>{userData?.name}</p>

                                {/* if user is self  */}
                                {loggedInUserData?._id===userData?._id?<div className='flex items-center justify-center'>
                                    <button onClick={()=>setEditModal(true)} className='mx-4 border-[1px] px-3 py-1 text-base rounded-md hover:border-blue-700 flex items-center hover:bg-blue-800/70'><AiFillEdit className='mr-2 text-xl hover:animate-pulse' /> Profile</button>
                                    <button onClick={handleLogOut} className='mx-4 border-[1px] px-3 py-1 text-base rounded-md hover:border-red-400 hover:bg-red-700/60 flex items-center' >
                                        <RiLogoutCircleRFill className='text-xl mx-2 hover:animate-pulse' />
                                        Logout
                                    </button>
                                </div>:<div className='flex items-center justify-center'>
                                    <button className='mx-4 border-[1px] px-3 py-1 text-base rounded-md hover:border-blue-700 flex items-center hover:bg-blue-800/70'>Follow</button>
                                {/* <button className='mx-4 border-[1px] px-3 py-1 text-base rounded-md hover:border-red-400'>Unfollow</button> */}
                                </div>}
                            </div>
                        </div>
                        <div className='my-4 flex justify-around w-4/5 m-auto font-bold text-xl'>
                            <button>{userPosts.length} Post</button>
                            <button>{userData?.followers_count} Followers</button>
                            <button>{userData?.following_count} Following</button>
                        </div>
                        <p className='flex justify-around w-4/5 m-auto font-bold text-xl' >{userData?.username}</p>
                    </div>
                </div>
                {/* profile section for small screens */}
                <div className='xs:flex md:hidden z-20 ' >
                    <div className='relative ' >
                        <div className='flex justify-between py-4'>
                            <div className=" flex justify-center items-center rounded-full overflow-hidden h-[105px] w-[105px] bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-gradient-x">
                                <Image src={userData?.image || "/demo_img.png"} width={100} height={100} alt='p' className='w-[100px] h-[100px] rounded-full' />
                            </div>
                            <div className='ml-0 mr-4 flex flex-col items-start m-auto font-bold text-xl'>
                                <button>{userData?.followers_count} Followers</button>
                                <button>{userData?.following_count} Following</button>
                                <button>{userPosts.length} Post</button>
                                {loggedInUserData?._id===userData?._id?<div className='flex flex-col my-2'>
                                    <button onClick={()=>setEditModal(true)} className='border-[1px] px-3 py-1 text-base rounded-md hover:border-blue-700 flex items-center hover:bg-blue-800/70'><AiFillEdit className='mr-2 text-xl hover:animate-pulse' /> Profile</button>
                                <button onClick={handleLogOut} className='mt-2 border-[1px] px-3 py-1 text-base rounded-md hover:border-red-400 hover:bg-red-700/60 flex items-center' >
                                    <RiLogoutCircleRFill className='text-xl mx-2 hover:animate-pulse' /> 
                                    Logout
                                </button>
                                </div>:<div className='flex flex-col my-2'>
                                    <button className='border-[1px] px-3 py-1 text-base rounded-md hover:border-blue-700 flex items-center hover:bg-blue-800/70'>Follow</button>
                                    {/* <button className='border-[1px] px-3 py-1 text-base rounded-md hover:border-blue-700 flex items-center hover:bg-blue-800/70'>Unfollow</button> */}
                                </div>}
                            </div>
                        </div>
                        <div className='absolute top-[80%] left-0'>
                            <div className=' sm:w-full flex justify-start' >
                                <div className='font-semibold flex h-fit' >
                                    <p className='text-xl'>{userData?.name}</p>
                                    {/* if user is self  */}
                                </div>
                            </div>
                            <p className='flex font-bold text-sm justify-start' >{userData?.username}</p>
                        </div>
                    </div>
                </div>
            </div>
        {editModal&&<UpdateuserModal closeModal={()=>setEditModal(false)} />}
        </>
    )
}

export default UserDetails