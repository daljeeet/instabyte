import { rootReducertype } from '@/redux/store';
import React from 'react'
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
    
    const colors = ["bg-black", "bg-violet-900", "bg-blue-800", "bg-sky-900", "bg-emerald-800", "bg-yellow-900", "bg-teal-700", "bg-cyan-700", "bg-blue-500", "bg-pink-900"]
    const random = Math.floor(Math.random() * colors.length)
    const {el} = props
  return (
    <div>
            {el.author =='' ? "" : <div className='  flex m-3 items-center justify-between'>
                <div className={`h-8 w-8 rounded-full mr-2 flex justify-center items-center text-xl ${colors[random]}`}>{el.author.split('').slice(0, 1).join("").toUpperCase()}</div>
                <p className='mr-2 font-semibold text-sm w-1/3' >{el.author}</p>

                <div className=' w-1/2'>
                    <p className='text-sm' >{el.comment}</p>
                    {
                        Date.now() - Date.parse(new Date().toDateString()) <= 86400000 ? <p className='text-sm text-gray-500' >Today</p> : Date.now() - Date.parse(new Date().toDateString()) <= 17280000? <p className='text-sm text-gray-500' >yesterday</p>:<p className='text-sm text-gray-500' >{el.time}</p>
                    }
                </div>
            </div>}
            </div>
  )
}

export default React.memo(Comment,()=>true)