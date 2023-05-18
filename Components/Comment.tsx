import { commentType } from '@/helpers/dataTypes';
import { CalcTime } from '@/helpers/timer';
import Image from 'next/image';
import React, { useState,useEffect } from 'react'
import { HiDotsVertical } from 'react-icons/hi';
import GetUser from './GetUser';
import { spawn } from 'child_process';
import { FaReply } from 'react-icons/fa';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { BsCaretDownFill, BsCaretUpFill } from 'react-icons/bs';
import { FiSend } from 'react-icons/fi';
type commentTypes = {
    el:commentType;
}
const Comment = ({el}:commentTypes) => {
  const [replyInput, setReplyInput] = useState(false)
  const [largeBody,setLargeBody] =useState(false)
  const [more,setMore] = useState(true)
  const [commentBody, setCommentBody] = useState("");
  const [authorData,setAuthorData] = useState<any>(null)

  useEffect(()=>{
    let bodyArr = el?.body?.split(" ").length;
    if(bodyArr>10){
      setMore(true)
      setLargeBody(true)
    }else{
      setLargeBody(false)
    }
  },[el?.body])
    
  useEffect(()=>{
    if(more){
      let body = el?.body.split(' ').slice(0,12)
      setCommentBody(body.join(' '))
    }else{
      setCommentBody(el?.body)
    }
  },[el?.body, more])

  
  useEffect(() => {
    if(el.author_data){
      setAuthorData(el.author_data[0]);    
    }
  }, [el?.author_data])
  
  const user = GetUser()
   const handleEditComment =(elem:commentType)=>{
    
    }

  const handleReplyInput = ()=>{
    setReplyInput(!replyInput)
  }
      return (      
    <div>
            {el.author =='' ? "" : <div className='my-2 flex justify-between p-3'>
                <div>
                  <div className='flex items-center' >
                <div className={`rounded-full mr-2 flex justify-center text-xl min-w-[60px]`}>
                  <Image src={(authorData?.image)&&authorData?.image||"/demo_img.png"} alt="profile" height={50} width={50} className='h-[50px] w-[50px] rounded-full' />
                </div>
                <div className=''>
                <p className='mr-2 font-semibold text-sm w-1/3' >{authorData?.username}</p>
                <p className="text-gray-400 text-[10px]">{CalcTime(Number(el.created_at))}</p>
                </div>                 
                </div>
                <div className='md:max-w-[400px] pl-[40px] ml-[30px] mt-2 border-l-[1px] border-gray-600'>
                    <p className='text-xs text-white'>{commentBody} {largeBody?more?<span className='underline cursor-pointer text-blue-200 ml-2' onClick={()=>setMore(false)}>More</span>:<span className='underline cursor-pointer text-blue-200 ml-2' onClick={()=>setMore(true)}>Less</span>:""}</p>
                <div className='mt-3 flex items-center text-sm'>
                  <button className='text-[12px] flex items-center'>Reply<span>
                    <BsCaretDownFill className='mx-1 mt-1 text-sm'/> 
                    {/* <BsCaretUpFill className='mx-1 mt-1 text-sm'/>  */}
                    </span> </button>
                <FaReply className='mx-3 cursor-pointer' onClick={handleReplyInput} />
                <AiFillLike className='mx-3 cursor-pointer'/>
                {/* <AiOutlineLike className='mx-3 cursor-pointer'/> */}
                </div>
               {replyInput&& <div className='flex justify-between items-center text-sm mt-3 border-[1px] border-gray-600 py-2 px-3 rounded-full ' ><input type="text" className='bg-transparent outline-none' placeholder='Write Your reply here' /> <FiSend className='cursor-pointer hover:text-blue-400' />  </div> } 
                </div>
                </div>

                <div>
               {authorData&&user?._id===user._id&&<HiDotsVertical className='cursor-pointer' onClick={()=>handleEditComment(el)} />}
                </div>
            </div>}
            </div>
  )
}

export default React.memo(Comment,()=>true)
