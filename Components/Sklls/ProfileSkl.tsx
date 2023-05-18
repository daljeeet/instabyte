import React from 'react'
import CardSkl from './CardSkl'

const ProfileSkl = () => {
  return (
    <>
    <div className='mt-4 md:mt-auto lg:w-3/4 m-auto p-4 md:flex justify-between relative  animate-pulse bg-black/30'>
      {/* profile section for desktop */}
      <div className='hidden z-50 w-full m-auto p-4 md:flex justify-between' >
        <div className="flex justify-center items-center rounded-full overflow-hidden h-[170px] w-[170px] bg-grey_shade animate-pulse">
        </div>
        {/* user's info  */}
        <div className='mt-6 md:m-2 md:w-2/3 bg-grey_shade rounded-md h-24'>
        </div>
      </div>
      {/* profile section for small screens */}
      <div className='xs:flex md:hidden z-50 ' >
        <div className='relative ' >
          <div className='flex justify-between'>
            <div className="flex justify-center items-center rounded-full overflow-hidden h-[125px] w-[125px] bg-grey_shade animate-grey_shade">
            </div>
            <div className='ml-4 h-20 bg-grey_shade w-[180px] flex flex-col items-start m-auto font-bold text-xl'>
              <div className='flex flex-col my-2'>
              </div>
            </div>
          </div>
          <div className='absolute top-[80%] left-0'>
            <div className=' sm:w-full flex justify-start' >
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ProfileSkl