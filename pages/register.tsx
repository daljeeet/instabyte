/* eslint-disable react-hooks/rules-of-hooks */
import { signIn } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BiHide, BiShow } from 'react-icons/bi';
import { BsInfoCircle } from 'react-icons/bs'
import { FaApple, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const register = () => {
    const [passMatch, setPassMatch] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [cPass, setCpass] = useState("")
    const [passStrength, setPassStrength] = useState(false)
    const [data, setData] = useState({name:"",email:"",password:""})
    const handleChange:React.ChangeEventHandler<HTMLInputElement> = (e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    useEffect(()=>{
        if(cPass===data.password){
            setPassMatch(true)
        }else{
            setPassMatch(false)
        }
    },[cPass, data])
    
    const symbolExists = (str:string)=>{
        let regex = /[^a-zA-Z0-9\s]/
        return regex.test(str)
    }
    const numberExists = (str:string)=>{
        let regex = /\d/
        return regex.test(str)
    }
    useEffect(() => {
        if(symbolExists(data.password)&&data.password.length>6&&numberExists(data.password)){
            setPassStrength(true)
        }else{
            setPassStrength(false)
        }
    }, [data])
    
    if(data.password){

    }
    const handleSubmit:React.FormEventHandler<HTMLFormElement> = (e)=>{
        e.preventDefault()
        if(passMatch&&cPass){
            console.log(data)
        }else{
            console.log('passwords dont match')
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
        <input required value={data.email} onChange={handleChange} name='email' className='outline-none px-4 my-4 bg-transparent border-b-2' placeholder='Email@example.com' type="text"/>
        <label className='flex items-center border-b-2 mt-4'>
        <input required value={data.password} onChange={handleChange} name='password' className='outline-none px-4 bg-transparent w-[90%] ' placeholder='Create password' type={showPassword?`tesxt`:"password"}/>
        {showPassword?<BiHide onClick={()=>setShowPassword(!showPassword)} className='text-2xl w-[10%] cursor-pointer' />:<BiShow onClick={()=>setShowPassword(!showPassword)} className='text-2xl w-[10%] cursor-pointer' />}
        </label>
        {data.password.length>0&&<p className='text-start mx-2 mt-1 text-sm'>strength: <span className={`${passStrength?"text-green-500":"text-red-500"}`}>{passStrength?"Strong":"Weak"}</span></p>}
        <input required value={cPass} onChange={(e)=>setCpass(e.target.value)} name='cpass' className='outline-none px-4 mt-4 bg-transparent border-b-2' placeholder='Confrm password' type={"password"}/>
        {cPass.length>5&&<p className='text-start mx-2 mt-1 text-sm'><span className={`${passMatch?"text-green-500":"text-red-500"}`}>{passMatch?"passwords matched":"passwords don't matched"}</span></p>}
        <input className='bg-black/50 w-fit mx-auto my-4 px-4 py-2 rounded-lg font-semibold cursor-pointer' value='Register ' type="submit"/>
        <h4 className='m-auto w-fit mb-4 font-semibold'>OR</h4>
        <p>Register using</p>
        <div onClick={()=>signIn()} className='flex w-fit m-auto my-4 bg-black/50 p-2 cursor-pointer rounded-full'>
        <FcGoogle className='text-xl mx-2' />
        <FaApple className='text-xl mx-2' />
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