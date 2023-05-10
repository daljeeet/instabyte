import React, { Dispatch, useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { loginwithGithub, loginwithGoogle } from '../redux/auth/auth.actions'
import { useRouter } from 'next/router'
import { rootReducertype } from '@/redux/store'
import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"

const Login = () => {
  const { data } = useSession()
  console.log(data)
  const dispatch: Dispatch<any> = useDispatch()
  const route = useRouter()
  const {user,login_loading} = useSelector((val: rootReducertype) => val?.user)
  // signOut()
  const handleGoogleLogin = () => {
    signIn()
  }
  useEffect(() => {
    if (user) {
      route.push("/")
    }
  }, [route, user])
  const handleGithubLogin = () => {
    dispatch(loginwithGithub())
  }
  if(login_loading){
    return <div>
      <Image src="/loading_img.gif" alt='loading' className='border-2' width={500} height={500} />
    </div>
  }

  return (
    <>
      <FcGoogle onClick={handleGoogleLogin} className='text-4xl mx-2 cursor-pointer' />
      <FaGithub onClick={handleGithubLogin} className='text-4xl mx-2 cursor-pointer' />
    </>
  )
}
export default Login