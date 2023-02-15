import Image from 'next/image'
import React, { Dispatch, useEffect, useState } from 'react'
import { postDataType } from './CreateModal'
import { AiFillHeart, AiOutlineHeart, AiOutlineClose } from 'react-icons/ai'
import { BiCommentAdd, BiMessageRounded } from 'react-icons/bi'
import { FiBookmark, FiSend } from 'react-icons/fi'
import { editPost } from '@/redux/postdata/post.actions'
import { useDispatch, useSelector } from 'react-redux'
import { rootReducertype } from '@/redux/store'
import CardSwiper from './CardSwiper'
import { HiDotsVertical } from 'react-icons/hi'
type postDataAll = {
    data: postDataType,
    closeModal: () => void
}
const PostDetails = (props: postDataAll) => {
    const dispatch: Dispatch<any> = useDispatch()
    const user = useSelector((val: rootReducertype) => val?.user?.user)
    const { data, closeModal } = props
    const [comment, setComment] = useState("")
    const [currentDate, setCurrentDate] = useState(new Date().toDateString())
    useEffect(() => {
        document.body.className = "overflow-y-hidden";
        return () => {
            document.body.className = "overflow-y-auto";
        }
    }, [])
    const handleLike = (state: boolean, el: postDataType) => {
        if (state) {
            el.likes.push(user.name)
            dispatch(editPost(el))
        }
        else {
            let newLikedel = el.likes.filter((el) => {
                return el !== user.name
            })
            el.likes = newLikedel
            dispatch(editPost(el))

        }
    }
    const handleCommentChange = (e: { target: { value: React.SetStateAction<string> } }) => {
        setComment(e.target.value)
    }
    const handleComment = (el: postDataType) => {
        var newComment = {
            user: user?.name,
            comment: comment,
            time: new Date().toDateString()
        }
        el.comments.push(newComment)
        dispatch(editPost(el))
        setComment("")
    }
    return (
        <div onClick={() => closeModal()} className='fixed h-screen flex justify-center items-center right-0 top-0 left-0 bg-black/60 z-10' >
            <div onClick={() => closeModal()} className='fixed md:top-2 top-0 right-0 z-10 md:right-2 m-4 cursor-pointer'>
                <AiOutlineClose className='text-3xl' />
            </div>
            <div onClick={(e) => { e.stopPropagation() }} className='bg-darkbg flex md:flex-row flex-col h-[90%] md:w-[80%] relative overflow-y-auto scrollbar-hide animate-in zoom-in'>

                {/* ===================post Image ===================== */}

                <div className='md:w-1/2 w-full justify-center items-center flex'>
                    <div className=" w-fit overflow-y-auto m-auto justify-center items-center flex scrollbar-hide" >
                        <CardSwiper data={data?.imgUrl} />
                    </div>
                </div>
                {/* ===================post Details And comments ===================== */}
                <div className='md:w-1/2 w-full my-2 flex flex-col justify-between items-center'>
                    {/* ===================profile image and name ===================== */}
                    <div className='w-11/12 h-14 flex items-center'> <Image src={data.owner_profile} className="rounded-full ml-4 " width={50} height={50} alt={data.owner} />
                    <div className='mx-4'>
                        <div> {data.owner} </div>
                        <div className='text-gray-400 font-semibold text-sm' >{data.posted_on}</div>
                    </div>
                    </div>

                    {/* ===================profile image and name ===================== */}
                    <div className='w-11/12 h-2/3 overflow-y-auto py-2 scrollbar-hide border-t-2 mt-2 border-gray-600'>
                        {
                            data.comments.length === 1 ? <div className='text-gray-500'>No Comments Yet....</div> :
                                data.comments?.map((el, id) => {
                                    const colors = ["bg-black", "bg-violet-900", "bg-blue-800", "bg-sky-900", "bg-emerald-800", "bg-yellow-900", "bg-teal-700", "bg-cyan-700", "bg-blue-500", "bg-pink-900"]
                                    const random = Math.floor(Math.random() * colors.length)
                                    return (<div key={id}>
                                        {el.user == '' ? "" : <div className='  flex m-3 items-center justify-between'>
                                            <div className={`h-8 w-8 rounded-full mr-2 flex justify-center items-center text-xl ${colors[random]}`}>{el.user.split('').slice(0, 1).join("").toUpperCase()}</div>
                                            <p className='mr-2 font-semibold text-sm w-1/3' >{el.user}</p>

                                            <div className=' w-1/2'>
                                                <p className='text-sm' >{el.comment}</p>

                                                {
                                                    Date.parse(el.time) - Date.parse(new Date().toDateString()) <= 86400000 ? <p className='text-sm text-gray-500' >Today</p> : Date.parse(el.time) - Date.parse(new Date().toDateString()) <= 172800000 ? <p className='text-sm text-gray-500' >yesterday</p> : <p className='text-sm text-gray-500' >{el.time}</p>

                                                }
                                            </div>


                                        </div>}
                                    </div>
                                    )
                                })}
                    </div>

                    {/* ===================Like, comment Buttons===================== */}
                    <div className='w-11/12 h-20 flex flex-col border-b-2 border-t-2 border-gray-600 mt-2'>
                        <div className='flex w-full justify-between mt-1' >
                            <div className='flex w-1/3 h-10 items-center justify-around'>
                                {
                                    data.likes.includes(user.name) ? <AiFillHeart onClick={() => handleLike(false, data)} className='text-3xl cursor-pointer text-red-500 animate-in zoom-in' />
                                        : <AiOutlineHeart onClick={() => handleLike(true, data)} className='text-3xl cursor-pointer animate-in zoom-in' />
                                }
                                <BiMessageRounded className='text-3xl cursor-pointer' />
                                <FiBookmark className='text-3xl cursor-pointer' />
                                {/* <FiSend className='text-3xl cursor-pointer' /> */}
                            </div>
                        </div>
                        <div className='ml-4 font-semibold flex items-center' >
                            <p className='mr-2'>
                                {data?.likes.length == 0 ? "No Likes" : data.likes.length == 1 ? `1 Like ` : ` ${data.likes.length} Likes`}
                            </p>
                            <HiDotsVertical className='' />
                            <p className='mx-2' >{
                                data?.comments?.length == 1 ? `No Comments` : data.comments.length === 2 ? "1 Comment" : `${data.comments.length} Comments`
                            }</p>
                        </div>
                    </div>

                    {/* ===================Write Comment===================== */}

                    <div className='w-11/12 h-14 flex items-center ml-4 '>
                        <BiCommentAdd className='text-gray-500 text-2xl' />
                        <input onChange={handleCommentChange} value={comment} type="text" placeholder='Write Comment...' className='bg-transparent w-5/6 pl-4 outline-none' />
                        <button onClick={() => handleComment(data)} disabled={comment.length < 5} className={`px-3 rounded-md font-semibold ${comment.length < 5 ? "text-gray-500" : ''} `}>Post</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PostDetails