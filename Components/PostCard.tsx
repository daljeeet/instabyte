import Image from 'next/image'
import React, { useState, useEffect, useRef, Dispatch } from 'react'
import { FiMoreHorizontal, FiBookmark } from 'react-icons/fi'
import { AiFillHeart, AiOutlineDelete, AiOutlineEdit, AiOutlineHeart } from 'react-icons/ai'
import { BiMessageRounded, BiMessageSquareAdd } from 'react-icons/bi'
import { HiDotsVertical } from 'react-icons/hi'
import CardSwiper from './CardSwiper'
import { useDispatch} from 'react-redux'
import { editPost } from '@/redux/postdata/post.actions'
import { useRouter } from 'next/router'
import { CalcTime } from '@/helpers/timer'
import { resPostDataType } from '@/helpers/dataTypes'
import NewComment from './NewComment'
import GetUser from './GetUser'
type PostCardType = {
    el: resPostDataType,
    // handleEditPost: (id: string | undefined) => void,
    handlePostDetails: (el: resPostDataType) => void,
    handlePostEdit: (el: resPostDataType) => void,
    openAddImgModal: (el: resPostDataType) => void,
    handleDelModal: (el: resPostDataType) => void,
    isLast: boolean,
    newLimit: () => void
}
const PostCard = (props: PostCardType) => {
    const [isLiked, setIsLiked] = useState(false)
    const [postEditmodal, setPostEditmodal] = useState(false)
    const { el, handlePostDetails, handlePostEdit, openAddImgModal, handleDelModal, isLast, newLimit } = props
    const [showComment, setShowComment] = useState(false)
    const user = GetUser()
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

    useEffect(()=>{
        if(el?.likes?.includes(user?._id)){
            setIsLiked(true)
        }else{
            setIsLiked(false)
        }
    },[el?.likes, user?._id])

    const handlePostEditmodal = () => {
        setPostEditmodal(true)
    }
    const handleEditPost = () => {
        setPostEditmodal(false)
    }
    const handleLike = (state: boolean, el: resPostDataType) => {
        if (user) {
            if (state) {
                setIsLiked(true)
                el?.likes?.push(user._id)
                if (el._id) {
                    dispatch(editPost({ likes: el.likes }, el._id))
                }
            }
            else {
                setIsLiked(false)
                let newLikedel = el.likes.filter((e) => {
                    return e !== user._id
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

    const handleUserProfile= (id:string|number)=>{
        if(user){
            Router.push(`/profile/${id}`)
        }
    }
    return (
        <div ref={cardRef} className='mt-10 border-[1px] bg-black/20 rounded-md relative border-blue-900 py-2'>
            {/* Post & Author Details : name,time, etc */}
            <div className='flex w-full justify-between items-center'>
                <div className='flex items-center h-12 w-5/6' >
                    <div className='h-10 w-10 rounded-full mx-2'>
                         <Image src={(el?.author_data[0]?.image) || "/demo_img.png"} alt="User's Photo" width={100} height={100} className='rounded-full w-10 h-10' />
                    </div>
                    <div onClick={()=>handleUserProfile(el.author_data[0]._id)} className='mx-2 font-semibold w-3/4 overflow-hidden hover:underline cursor-pointer'> {el.author_data ? <p>{el?.author_data[0]?.username}</p> : <p>{user.username}</p>}
                        <p className='text-sm font-semibold text-gray-400 text-[12px] '> {CalcTime(Number(el?.posted_on))} </p>
                    </div>
                </div>
                {el.author_data[0]._id === user?._id ? <div className='mr-2' >
                    <FiMoreHorizontal onClick={handlePostEditmodal} className='font-bold text-xl cursor-pointer' />
                </div> : ''}
            </div>
            {/*  Post Images*/}

            <div className='h-fit my-2 relative' >
                <CardSwiper data={el} />
            </div>
            {/* Post Buttons : Like comment save etc. */}
            <div className='p-2' >

                <div className='postactions flex w-full justify-between' >
                    <div className='my-1 flex items-center' >
                        {
                            isLiked?<AiFillHeart onClick={() => handleLike(false, el)} className='text-2xl cursor-pointer text-red-500 animate-in zoom-in' />
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
                        {el.author_data && <span className='font-semibold text-sm ml-2'>{el?.author_data[0]?.username}</span>}
                        {
                            showComment ? <span className='mx-2' >{el.caption}</span> :
                                <span className='mx-2'> {el?.caption?.split(' ').slice(0, 4).join(' ') + "..."}
                                </span>
                        }
                        <span className='text-sm text-gray-500 cursor-pointer' onClick={ ()=>setShowComment(!showComment)} > {showComment ? "less" : "more"}</span>
                    </p>
                    <p className='cursor-pointer mx-2 text-sm text-gray-200 w-fit underline' onClick={() => handlePostDetails(el)} >
                        view comments
                    </p>
                </div>
                {/* Add a new comment on post from outside */}
                <NewComment el={el} />
            </div>
            {/* Post Crud Options modal */}
            {postEditmodal && <div onClick={handleEditPost} className='fixed h-screen flex justify-center items-center right-0 top-0 left-0 bg-black/20 z-10'> <div onClick={(e) => { e.stopPropagation() }} className='z-10 bg-black/70 font-bold p-10 rounded-lg animate-in zoom-in'>
                <p onClick={() => { setPostEditmodal(false); handlePostEdit(el) }} className='border-b-2 border-gray-500 my-4 text-lime-100 cursor-pointer flex items-center'><AiOutlineEdit className='mr-2' /> Edit Post</p>
                <p onClick={() => { setPostEditmodal(false); openAddImgModal(el) }} className='border-b-2 border-gray-500 my-4 text-lime-100 cursor-pointer flex items-center'> <BiMessageSquareAdd className='mr-2' /> Add photos</p>
                <p onClick={() => { setPostEditmodal(false); handleDelModal(el) }} className='border-b-2 border-gray-500 my-4 text-red-300 cursor-pointer flex items-center'> <AiOutlineDelete className='mr-2' /> Delete Post</p>
            </div> </div>}
        </div>
    )
}

export default PostCard