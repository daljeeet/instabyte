import Image from 'next/image'
import React, { Dispatch, useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineHeart, AiOutlineClose } from 'react-icons/ai'
import { BiCommentAdd, BiMessageRounded } from 'react-icons/bi'
import { FiBookmark } from 'react-icons/fi'
import { editPost } from '@/redux/postdata/post.actions'
import { useDispatch, useSelector } from 'react-redux'
import { rootReducertype } from '@/redux/store'
import CardSwiper from './CardSwiper'
import { HiDotsVertical } from 'react-icons/hi'
import { addComments, clearComments} from '@/redux/comments/comments.action'
import { CalcTime } from '@/helpers/timer'
import { commentType, postDataType } from '@/helpers/dataTypes'
import Comment from './Comment'
type postDataAll = {
    data: postDataType,
    closeModal: () => void
}
const PostDetails = (props: postDataAll) => {
    const {loading, error, comments} =  useSelector((val:rootReducertype)=>val.comments)
    const dispatch: Dispatch<any> = useDispatch()
    const user = useSelector((val: rootReducertype) => val?.user?.user)
    const { data, closeModal } = props
    const [comment, setComment] = useState("")
    useEffect(() => {
        document.body.className = "overflow-y-hidden";
        return () => {
            document.body.className = "overflow-y-auto";
            dispatch(clearComments())
        }
    }, [dispatch])
    const handleLike=(state:boolean,el:postDataType)=>{
        if(state){
           el.likes.push(user.id)
            if(el._id){
                dispatch(editPost({likes:el.likes},el._id))
            }
        }
        else{
        let newLikedel=  el.likes.filter((e)=>{
        return e!==user.id
          })
          if(el._id){
            el.likes= newLikedel;
              dispatch(editPost({likes:el.likes},el._id))
            }
        }
        }
    const handleCommentChange = (e: { target: { value: React.SetStateAction<string> } }) => {
        setComment(e.target.value)
    }
    const handleComment = (el: postDataType) => {
        if(el._id){
          
            let newComment:commentType = {
                author: user._id,
                body: comment,
                post_id: el._id,
            }
            let allcomments = [...comments, newComment]
            dispatch(addComments (newComment,allcomments))
            dispatch(editPost({comments:el.comments_count+1},el._id))
            el.comments_count++
            }
        setComment("")
    }
    return (
        <div onClick={() => closeModal()} className='fixed h-screen flex justify-center items-center right-0 top-0 left-0 bg-black/60 z-30' >
            <div onClick={() => closeModal()} className='fixed md:top-2 top-0 right-0 z-10 md:right-2 m-4 cursor-pointer'>
                <AiOutlineClose className='text-3xl' />
            </div>
            <div onClick={(e) => { e.stopPropagation() }} className='bg-darkbg flex md:flex-row flex-col h-[80%] md:w-[80%] relative overflow-y-auto scrollbar-hide animate-in zoom-in'>

                {/* ===================post Image ===================== */}

                <div className='md:w-1/2 w-full justify-center items-center flex'>
                    <div className=" w-fit overflow-y-auto m-auto justify-center items-center flex scrollbar-hide relative" >
                       <CardSwiper data={data} />
                    </div>
                </div>
                {/* ===================post Details And comments ===================== */}
                <div className='md:w-1/2 w-full my-2 flex flex-col justify-between items-center'>
                    {/* ===================profile image and name ===================== */}
                    <div className='w-11/12 h-14 flex items-center'> {data.result&&<Image src={(data?.result[0]?.profile)||"/demo_img.png"} className="rounded-full ml-4 h-12 w-12 " width={50} height={50} alt={data.caption} />}
                    <div className='mx-4'>
                       { data.result&&<div> {data?.result[0]?.username} </div>}
                        <div className='text-gray-400 font-semibold text-sm' >{CalcTime(Number(data.posted_on))}</div>
                    </div>
                    </div>
                    {/* ===================profile image and name ===================== */}
                    <div className='w-11/12 h-2/3 overflow-y-auto py-2 scrollbar-hide border-t-2 mt-2 border-gray-600'>
                        {
                            comments.length==0?<div className='text-gray-500'>No Comments Yet....</div>:
                            <div>
                                {
                               loading?"loading comments...":comments?.map((el:commentType, id:number) =><Comment key={id} el={el} />)
                                }
                                {error&&<div>something went wrong...</div>}
                            </div>
                        }
                    </div>

                    {/* ===================Like, comment Buttons===================== */}
                    <div className='w-11/12 h-20 flex flex-col border-b-2 border-t-2 border-gray-600 mt-2'>
                        <div className='flex w-full justify-between mt-1' >
                            <div className='flex w-1/3 h-10 items-center justify-around'>
                                {
                                    data?.likes.includes(user.id) ? <AiFillHeart onClick={() => handleLike(false, data)} className='text-3xl cursor-pointer text-red-500 animate-in zoom-in' />
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
                                comments.length == 0 ? `No Comments` : comments.length === 1 ? "1 Comment" : `${comments.length} Comments`
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