import Image from 'next/image'
import React, { useState, useEffect, useRef, Dispatch } from 'react'
import { FiMoreHorizontal, FiBookmark } from 'react-icons/fi'
import { AiFillHeart, AiOutlineDelete, AiOutlineEdit, AiOutlineHeart } from 'react-icons/ai'
import { BiCommentAdd, BiMessageRounded, BiMessageSquareAdd } from 'react-icons/bi'
import { HiDotsVertical } from 'react-icons/hi'
import CardSwiper from './CardSwiper'
import { useDispatch, useSelector } from 'react-redux'
import { rootReducertype } from '@/redux/store'
import Loader from './Loader'
import { editPost } from '@/redux/postdata/post.actions'
import AlertModal from './AlertModal'
import { useRouter } from 'next/router'
import { addComments } from '../redux/comments/comments.action'
import { CalcTime } from '@/helpers/timer'
import { commentType, postDataType } from '@/helpers/dataTypes'
type PostCardType = {
    el: postDataType,
    // handleEditPost: (id: string | undefined) => void,
    handlePostDetails: (el: postDataType) => void,
    handlePostEdit: (el: postDataType) => void,
    openAddImgModal: (el: postDataType) => void,
    handleDelModal: (el: postDataType) => void,
    isLast: boolean,
    newLimit: () => void
}
const PostCard = (props: PostCardType) => {
    const [postEditmodal, setPostEditmodal] = useState(false)
    const { el, handlePostDetails, handlePostEdit, openAddImgModal, handleDelModal, isLast, newLimit } = props
    const loading_post = useSelector((val: rootReducertype) => val?.allPosts?.loading_post)
    const handleCommentChange = (e: { target: { value: React.SetStateAction<string> } }) => {
        setComment(e.target.value)
    }
    const [addComment, setAddComment] = useState(false)
    const [showComment, setShowComment] = useState(false)
    const [comment, setComment] = useState('')
    const user = useSelector((val: rootReducertype) => val?.user?.user)
    const dispatch: Dispatch<any> = useDispatch();
    const cardRef: any = useRef()
    const Router = useRouter()
    useEffect(() => {
        if (!cardRef?.current) return
        const observe = new IntersectionObserver(([entry]) => {
            if (isLast && entry.isIntersecting) {
                newLimit();
                observe.unobserve(entry.target)
            } else {
            }
        })
        observe.observe(cardRef.current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLast])

    const handlePostEditmodal = () => {
        setPostEditmodal(true)
    }
    const handleEditPost = () => {
        setPostEditmodal(false)
    }

    const handleLike = (state: boolean, el: postDataType) => {
        if (user) {
            if (state) {
                el?.likes?.push(user.id)
                if (el._id) {
                    dispatch(editPost({ likes: el.likes }, el._id))
                }
            }
            else {
                let newLikedel = el.likes.filter((e) => {
                    return e !== user.id
                })
                if (el._id) {
                    el.likes = newLikedel;
                    dispatch(editPost({ likes: el.likes }, el._id))
                }
            }
        } else {
            Router.push("/login")
        }
    }
    const handleComment = (el: postDataType) => {
        if (user) {
            if (el._id) {
                let newComment: commentType = {
                    author: user._id,
                    body: comment,
                    post_id: el._id,
                }
                // dispatch(editPost({ comments: el.comments_count + 1 }, el._id))
                dispatch(addComments(newComment, []))
            }
            setComment("")
            setAddComment(true)
            el.comments_count++
        } else {
            Router.push("/login")
        }
    }
    const toggleCaption = () => {
        setShowComment(!showComment)
    }
    return (
        <div ref={cardRef} className='mt-10 border-[1px] border-gray-600 rounded-md relative' >
            <div className='flex w-full justify-between items-center'>
                <div className='flex items-center h-12 w-5/6' >
                    <div className='h-10 w-10 rounded-full mx-2'>
                        {el?.result ? <Image src={(el?.result[0]?.profile) || "demo_img.png"} alt="User's Photo" width={100} height={100} className='rounded-full w-10 h-10' /> :
                            <Image src={user.profile} alt="User's Photo" width={100} height={100} className='rounded-full w-10 h-10' />}
                    </div>
                    <div className='mx-2 font-semibold w-3/4 overflow-hidden'> {el.result ? <p>{el?.result[0]?.username}</p> : <p>{user.username}</p>}
                        <p className='text-sm font-semibold text-gray-400 text-[12px] '> {CalcTime(Number(el?.posted_on))} </p>
                    </div>
                </div>
                {el.author === user?.id ? <div className='mr-2' >
                    <FiMoreHorizontal onClick={handlePostEditmodal} className='font-bold text-xl cursor-pointer' />
                </div> : ''}
            </div>
            <div className='h-fit my-2 relative' >
                <CardSwiper data={el} />
            </div>
            <div className='p-2' >
                <div className='postactions flex w-full justify-between' >
                    <div className='my-1 flex items-center' >
                        {
                            el?.likes?.includes(user?.id) ? <AiFillHeart onClick={() => handleLike(false, el)} className='text-2xl cursor-pointer text-red-500 animate-in zoom-in' />
                                : <AiOutlineHeart onClick={() => handleLike(true, el)} className='text-2xl cursor-pointer animate-in zoom-in' />
                        }
                        <BiMessageRounded onClick={() => handlePostDetails(el)} className='text-2xl cursor-pointer mx-2' />
                        <FiBookmark className='text-2xl cursor-pointer' />
                    </div>
                </div>
                <div className='border-b-2 border-gray-600 pb-3'>
                    <div className='flex items-center' >
                        <p className='text-sm'>
                            {
                                el?.likes?.length == 0 ? "No Likes" : el.likes?.length == 1 ? `1 Like ` : ` ${el.likes?.length} Likes`
                            }
                        </p>
                        <HiDotsVertical className='' />
                        <p className='text-sm'>
                            {
                                el?.comments_count == 0 ? `No Comments` : el.comments_count === 1 ? "1 Comment" : `${el.comments_count} Comments`
                            }
                        </p>
                    </div>
                    <p className=''>
                        {el.result && <span className='font-semibold text-sm ml-2'>{el?.result[0]?.name}</span>}
                        {
                            showComment ? <span className='mx-2' >{el.caption}</span> :
                                <span className='mx-2'> {el?.caption?.split(' ').slice(0, 4).join(' ') + "..."}
                                </span>
                        }
                        <span className='text-sm text-gray-500 cursor-pointer' onClick={toggleCaption} > {showComment ? "less" : "more"}</span>
                    </p>
                    <p className='cursor-pointer mx-2 text-sm text-gray-200 w-fit underline' onClick={() => handlePostDetails(el)} >
                        view comments
                    </p>
                </div>
                <div className='flex items-center justify-around'>
                    <BiCommentAdd />
                    <input value={comment} type="text" placeholder='add a comment...' onChange={(e) => handleCommentChange(e)} className='outline-none bg-transparent my-3 w-3/5' />
                    <button onClick={() => handleComment(el)} disabled={comment.length < 4} className={`font-bold bg-black/60 px-3 rounded-md ${comment.length < 4 ? "text-gray-500" : ""}`}>post</button>
                </div>
            </div>
            {postEditmodal && <div onClick={handleEditPost} className='fixed h-screen flex justify-center items-center right-0 top-0 left-0 bg-black/20 z-10'> <div onClick={(e) => { e.stopPropagation() }} className='z-10 bg-black/70 font-bold p-10 rounded-lg animate-in zoom-in'>
                <p onClick={() => { setPostEditmodal(false); handlePostEdit(el) }} className='border-b-2 border-gray-500 my-4 text-lime-100 cursor-pointer flex items-center'><AiOutlineEdit className='mr-2' /> Edit Post</p>
                <p onClick={() => { setPostEditmodal(false); openAddImgModal(el) }} className='border-b-2 border-gray-500 my-4 text-lime-100 cursor-pointer flex items-center'> <BiMessageSquareAdd className='mr-2' /> Add photos</p>
                <p onClick={() => { setPostEditmodal(false); handleDelModal(el) }} className='border-b-2 border-gray-500 my-4 text-red-300 cursor-pointer flex items-center'> <AiOutlineDelete className='mr-2' /> Delete Post</p>
            </div> </div>}
            {addComment && <AlertModal text='Comment Added' color="bg-green-500" />}
        </div>
    )
}

export default PostCard