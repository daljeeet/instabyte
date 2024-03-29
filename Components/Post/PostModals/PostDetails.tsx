import Image from 'next/image'
import React, { Dispatch, useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineHeart, AiOutlineClose } from 'react-icons/ai'
import { BiMessageRounded } from 'react-icons/bi'
import { FiBookmark } from 'react-icons/fi'
import { updatePost } from '@/redux/postdata/post.actions'
import { useDispatch, useSelector } from 'react-redux'
import { rootReducertype } from '@/redux/store'
import CardSwiper from '../CardSwiper'
import { HiDotsVertical } from 'react-icons/hi'
import { clearComments } from '@/redux/comments/comments.action'
import { CalcTime } from '@/helpers/timer'
import { commentType, resPostDataType } from '@/helpers/dataTypes'
import Comment from '../Comments/PostComments'
import NewComment from '../Comments/NewComment'
import GetUser from '../../../helpers/GetUser'
type postDataAll = {
    data: resPostDataType,
    closeModal: () => void
}

const PostDetails = (props: postDataAll) => {
    const user = GetUser()
    const { data, closeModal } = props
    const dispatch: Dispatch<any> = useDispatch()
    const [allComments, setAllComments] = useState([])
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(data.likes)
    const { get_loading, get_error, comments, update_loading } = useSelector((val: rootReducertype) => val.comments)
    useEffect(() => {
        if (user) {
            likes.includes(user?._id) ? setLiked(true) : setLiked(false)
        }
    }, [likes, user, user?._id])

    useEffect(() => {
        setAllComments(comments)
    }, [comments, update_loading])

    useEffect(() => {
        document.body.className = "overflow-y-hidden";
        return () => {
            document.body.className = "overflow-y-auto";
            dispatch(clearComments())
        }
    }, [dispatch])

    const unlikePost = (el: resPostDataType) => {
        if (user) {
            let updateLikes = likes.filter((e) => e !== user?._id)
            setLikes(updateLikes)
            dispatch(updatePost({ likes: updateLikes }, el._id))
        }
    }

    const likePost = (el: resPostDataType) => {
        if (user) {
            setLikes([...likes, user._id])
            dispatch(updatePost({ likes: [...likes, user._id] }, el._id))
        }
    }

    return (
        <div onClick={() => closeModal()} className='fixed h-screen flex justify-center items-center right-0 top-0 left-0 bg-black/60 z-30' >
            <div onClick={() => closeModal()} className='fixed md:top-2 top-0 right-0 z-10 md:right-2 m-4 cursor-pointer'>
                <AiOutlineClose className='text-3xl' />
            </div>
            <div onClick={(e) => { e.stopPropagation() }} className='bg-darkbg flex md:flex-row flex-col h-[80%] md:w-[80%] relative overflow-y-auto scrollbar-hide animate-in zoom-in'>

                {/* ===================post Image ===================== */}

                <div className='md:w-1/2 w-full justify-center items-center flex'>
                    <div className="w-full p-4 overflow-y-auto m-auto justify-center items-center flex scrollbar-hide relative" >
                        <CardSwiper data={data} />
                    </div>
                </div>
                {/* ===================post Details And comments ===================== */}
                <div className='md:w-1/2 w-full my-2 flex flex-col justify-between items-center'>
                    {/* ===================profile image and name ===================== */}
                    <div className='w-11/12 h-14 flex items-center'> {data.author_data && <Image src={(data?.author_data[0]?.image) || "/demo_img.png"} className="rounded-full ml-4 h-12 w-12 " width={50} height={50} alt={data.caption} />}
                        <div className='mx-4'>
                            {data?.author_data && <div> {(data?.author_data[0]?.username) && data?.author_data[0]?.username} </div>}
                            <div className='text-gray-400 font-semibold text-sm' >{CalcTime(Number(data.posted_on))}</div>
                        </div>
                    </div>
                    {/* ===================profile image and name ===================== */}
                    <div className='w-11/12 h-2/3 overflow-y-auto py-2 scrollbar-hide border-t-2 mt-2 border-gray-600'>
                        {
                            allComments.length == 0 ? <div className='text-gray-500'>No Comments Yet....</div> :
                                <div>
                                    {
                                        get_loading ? "loading comments..." : allComments?.map((el: commentType, id: number) => <Comment key={id} el={el} />)
                                    }
                                    {get_error && <div>something went wrong...</div>}
                                </div>
                        }
                    </div>

                    {/* ===================Like, comment Buttons===================== */}
                    <div className='w-11/12 h-20 flex flex-col border-b-2 border-t-2 border-gray-600 mt-2'>
                        <div className='flex w-full justify-between mt-1' >
                            <div className='flex w-1/3 h-10 items-center justify-around'>
                                {
                                    liked ? <AiFillHeart onClick={() => unlikePost(data)} className='text-3xl cursor-pointer text-red-500 animate-in zoom-in' />
                                        : <AiOutlineHeart onClick={() => likePost(data)} className='text-3xl cursor-pointer animate-in zoom-in' />
                                }
                                <BiMessageRounded className='text-3xl cursor-pointer' />
                                <FiBookmark className='text-3xl cursor-pointer' />
                                {/* <FiSend className='text-3xl cursor-pointer' /> */}
                            </div>
                        </div>
                        <div className='ml-4 font-semibold flex items-center' >
                            <p className='mr-2'>
                                {likes.length == 0 ? "No Likes" : likes.length == 1 ? `1 Like ` : ` ${likes.length} Likes`}
                            </p>
                            <HiDotsVertical className='' />
                            <p className='mx-2' >{
                                comments.length == 0 ? `No Comments` : comments.length === 1 ? "1 Comment" : `${comments.length} Comments`
                            }</p>
                        </div>
                    </div>

                    {/* ===================Write Comment===================== */}

                    <div className='w-11/12 h-14 flex items-center ml-4'>
                        <NewComment el={data} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PostDetails