import React from 'react'
import Image from 'next/image'

 export const Loader = () => {
  return (
    <div className='h-full w-full overflow-hidden flex flex-col items-center justify-center'>
      <div className='relative px-4'>
    <Image src='/insta_loading.gif' width={300} height={50} alt='loading'/>
    <p className='absolute z-20 bottom-[10%] left-[10%] animate-pulse' >Loading...</p>
      </div>
    </div>
  )
}