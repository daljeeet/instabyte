import { resPostDataType } from '@/helpers/dataTypes'
import { addComments } from '@/redux/comments/comments.action'
import { Dispatch } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { BiCommentAdd } from 'react-icons/bi'
import { useDispatch} from 'react-redux'
import AlertModal from '../../Navbar/AlertModal'
import { useRouter } from 'next/router'
import GetUser from '../../../helpers/GetUser'
import { updatePost } from '@/redux/postdata/post.actions'

interface propsType{
    el:resPostDataType
    setCommentCount?:any
}
export interface initialCommentType{
    author:string|number,
    body: string,
    post_id:string|number,
}
const NewComment = ({el,setCommentCount}:propsType) => {
    const [comment, setComment] = useState('')
    const [addComment, setAddComment] = useState(false)
    const dispatch:Dispatch<any> = useDispatch()
    const user = GetUser()
    const Router = useRouter()

    const handleCommentChange:React.ChangeEventHandler<HTMLInputElement>  = (e) => {
        e.target.style.height="auto";
    e.target.style.height= `${e.target.scrollHeight}px`
        setComment(e.target.value)
    }
    const handleComment = (el: resPostDataType) => {
        if (user) {
            if (el._id) {
                let newComment: initialCommentType = {
                    author: user._id,
                    body: comment,
                    post_id: el._id,
                }
                dispatch(addComments(newComment))
                dispatch(updatePost({comments_count:el.comments_count+1},el._id))
                setComment("")
                setAddComment(true)
                if(setCommentCount){
                    setCommentCount(el.comments_count+1)
                }
            }
        } else {
            Router.push("/login")
        }
    }
    const handleKeyDown:React.KeyboardEventHandler<HTMLInputElement> = (e)=>{
        if(e.key==="Enter"){
            handleComment(el)
        }
    }

  return (
    <>
    <div className='flex items-center justify-around w-full'>
    <BiCommentAdd className='text-2xl' />
    <input type='text' value={comment} placeholder='add a comment...' onKeyDown={(e)=>handleKeyDown(e)} onChange={(e) => handleCommentChange(e)} className='outline-none bg-transparent my-3 w-3/5 resize-none'/>
    <button onClick={() => handleComment(el)} disabled={comment.length < 4} className={`font-bold bg-black/60 px-3 rounded-md ${comment.length < 4 && "text-gray-500"}`}>post</button>
</div>
{addComment && <AlertModal text='Comment Added' type="success" />}
    </>
  )
}

export default NewComment