import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import UserDiv from './SearchResultUsers'
import axios from 'axios'
type srchProptypes = {
    closeSrchModal(): void
    isSrch: boolean
}
export interface userSrchResultData{
    _id:string|number,
    image:string,
    name:string,
}
const NavModal = (props: srchProptypes) => {
    const [srchData, setSrchData] = useState<string>("")
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const refrence = useRef<any>(null)
    useEffect(() => {
        refrence?.current?.focus()
    }, [])
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setSrchData(e.target.value)
    }
    const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key == "Enter") {
            if (srchData.length > 0) {
                getData(srchData)
            }
            e.preventDefault()
        }
    }
    const getData = async (query: string) => {
        setLoading(true)
        try {
            let res = await axios.get(`${process.env.NEXT_PUBLIC_PROTECTED_URL}/search/${query}`);
            setData(res.data)
            setLoading(false)
        } catch (err) {
            throw err
        }
    }
    if (props.isSrch) {
        return (
            <>
            <div onClick={props.closeSrchModal} className={`absolute md:left-20 h-full w-screen z-50`} >
                <div onClick={(e) => { e.stopPropagation() }} className='w-52 animate-width overflow-hidden bg-black/80 flex flex-col h-full ' >
                    <div className='flex flex-col mt-10 items-center overflow-hidden'>
                        <div className='w-5/6 m-auto' >
                            <input ref={refrence} type="search" onKeyDown={handleKeyPress} onChange={handleChange} className='border-2 border-blue-300 rounded-md bg-transparent w-full outline-none pl-2' placeholder='Search here...' />
                        </div>
                        {/* After Successful Search  */}
                        <div className='w-full px-3 mt-3'>
                            {/* map over this: */}
                            {loading ? <Image src="/insta_loading.gif" alt="loading" width={100} height={50} /> : data.length ? data?.map((el: userSrchResultData) => <UserDiv key={el._id} data={el} />):<p>No Data Found</p>}
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    } else {
        return (
            <>
                <div onClick={props.closeSrchModal} className={`absolute md:left-20 h-full w-screen z-50`} >
                    <div onClick={(e) => { e.stopPropagation() }} className='w-52 animate-width overflow-hidden bg-black/80 flex flex-col h-full '>
                        <h2 className='mt-10 font-semicold' >Your Notifications</h2>
                        <div className='h-full mt-4 mb-10 mr-4 border border-grey_shade rounded-lg'>
                            <p className='text-gray-500 text-center text-sm mt-3'>No new Notifications</p>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default NavModal