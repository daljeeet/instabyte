/* eslint-disable react-hooks/rules-of-hooks */
import React, { Dispatch, useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { BsInfoCircle } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { useSession, signIn } from "next-auth/react"
import { BiHide, BiShow } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { loginUser, signInWithSocialMedia } from '@/redux/auth/auth.actions';
import GetUser from '@/Components/GetUser';
import { rootReducertype } from '@/redux/store';
const login = () => {
  const { data: session } = useSession();
  const dispatch: Dispatch<any> = useDispatch()
  const token = useSelector((val:rootReducertype)=>val.user.loggedInUser)
  const loggedInUser = GetUser();
  const [showPassword, setShowPassword] = useState(false)
  const [data, setData] = useState({ email: "", password: "" })
  useEffect(() => {
    if (!loggedInUser && session) {
      let dta = { name: session.user?.name, email: session.user?.email, image: session.user?.image }
      dispatch(signInWithSocialMedia(dta))
    } else if ((loggedInUser && session) || loggedInUser) {
      Router.push("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInUser, session])
  useEffect(()=>{
    if(token){
      Router.push("/")
    }
  },[token])
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    dispatch(loginUser(data))
  }
  return (
    <div className='flex justify-center items-center m-auto w-11/12 min-h-screen'>
      <div className='border-gray-600 md:w-[400px] md:p-4 rounded-lg'>
        <div className='relative'>
          <Link href={'/'} className='my-4 m-auto relative'>
            <Image src='/logod.png' width={200} height={100} alt="logo_img" className='m-auto' />
          </Link>
          <Link href='/about' className='flex items-center absolute right-[20%] md:right-[30%] bottom-[10%]'><BsInfoCircle className='text-xl text-bold' /></Link>
        </div>
        <p className='text-center'>🤳 𝒞o𝓃𝓃𝑒𝒸𝓉, 𝒮𝒽𝒶𝓇𝑒, 𝒶𝓃𝒹 𝐸𝓍𝓅𝓁o𝓇𝑒. </p>
        <p className='text-center'> 𝒴o𝓊𝓇 𝐿𝒾𝒻𝑒, 𝒴o𝓊𝓇 𝒲𝒶𝓎 💫 </p>
        <h3 className='text-4xl text-center my-4'>Login</h3>
        <form onSubmit={handleSubmit} className='border-2 border-gray-600 rounded-md p-8 text-center flex flex-col justify-around'>
          <input required value={data.email} onChange={handleChange} name='email' className='outline-none px-4 my-4 bg-transparent border-b-2' placeholder='Email' type="email" />
          <label className='flex items-center border-b-2 my-4'>
            <input required value={data.password} onChange={handleChange} name='password' className='outline-none px-4 bg-transparent w-[90%] ' placeholder='Password' type={showPassword ? `tesxt` : "password"} />
            {showPassword ? <BiHide onClick={() => setShowPassword(!showPassword)} className='text-2xl w-[10%] cursor-pointer' /> : <BiShow onClick={() => setShowPassword(!showPassword)} className='text-2xl w-[10%] cursor-pointer' />
            }
          </label>
          <input className='bg-black/50 w-fit mx-auto my-4 px-4 py-2 rounded-lg font-semibold cursor-pointer' value='Log In' type="submit" />
          <h4 className='m-auto w-fit mb-4 font-semibold'>OR</h4>
          <p>Login using</p>
          <div onClick={() => signIn()} className='flex w-fit m-auto my-4 bg-black/50 p-2 cursor-pointer rounded-full'>
            <FcGoogle className='text-xl mx-2' />
            <FaFacebookF className='text-xl mx-2 text-blue-400' />
            <FaGithub className='text-xl mx-2' />
            <FaLinkedinIn className='text-xl mx-2 text-blue-600' />
          </div>
          <p> Not a user? <Link href={"/register"} className='hover:underline hover:text-blue-500'>Register</Link> </p>
        </form>
      </div>
    </div>
  )
}

export default login;