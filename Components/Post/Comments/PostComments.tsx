import { commentType } from '@/helpers/dataTypes';
import { CalcTime } from '@/helpers/timer';
import Image from 'next/image';
import React, { useState, useEffect, Dispatch } from 'react'
import { HiDotsVertical } from 'react-icons/hi';
import GetUser from '../../../helpers/GetUser';
import { FaReply } from 'react-icons/fa';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { BsCaretDownFill, BsCaretUpFill } from 'react-icons/bs';
import { FiSend } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, updatecomment } from '@/redux/comments/comments.action';
import { rootReducertype } from '@/redux/store';
import AlertModal from '@/Components/Navbar/AlertModal';
import { updatePost } from '@/redux/postdata/post.actions';
type commentTypes = {
  el: commentType;
}
const Comment = ({ el }: commentTypes) => {
  const user = GetUser()
  const dispatch:Dispatch<any>=useDispatch()
  const [replyInput, setReplyInput] = useState(false)
  const [editCommentInput, setEditCommentInput] = useState(false)
  const [largeBody, setLargeBody] = useState(false)
  const [more, setMore] = useState(true)
  const [commentBody, setCommentBody] = useState("");
  const [commentUpdateBody, setCommentUpdateBody] = useState(el.body);
  const [authorData, setAuthorData] = useState<any>(null)
  const [editCommentModal, setEditCommentModal] = useState(false)
  const {comments,update_error,update_success,delete_success} = useSelector((val:rootReducertype)=>val.comments)
  useEffect(() => {
    let bodyArr = el?.body?.split(" ").length;
    if (bodyArr > 10) {
      setMore(true)
      setLargeBody(true)
    } else {
      setLargeBody(false)
    }
  }, [el?.body])

  useEffect(() => {
    if (more) {
      let body = el?.body.split(' ').slice(0, 12)
      setCommentBody(body.join(' '))
    } else {
      setCommentBody(el?.body)
    }
  }, [el?.body, more])
  
  useEffect(() => {
    if (el.author_data) {
      setAuthorData(el.author_data[0]);
    }
  }, [el?.author_data])

  const handleEditComment = ()=>{
    setEditCommentModal(false)
    setReplyInput(false)
    setEditCommentInput(true)
  }
 
  const handleDeleteComment = (id:string|number)=>{
    setEditCommentModal(false)
    setEditCommentInput(false)
    dispatch(deleteComment(id))
    dispatch(updatePost({comments_count:comments.length-1},el.post_id))
  }

  const handleUpdateComment = (id:string|number)=>{
    setEditCommentInput(false)
      let data = {body:commentUpdateBody}
      dispatch(updatecomment(data,id))
  }

  return (
    <>
      <div  className='my-2 flex justify-between p-3 relative'>
        <div className='w-11/12' onClick={()=>setEditCommentModal(false)}>
          <div className='flex items-center' >
            <div className={`rounded-full mr-2 flex justify-center text-xl min-w-[60px]`}>
              <Image src={(authorData?.image) && authorData?.image || "/demo_img.png"} alt="profile" height={50} width={50} className='h-[50px] w-[50px] rounded-full' />
            </div>
            <div className=''>
              <p className='mr-2 font-semibold text-sm w-1/3' >{authorData?.username}</p>
              <p className="text-gray-400 text-[10px]">{CalcTime(Number(el.created_at))}</p>
            </div>
          </div>
          <div className='md:max-w-[400px] pl-[40px] ml-[30px] mt-2 border-l-[1px] border-gray-600'>
            <p className='text-xs text-white'>{commentBody} {largeBody ? more ? <span className='underline cursor-pointer text-blue-200 ml-2' onClick={() => setMore(false)}>More</span> : <span className='underline cursor-pointer text-blue-200 ml-2' onClick={() => setMore(true)}>Less</span> : ""}</p>
            <div className='mt-3 flex items-center text-sm'>
              <button className='text-[12px] flex items-center'>Reply<span>
                <BsCaretDownFill className='mx-1 mt-1 text-sm' />
                {/* <BsCaretUpFill className='mx-1 mt-1 text-sm'/>  */}
              </span> </button>
              <FaReply className='mx-3 cursor-pointer' onClick={()=>setReplyInput(!replyInput)} />
              <AiFillLike className='mx-3 cursor-pointer' />
              {/* <AiOutlineLike className='mx-3 cursor-pointer'/> */}
            </div>
            {replyInput && <div className='flex justify-between items-center text-sm mt-3 border-[1px] border-gray-600 py-2 px-3 rounded-full ' ><input type="text" className='bg-transparent outline-none' placeholder='Write Your reply here' /> <FiSend className='cursor-pointer hover:text-blue-400' />  </div>}
            {editCommentInput && <div className='flex justify-between items-center text-sm mt-3 border-[1px] border-gray-600 py-2 px-3 rounded-full ' ><input type="text" className='bg-transparent outline-none' placeholder='Update Your comment' value={commentUpdateBody} onChange={(e)=>setCommentUpdateBody(e.target.value)} /> <FiSend onClick={()=>handleUpdateComment(el._id)} className='cursor-pointer hover:text-blue-400' />  </div>}
          </div>
        </div>
        <div>
          {authorData && user?._id === user._id && <HiDotsVertical className='cursor-pointer' onClick={()=>setEditCommentModal(true)} />}
        </div>
        {editCommentModal&&<div className='absolute top-[20%] right-[10px] mt-2 px-4 py-2 flex flex-col bg-black/60 rounded-md animate-in slide-in-from-top-10'>
          <button onClick={handleEditComment} className='bg-blue-700 px-2 rounded-md mb-2'>Edit</button>
          <button onClick={()=>handleDeleteComment(el._id)} className='bg-blue-700 px-2 rounded-md my-2'>Delete</button>
          </div>}
      </div>
      {update_success&&<AlertModal type='success' text='comment updated successfully' />}
      {update_error&&<AlertModal type='error' text='comment cannot update' />}
      {delete_success&&<AlertModal type='success' text='comment deleted!' />}
    </>
  )
}

export default Comment
