import React, { Dispatch, useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from '@/Components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getOneUserPost, getUserData } from '@/redux/users_post/uesr.action'
import { rootReducertype } from '@/redux/store'
import UserDetails from '@/Components/profile/UserDetails'
import ProfileSkl from '@/Components/Sklls/ProfileSkl'
import UsersPost from '@/Components/profile/UsersPost'
import Router from 'next/router'

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
  const { userData,userPosts, get_user_data_loading} = useSelector((val: rootReducertype) => val.userPost)
  const token  = useSelector((val: rootReducertype) => val.user.loggedInUser)
  useEffect(()=>{
    if(!token){
    Router.push("/")
}        
},[token])
  return (
    <>
      <Navbar />
      <div className='px-1 md:ml-52 m-auto py-14'>
       {!get_user_data_loading&&userData&&token&&<UserDetails/>}
        {get_user_data_loading&&<ProfileSkl/>}
       {!get_user_data_loading&&userPosts&&<div className='w-1/2 m-auto my-4'>
        <h4 className='text-center text-xl font-semibold'> All Post(s) of {userData?.name} </h4>
        </div>}
       {userPosts&&<UsersPost/>}
      </div>
    </>
  )
}

export default Profile