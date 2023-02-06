import Image from 'next/image'
import React from 'react'
import { postDataType } from './CreateModal'
import { AiFillHeart, AiOutlineHeart,AiOutlineClose } from 'react-icons/ai'
import { BiCommentAdd, BiMessageRounded } from 'react-icons/bi'
import { FiBookmark, FiSend } from 'react-icons/fi'

type postDataAll = {
    data: postDataType,
    closeModal: () => void
}

const PostDetails = (props: postDataAll) => {
    const { data, closeModal } = props
    return (
        <div className='fixed h-screen flex justify-center items-center right-0 top-0 left-0 bg-black/60 z-10' >
            <div onClick={() => closeModal()} className='fixed md:top-2 top-0 right-0 z-10 md:right-2 m-4 cursor-pointer'><AiOutlineClose className='text-3xl' /></div>
            <div className='bg-darkbg flex md:flex-row flex-col h-[90%] md:w-[80%] relative overflow-y-auto'>

                {/* ===================post Image ===================== */}

                <div className='md:w-1/2 w-full justify-center items-center flex'>
                    {data?.imgUrl.map((el, id) => <div key={id} className="h-full overflow-y-auto m-auto justify-center items-center flex scrollbar-hide" >
                        <Image src={el} width={400} height={1600} className='rounded-2xl' alt='Post Image' />
                    </div>
                    )}
                </div>
                {/* ===================post Details And comments ===================== */}
                <div className='md:w-1/2 w-full flex flex-col justify-between items-center'>

                    {/* ===================profile image and name ===================== */}
                    <div className='w-11/12 h-14 flex items-center'> <Image src={data.owner_profile} className="rounded-full ml-4 " width={50} height={50} alt={data.owner} />
                        <div className='mx-4'> {data.owner} </div>
                        <div className='text-gray-400 font-semibold text-sm' >{data.posted_on}</div>
                    </div>

                    {/* ===================profile image and name ===================== */}
                    <div className='w-11/12 h-2/3 overflow-y-auto py-2 scrollbar-hide border-t-2 mt-2 border-gray-600'>

                       {
                        data?.comments.length===1?<div className='text-gray-500'>No Comments Yet....</div>:                       
                       data.comments?.map((el,id)=><div key={id} className='flex m-3 items-center'>
                            <div className='h-10 w-10 rounded-full mr-2 flex justify-center items-center text-2xl bg-indigo-900'>{el.user.split('').slice(0,1).join("").toUpperCase()}</div>
                            <p className='mr-2 font-semibold' >{el.user}</p>
                            <p className='w-2/3' >{el.comment}</p>
                        </div>)}    
                    </div>

                    {/* ===================Like, comment Buttons===================== */}
                    <div className='w-11/12 h-20 flex flex-col border-b-2 border-t-2 border-gray-600 mt-2'>
                       <div className='flex w-full justify-between mt-1' >
                        <div className='flex w-1/3 h-10 items-center justify-around'>
                         <AiOutlineHeart className='text-3xl cursor-pointer' />
                        <BiMessageRounded className='text-3xl cursor-pointer' />
                        <FiSend className='text-3xl cursor-pointer' />
                        </div>
                        <div>
                        <FiBookmark className='text-3xl cursor-pointer' />
                        </div>
                        </div>
                        <div className='ml-4 font-semibold' >{data.likes.length} Likes</div>
                    </div>

                    {/* ===================Write Comment===================== */}

                    <div className='w-11/12 h-14 flex items-center ml-4 '>
                        <BiCommentAdd className='text-gray-500 text-2xl' />
                        <input type="text" placeholder='Write Comment...' className='bg-transparent w-5/6 pl-4 outline-none'/>
                        <button className={`px-3 rounded-md font-semibold`} >Post</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PostDetails