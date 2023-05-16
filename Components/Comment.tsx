import { commentType } from '@/helpers/dataTypes';
import { CalcTime } from '@/helpers/timer';
import { rootReducertype } from '@/redux/store';
import Image from 'next/image';
import React, { useState,useEffect } from 'react'
import { HiDotsVertical } from 'react-icons/hi';
import { useSelector } from 'react-redux';
type commentTypes = {
    el:commentType;
}
const Comment = ({el}:commentTypes) => {
    const user = useSelector((val: rootReducertype) => val?.user?.loggedInUser)
    const [authorData,setAuthorData] = useState<any>(null)
    useEffect(() => {
      if(el.author_data){
        setAuthorData(el.author_data[0]);    
      }
    }, [el?.author_data])
    
    const handleEditComment =(elem:commentType)=>{
    
    }
      return (      
    <div>
            {el.author =='' ? "" : <div className='  flex m-3 items-center justify-between'>
                <div className={`rounded-full mr-2 flex justify-center items-center text-xl`}>
                  <Image src={(authorData?.image)?authorData?.image:user.image} alt="profile" height={50} width={50} className='h-[50px] w-[50px] rounded-full' />
                </div>
                <p className='mr-2 font-semibold text-sm w-1/3' >{authorData?.username}</p>
                <div className='w-1/2 text-gray-400 text-[10px]'>
                    <p className='text-sm text-white'>{el.body}</p>
                       <p>{CalcTime(Number(el.created_at))}</p>
                </div>
               {authorData&&user._id===authorData._id&&<HiDotsVertical className='cursor-pointer' onClick={()=>handleEditComment(el)} />}
            </div>}
            </div>
  )
}

export default React.memo(Comment,()=>true)