import React from 'react'
import Image from 'next/image';
import Login from '../Components/Login';
import Link from 'next/link';
import { BsInfoCircle } from 'react-icons/bs';

const login = () => {
const handleSubmit = (e: { preventDefault: () => void; })=>{
    e.preventDefault()
    alert("invalid credentials")
}
  return (
    <div className='flex justify-center items-center m-auto w-11/12 min-h-screen h-full' >
        <div className='md:border-2 border-gray-600 md:w-[20rem] md:p-4 rounded-lg'>
                <div className='relative'>
            <Link href={'/'} className='my-4 m-auto relative'>
            <Image src='/logod.png' width={200} height={100} alt="logo_img" className='m-auto' />
            </Link>
            <Link href='/about' className='flex items-center absolute right-0 bottom-0' > <BsInfoCircle className='text-2xl text-bold' /> </Link>
                </div>
            <p className='text-center'>💗𝒞🏵𝓃𝓃𝑒𝒸𝓉, 𝒮𝒽𝒶𝓇𝑒, 𝒶𝓃𝒹 𝐸𝓍𝓅𝓁🌺𝓇𝑒 - 𝒴🍪𝓊𝓇 𝐿𝒾𝒻𝑒, 𝒴🍬𝓊𝓇 𝒲𝒶𝓎💗</p>
            <h3 className='text-4xl text-center my-4'>Login</h3>
        <form onSubmit={handleSubmit} className='border-2 md:border-none border-gray-600 rounded-md p-4 text-center flex flex-col justify-around h-52'>
            <input className='outline-none px-4 bg-transparent border-b-2' placeholder='Username' type="text"/>
            <input className='outline-none px-4 bg-transparent border-b-2' placeholder='Password' type="text"/>
            <input className='bg-black/50 w-fit mx-auto px-4 py-2 rounded-lg font-semibold cursor-pointer' value='Log In' type="submit"/>
        </form>
        <h3 className='text-xl text-center mt-3'>OR Sign-up with</h3>
        <div className='flex justify-center mt-3' >
            <Login/>
        </div>
        </div>       
    </div>
  )
}
 
export default login;