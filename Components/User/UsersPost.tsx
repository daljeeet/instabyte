import { postDataType} from '@/helpers/dataTypes'
import { rootReducertype } from '@/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'
import PostCard from './UserPostCard'

const UsersPost = () => {
  const { userPosts} = useSelector((val: rootReducertype) => val.userPost)
  return (
    <div className='my-4 w-5/6 m-auto'>
        <div className='md:grid grid-cols-3 gap-4 grid-rows-auto' >
        {
            userPosts?.map((el:postDataType)=><PostCard key={el._id} data={el} />)
        }
        </div>
    </div>
  )
}

export default UsersPost