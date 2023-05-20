import GetUser from '@/helpers/GetUser'
import React from 'react'
import Image from 'next/image'
import Router from 'next/router'
const UserDiv = ({data}:any) => {
    const handleUserProfile = (id:number|string)=>{
        Router.push(`/profile/${id}`)
    }
    return (
        <div onClick={()=>handleUserProfile(data._id)} className='flex justify-between items-center rounded-xl bg-gray-900 cursor-pointer my-3 p-2' >
            <div className="flex justify-center items-center rounded-full overflow-hidden h-[40px] w-[40px] mr-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-gradient-x">
                <Image src={data?.image || "/demo_img.png"} width={100} height={100} alt='p' className='w-[35px] h-[35px] rounded-full' />
            </div>
            <div className='w-2/3'>{data?.name}</div>
        </div>
    )
}

export default UserDiv