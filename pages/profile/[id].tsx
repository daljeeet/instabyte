import React, { Dispatch, useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from '@/Components/Navbar'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { getOneUserPost, getUserData } from '@/redux/users_post/uesr.action'
import { rootReducertype } from '@/redux/store'
import { AiFillEdit } from 'react-icons/ai'
import { RiLogoutCircleRFill } from 'react-icons/ri'
import UserDetails from '@/Components/profile/UserDetails'
import ProfileSkl from '@/Components/Sklls/ProfileSkl'
import UsersPost from '@/Components/profile/UsersPost'
const Profile = () => {
  const router = useRouter()
  const userId = router.query.id
  const dispatch: Dispatch<any> = useDispatch()
  useEffect(() => {
    if (typeof userId == "string") {
      dispatch(getOneUserPost(userId))
      dispatch(getUserData(userId))
    }
  }, [dispatch, userId])
  const { userData, userPosts } = useSelector((val: rootReducertype) => val.userPost)
  return (
    <>
      <Navbar />
      <div className='px-1 md:ml-52 m-auto py-14'>
       {userData? <UserDetails/>:
        <ProfileSkl/>
        }
        <div className='w-1/2 m-auto my-4'>
        <h4 className='text-center underline'>Posts</h4>
        </div>
        <UsersPost/>
      </div>
    </>
  )
}

export default Profile