import { getComments } from '@/redux/comments/comments.action'
import React, { useState, Dispatch } from 'react'
import { AiFillHeart, AiFillMessage } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { postDataType } from '@/helpers/dataTypes'
import CardSwiper from '../CardSwiper'
import PostDetails from '../PostDetails'
import { rootReducertype } from '@/redux/store'
type postdata = {
    data: postDataType
}
const PostCard = ({ data }: postdata) => {
    const [newData, setNewData] = useState<any>()
    const dispatch: Dispatch<any> = useDispatch()
    const [modal, setModal] = useState(false)
  const { userData } = useSelector((val: rootReducertype) => val.userPost)

    const closePostData = () => {
        setModal(false)
    }
    const showPosts = (data: postDataType) => {
        let updatedData = {...data, author_data:[{id:userData._id,image:userData.image,username:userData.username}]}
        setNewData(updatedData)
        setModal(true);
        if (data._id) {
            dispatch(getComments(data._id))
        }
    }
    return (
        <>
            <div onClick={() => showPosts(data)} className='shadow-xl rounded-xl overflow-hidden relative group bg-black/50 md:my-auto my-4 '>
                <CardSwiper data={data} />
                <div className='hidden justify-center items-center absolute z-20 top-0 w-full h-full bottom-0 bg-black/30 group-hover:flex hover:cursor-pointer'>
                    <p className='flex justify-center items-center mx-4 text-4xl text-gray-200'>{data.likes && data?.likes.length} <AiFillHeart className='mx-2' /> </p>
                    <p className='flex justify-center items-center text-4xl text-gray-200'>{data.comments_count}<AiFillMessage className='mx-2' /> </p>
                </div>
            </div>
            { modal&&<PostDetails data={newData} closeModal={closePostData} />}
        </>
    )
}

export default PostCard