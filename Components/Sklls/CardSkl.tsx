import React from 'react'

const CardSkl = () => {
  return (
    <div className='border-[1px] border-blue-900 rounded-md' >
        <div className='h-20 flex items-center'>
            <div className='h-[50px] w-[50px] mx-2 rounded-full bg-grey_shade animate-pulse'></div>
            <div className='w-2/3 animate-pulse' >
            <div className='h-6 bg-grey_shade ' ></div>
            <div className='h-4 mt-1 bg-grey_shade w-1/2' ></div>
            </div>
        </div>
        <div className='h-[400px] bg-grey_shade w-full animate-pulse'></div>
        <div className='my-2 animate-pulse' >
        <div className='h-8 bg-grey_shade rounded-sm mt-2 w-11/12'></div>
        <div className='h-8 bg-grey_shade rounded-sm mt-2 w-11/12'></div>
        <div className='h-8 bg-grey_shade rounded-sm mt-2 w-11/12'></div>
        </div>
    </div>
  )
}

export default CardSkl