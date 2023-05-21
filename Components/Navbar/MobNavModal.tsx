import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Loader } from '../Loader'
import { userSrchResultData } from './NavModal'
import UserDiv from './SearchResultUsers'

const MobNavModal = () => {
    const [srchData, setSrchData] = useState("")
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        if(srchData.length>1){
            let id= setTimeout(() => {
                getUserData(srchData)
            }, 1000);
            return ()=>{
                clearTimeout(id)
            }
        }
     // eslint-disable-next-line react-hooks/exhaustive-deps
     },[srchData])
     const getUserData = async(input:string)=>{
        try {
            setLoading(true)
            let res = await axios.get(`${process.env.NEXT_PUBLIC_PROTECTED_URL}/search/${input}`);
            setData(res.data)
            setLoading(false)
        } catch (err) {
            throw err
        }
     }
  return (
        <>
        <label className='w-3/5 m-auto outline-2 bg-gray-600/80 h-8 rounded-lg flex  '>
        <input onChange={(e)=>setSrchData(e.target.value)} type="search" placeholder='search' className=' pl-2 text-white outline-none bg-transparent w-full'/>
        </label>
       {srchData.length>1&&<div className='fixed w-full top-14 min-h-[50%] bg-black'>
            <h3 className='text-gray-500 text-center' >Search results</h3>
            {loading&&<div className='w-2/3 m-auto mt-10'><Loader/></div> }
            {data?.map((el:userSrchResultData)=><div key={el._id} className='w-5/6 m-auto' ><UserDiv data={el}/> </div>)}
        </div>}
        </>
  )
}

export default MobNavModal