/* eslint-disable react-hooks/rules-of-hooks */
import Image from 'next/image'
import Link from 'next/link'
import React, { Dispatch, useEffect, useState } from 'react'
import { BiHide, BiShow } from 'react-icons/bi';
import { BsInfoCircle } from 'react-icons/bs'
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useSession, signIn} from "next-auth/react"
import { useDispatch, useSelector } from 'react-redux';
import { rootReducertype } from '@/redux/store';
import  Router  from 'next/router';
import { registerUser, signInWithSocialMedia } from '@/redux/auth/auth.actions';
import axios from 'axios';

const register = () => {
    const dispatch:Dispatch<any> = useDispatch()
    const {data:session}  = useSession();
    const {loggedInUser} = useSelector((val:rootReducertype)=>val?.user)
    const [showPassword, setShowPassword] = useState(false);
    const [passStrength, setPassStrength] = useState(false)
    const [data, setData] = useState({name:"",email:"",password:""})
    const [userExist, setUserExist] = useState(false)
    const [loading,setLoading]  = useState(false)
    const [username,setUsername] = useState("")
    useEffect(()=>{
        if(!loggedInUser&&session){
            let dta = {name:session.user?.name,email:session.user?.email,image:session.user?.image}
                dispatch(signInWithSocialMedia(dta))
        }else if((loggedInUser&&session)||loggedInUser){
          Router.push("/")
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[loggedInUser, session])
      
      useEffect(() => {
        if(symbolExists(data.password)&&data.password.length>6&&numberExists(data.password)){
            setPassStrength(true)
        }else{
            setPassStrength(false)
        }
    }, [data])

    useEffect(()=>{
       let id= setTimeout(() => {
           checkUser()
        }, 1000);
        return ()=>{
            clearTimeout(id)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[username])

    const checkUser = async()=>{
        if(username.length>4){
            setLoading(true)
            let res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_USER}`,{username})
            setLoading(false)
           setUserExist(res.data.user)
        }
    }
    const handleChange:React.ChangeEventHandler<HTMLInputElement> = (e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    
    const symbolExists = (str:string)=>{
        let regex = /[^a-zA-Z0-9\s]/
        return regex.test(str)
    }
    const numberExists = (str:string)=>{
        let regex = /\d/
        return regex.test(str)
    }
    const handleUsernameChange:React.ChangeEventHandler<HTMLInputElement>=(e)=>{
        setUsername(e.target.value)
    }
    const handleKeyPress:React.KeyboardEventHandler<HTMLInputElement> = (e)=>{
       if(e.key===' '){
        e.preventDefault()
        }
    }
    const handleSubmit:React.FormEventHandler<HTMLFormElement> = (e)=>{
        e.preventDefault()
        if(!userExist){
            let userData = {...data, username}
            dispatch(registerUser(userData))
        }
    }
  return (
    <div className='flex justify-center items-center m-auto w-11/12 min-h-screen h-full' >
    <div className='border-gray-600 md:w-[400px] md:p-4 rounded-lg'>
            <div className='relative'>
        <Link href={'/'} className='my-4 m-auto relative'>
        <Image src='/logod.png' width={200} height={100} alt="logo_img" className='m-auto'/>
        </Link>
        <Link href='/about' className='flex items-center absolute right-[20%] md:right-[30%] bottom-[10%]'><BsInfoCircle className='text-xl text-bold'/></Link>
            </div>
        <p className='text-center'>🤳 𝒞o𝓃𝓃𝑒𝒸𝓉, 𝒮𝒽𝒶𝓇𝑒, 𝒶𝓃𝒹 𝐸𝓍𝓅𝓁o𝓇𝑒. </p> 
        <p className='text-center'> 𝒴o𝓊𝓇 𝐿𝒾𝒻𝑒, 𝒴o𝓊𝓇 𝒲𝒶𝓎 💫</p>
        <h3 className='text-4xl text-center my-4'>Register</h3>
    <form onSubmit={handleSubmit} className='border-2 border-gray-600 rounded-md p-8 text-center flex flex-col justify-around'>

        <input required value={data.name} onChange={handleChange} name="name" className='outline-none px-4 my-4 bg-transparent border-b-2' placeholder='Full name' type="text"/>

        {/* *************************************username input element ************************* */}
        <input required value={username} onKeyDown={handleKeyPress} onChange={handleUsernameChange} name='username' className='outline-none px-4 mt-4 mb-2 bg-transparent border-b-2' placeholder='new username' type={"text"}/>
        {username.length>4&&<div className='text-start mb-2' >{loading?<div className='w-3/4 m-auto mt-2'> <div className='rounded-full overflow-hidden w-11/12 h-2 bg-gray-500 relative before:absolute before:h-2 before:w-2 before:rounded-full before:animate-loader before:bg-gradient-to-r from-cyan-500 to-blue-500'></div></div>:userExist&&<p className='text-red-500' >username already exist</p>}</div>}
       
       {/* *******************************email element **************************** */}
        <input required value={data.email} onChange={handleChange} name='email' className='outline-none px-4 my-4 bg-transparent border-b-2' placeholder='Email@example.com' type="text"/>


        {/* *******************************create Password element ********************* */}

        <label className='flex items-center border-b-2 mt-4'>
        <input required value={data.password} onChange={handleChange} name='password' className='outline-none px-4 bg-transparent w-[90%] ' placeholder='Create password' type={showPassword?`tesxt`:"password"}/>
        {showPassword?<BiHide onClick={()=>setShowPassword(!showPassword)} className='text-2xl w-[10%] cursor-pointer' />:<BiShow onClick={()=>setShowPassword(!showPassword)} className='text-2xl w-[10%] cursor-pointer' />}
        </label>
        {data.password.length>0&&<p className='text-start mx-2 mt-1 text-sm'>strength: <span className={`${passStrength?"text-green-500":"text-red-500"}`}>{passStrength?"Strong":"Weak - must have numbers and symbols"}</span></p>}

        {/* ***************************************Register user button************************************ */}
        <input className='bg-black/50 w-fit mx-auto my-4 px-4 py-2 rounded-lg font-semibold cursor-pointer' value='Register ' type="submit"/>
        <h4 className='m-auto w-fit mb-4 font-semibold'>OR</h4>
        <p>Register using</p>
        <div onClick={()=>signIn()} className='flex w-fit m-auto my-4 bg-black/50 p-2 cursor-pointer rounded-full'>
        <FcGoogle className='text-xl mx-2' />
        <FaFacebookF className='text-xl mx-2 text-blue-400' />
        <FaGithub className='text-xl mx-2' />
        <FaLinkedinIn className='text-xl mx-2 text-blue-600' />
        </div>
        <p> Existing user? <Link href={"/login"} className='hover:underline hover:text-blue-500'>Login</Link> </p>
    </form>
    </div>
</div>
  )
}

export default register