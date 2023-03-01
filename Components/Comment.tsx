import { rootReducertype } from '@/redux/store';
import React from 'react'
import { HiDotsVertical } from 'react-icons/hi';
import { useSelector } from 'react-redux';
export type commentType={
    author:string,
    comment:string,
    time:string, 
    parentId:string
}
type commentTypes = {
    el:commentType;
}
const Comment = (props:commentTypes) => {
    const user = useSelector((val: rootReducertype) => val?.user?.user)
    const colors = ["bg-black", "bg-violet-900", "bg-blue-800", "bg-sky-900", "bg-emerald-800", "bg-yellow-900", "bg-teal-700", "bg-cyan-700", "bg-blue-500", "bg-pink-900"]
    const random = Math.floor(Math.random() * colors.length)
    const {el} = props;
    const handleEditComment =(elem:commentType)=>{
    
    }



  return (
    <div>
            {el.author =='' ? "" : <div className='  flex m-3 items-center justify-between'>
                <div className={`h-8 w-8 rounded-full mr-2 flex justify-center items-center text-xl ${colors[random]}`}>{el.author.split('').slice(0, 1).join("").toUpperCase()}</div>
                <p className='mr-2 font-semibold text-sm w-1/3' >{el.author}</p>

                <div className='w-1/2 text-gray-400 text-[10px]'>
                    <p className='text-sm text-white'>{el.comment}</p>
                    {
                       new Date(new Date().toDateString()).getTime()-new Date(`${el.time}`).getTime()<= 86400000 ? <p>Today</p>:
                       new Date(new Date().toDateString()).getTime()-new Date(`${el.time}`).getTime() <=172800000 ? <p >yesterday</p>
                       :
                       <p>{el.time}</p>
                    }
                </div>
               {user.name===el.author?<HiDotsVertical className='text-sm' onClick={()=>handleEditComment(el)} />:''}
            </div>}
            </div>
  )
}

export default React.memo(Comment,()=>true)