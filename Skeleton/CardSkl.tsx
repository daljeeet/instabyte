import React from 'react'

const CardSkl = () => {
  return (
    <div className='mt-10 border-[1px] rounded-md relative border-blue-900 py-2'>
    {/* Post & Author Details : name,time, etc */}
    <div className='flex w-full justify-between items-center'>
        <div className='flex items-center h-12 w-5/6' >
            <div className='rounded-full mx-2 bg-[#1e293b] animate-pulse'>
                <p className='h-12 w-[50px] ' ></p>
            </div>
            <div className='mx-2 font-semibold w-3/4 overflow-hidden bg-gray-700	 h-8 rounded-md animate-pulse '> 
            <p></p>
                <p className='text-sm font-semibold text-gray-400 text-[12px] '> 
                 </p>
            </div>
        </div>
    </div>
    {/*  Post Images*/}

    <div className='h-fit my-2 relative' >
        {/* <CardSwiper data={el} /> */}  Images
     </div>
    {/* Post Buttons : Like comment save etc. */}
    <div className='p-2' >

        <div className='postactions flex w-full justify-between' >
        </div>
        <div className='border-b-2 border-gray-600 pb-3'>
            <div className='flex items-center' >
                <p className='text-sm'>
                    likes
                </p>
                <p className='text-sm'>
                    2 comments
                </p>
            </div>
            <p className=''>comments</p>
        </div>
        {/* Add a new comment on post from outside */}
        {/* <NewComment el={el} /> */}
    </div>
</div>
  )
}

export default CardSkl