import Image from 'next/image'
import React, { useState, useEffect, useRef, Dispatch } from 'react'
import { FiMoreHorizontal, FiBookmark } from 'react-icons/fi'
import { AiFillHeart, AiOutlineDelete, AiOutlineEdit, AiOutlineHeart } from 'react-icons/ai'
import { BiMessageRounded, BiMessageSquareAdd } from 'react-icons/bi'
import { HiDotsVertical } from 'react-icons/hi'
import CardSwiper from './CardSwiper'
import { useDispatch } from 'react-redux'
import { updatePost } from '@/redux/postdata/post.actions'
import { useRouter } from 'next/router'
import { CalcTime } from '@/helpers/timer'
import { resPostDataType } from '@/helpers/dataTypes'
import NewComment from './Comments/NewComment'
import GetUser from '../../helpers/GetUser'
type PostCardType = {
    el: resPostDataType,
    handlePostDetails: (el: resPostDataType) => void,
    handlePostEdit: (el: resPostDataType) => void,
    openAddImgModal: (el: resPostDataType) => void,
    handleDelModal: (el: resPostDataType) => void,
    isLast: boolean,
    newLimit: () => void
}
const PostCard = (props: PostCardType) => {
    const { el, handlePostDetails, handlePostEdit, openAddImgModal, handleDelModal, isLast, newLimit } = props
    const [commentCount, setCommentCount] = useState(el.comments_count)
    const [postEditmodal, setPostEditmodal] = useState(false)
    const [showComment, setShowComment] = useState(false)
    const user = GetUser()
    const cardRef: any = useRef()
    const Router = useRouter()
    const [hide, setHide] = useState(false)
    const [likes, setLikes] = useState(el.likes)
    const [liked, setLiked] = useState(false);
    const dispatch: Dispatch<any> = useDispatch();

    useEffect(()=>{
        setLikes(el.likes)
    },[el])

    useEffect(() => {
        if (user) {
            likes.includes(user?._id) ? setLiked(true) : setLiked(false)
        }
    }, [likes, user, user?._id])

    useEffect(() => {
        let id: any;
        if (id) {
            clearInterval(id)
        }
        if (hide) {
            id = setTimeout(() => {
                setHide(false);
                clearTimeout(id)
            }, 500);
        }

    }, [hide])

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
    
    const handleDoubleClick = (el:resPostDataType) => {
        setHide(true)
        if(!likes.includes(user._id)){
            setLikes([...likes, user._id])
            dispatch(updatePost({ likes: [...likes, user._id] }, el._id))
        }
    }
    return (
        <div ref={cardRef} className='mt-10 border-[1px] bg-black/20 rounded-md relative border-blue-900 py-2'>
            {/* Post & Author Details : name,time, etc */}
            <div className='flex w-full justify-between items-center'>
                <div className='flex items-center h-12 w-5/6' >
                    <div className='h-10 w-10 rounded-full mx-2'>
                        <Image src={el.author_data ? el.author_data[0].image : user?.image} alt="User's Photo" width={100} height={100} className='rounded-full w-10 h-10' />
                    </div>
                    <div onClick={() => Router.push(`/profile/${el?.author_data[0]._id}`)} className='mx-2 font-semibold w-3/4 overflow-hidden'> {el.author_data ? <p className='hover:underline cursor-pointer' >{el?.author_data[0]?.username}</p> : <p>{user.username}</p>}
                        <p className='text-sm font-semibold text-gray-400 text-[12px] '> {CalcTime(Number(el?.posted_on))} </p>
                    </div>
                </div>
                {el.author_data[0]._id === user?._id ? <FiMoreHorizontal onClick={() => setPostEditmodal(true)} className='font-bold text-xl cursor-pointer mr-2' />:""}
            </div>

            {/*  Post Images*/}
            <div onDoubleClick={()=>handleDoubleClick(el)} className='h-fit my-2 relative' >
                <CardSwiper data={el} />
                {hide && <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                    <AiFillHeart className="text-6xl z-10 text-red-700 animate-in spin-in-90 zoom-in duration-200" />
                </div>
                }
            </div>
            {/* Post Buttons : Like comment save etc. */}
            <div className='p-2' >
                <div className='postactions flex w-full justify-between' >
                    <div className='my-1 flex items-center' >

                        {
                            liked ? <AiFillHeart onClick={() => unlikePost(el)} className='text-2xl cursor-pointer text-red-500 animate-in zoom-in' /> : <AiOutlineHeart onClick={() => likePost(el)} className='text-2xl cursor-pointer animate-in zoom-in' />
                        }

                        <BiMessageRounded onClick={() => handlePostDetails(el)} className='text-2xl cursor-pointer mx-2' />
                        <FiBookmark className='text-2xl cursor-pointer' />
                    </div>
                </div>
                <div className='border-b-2 border-gray-600 pb-3'>
                    <div className='flex items-center' >
                        <p className='text-sm'>
                            {
                                likes.length == 0 ? "No Likes" : likes.length == 1 ? `1 Like ` : ` ${likes.length} Likes`
                            }
                        </p>
                        <HiDotsVertical className='' />
                        <p className='text-sm'>
                            {
                                commentCount == 0 ? `No Comments` : commentCount == 1 ? "1 Comment" : `${commentCount} Comments`
                            }
                        </p>
                    </div>
                    <p className=''>
                        {el.author_data && <span className='font-semibold text-sm ml-2'>{el?.author_data[0]?.username}</span>}
                        {
                            showComment ? <span className='mx-2' >{el.caption}</span> :
                                <span className='mx-2'> {el?.caption?.split(' ').slice(0, 4).join(' ') + "..."}
                                </span>
                        }
                        <span className='text-sm text-gray-500 cursor-pointer' onClick={() => setShowComment(!showComment)} > {showComment ? "less" : "more"}</span>
                    </p>
                    <p className='cursor-pointer mx-2 text-sm text-gray-200 w-fit underline' onClick={() => handlePostDetails(el)} >
                        view comments
                    </p>
                </div>
                {/* Add a new comment on post from outside */}
                <NewComment el={el} setCommentCount={setCommentCount} />
            </div>

            {/* Post Crud Options modal */}
            {postEditmodal && <div onClick={() => setPostEditmodal(false)} className='fixed h-screen flex justify-center items-center right-0 top-0 left-0 bg-black/20 z-10'> <div onClick={(e) => { e.stopPropagation() }} className='z-10 bg-black/70 font-bold p-10 rounded-lg animate-in zoom-in'>
                <p onClick={() => { setPostEditmodal(false); handlePostEdit(el) }} className='border-b-2 border-gray-500 my-4 text-lime-100 cursor-pointer flex items-center'><AiOutlineEdit className='mr-2' /> Edit Post</p>
                <p onClick={() => { setPostEditmodal(false); openAddImgModal(el) }} className='border-b-2 border-gray-500 my-4 text-lime-100 cursor-pointer flex items-center'> <BiMessageSquareAdd className='mr-2' /> Add photos</p>
                <p onClick={() => { setPostEditmodal(false); handleDelModal(el) }} className='border-b-2 border-gray-500 my-4 text-red-300 cursor-pointer flex items-center'> <AiOutlineDelete className='mr-2' /> Delete Post</p>
            </div> </div>}
        </div>
    )
}

export default PostCard