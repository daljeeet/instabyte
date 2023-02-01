import React,{useState,useEffect} from 'react'
import { FiMoreHorizontal, FiBookmark, FiSend } from 'react-icons/fi'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { BiCommentAdd, BiMessageRounded } from 'react-icons/bi'
import CardSwiper from './CardSwiper'
const Card = (props: any) => {
const [comment,setComment] = useState("")

const handleComment = (e: { target: { value: React.SetStateAction<string> } })=>{
setComment(e.target.value)
}
return (
        <div className='mt-10 border-[1px] border-gray-600 rounded-md' >
            <div className='flex w-full justify-between items-center'>
                <div className='flex items-center h-12' >
                    <div className='border-2 md:w-10 md:h-10 rounded-full mx-2'></div>
                    <div className='mx-2 font-semibold'>{props.elem.owner}</div>
                    <div className='text-sm text-gray-400'> {props.elem.posted_on} </div>
                </div>
                <div className='mr-2' >
                    <FiMoreHorizontal className='font-bold text-xl cursor-pointer' />
                </div>
            </div>
            <div className='h-fit my-2' >
                <CardSwiper data={props?.elem?.imgUrl} />
            </div>
            <div className='p-2' >
                <div className='postactions flex w-full justify-between' >
                    <div className='my-1 flex items-center' >
                        <AiOutlineHeart className='text-2xl cursor-pointer' />
                        {/* <AiFillHeart className='text-2xl cursor-pointer text-red-500' /> */}
                        <BiMessageRounded className='text-2xl cursor-pointer mx-2' />
                        <FiSend className='text-2xl cursor-pointer' />
                    </div>
                    <div className='pr-4'>
                        <FiBookmark className='text-2xl cursor-pointer' />
                    </div>
                </div>
                <div className='border-b-2 border-gray-600 pb-3'>
                <p>
                {props.elem?.likes?.length} likes
                </p>
                <p>
                    <span className='font-semibold mx-2'>{props.elem.owner}</span>
                    {props.elem.caption.split(' ').slice(0,8).join(' ')}... <span className='text-sm text-gray-500 cursor-pointer'> more</span>
                </p>
                {/* {props.elem.comments.map((el: { user: string, comment: string }, id: number) => <p key={id}>{el.comment}</p>)} */}
                <p className='cursor-pointer underline ' >
                    view all comments
                </p>
                </div>
                <div className='flex items-center justify-around'>
                    <BiCommentAdd/>
                <input type="text" placeholder='add a comment...' onChange={handleComment} className='outline-none bg-transparent my-3 w-3/5' />
                <button disabled={comment==''} className='font-bold bg-black/60 px-3 rounded-md'>post</button>
                </div>
            </div>
        </div>
    )
}

export default Card