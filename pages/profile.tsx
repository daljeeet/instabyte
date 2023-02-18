import Navbar from '@/Components/Navbar'

import React, { useEffect, useState } from 'react'
import { postDataType } from '@/Components/CreateModal.jsx';
import Image from 'next/image';

import { useSelector } from 'react-redux'
import { rootReducertype } from '@/redux/store'
import ProfileCard from '../Components/ProfileCard';
type dataTypes = {
    data:postDataType
  }
const Profile=(data:dataTypes)=>{
    const user = useSelector((val: rootReducertype) => val?.user?.user)
console.log(data)
useEffect(()=>{
    console.log(user)
},[user])

return <>
<Navbar />
<div className=' pt-14 h-fit flex lg:w-1/3 md:w-1/2 sm:w4/5 m-auto justify-between  '>
    <Image  className="rounded-full" src={user?.profile}  width={200} height={200} alt="user.name" />
    <p className='text-2xl font-bold mt-10'>{user?.name}</p>
    
</div>
<div className='md:w-1/2 lg:w-1/3 sm:w-4/5 m-auto  md:ml-100 sm:ml-150 lg:ml-100 pt-14  '>
    <ProfileCard />
</div>
</>
}
export default Profile