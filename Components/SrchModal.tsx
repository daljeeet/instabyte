import React from 'react'

type srchProptypes ={
    srchModal:boolean
}

const SrchModal = (props:srchProptypes) => {
  return (
    <div className={`absolute md:left-48 h-full w-screen ${props.srchModal?"block":"hidden"} `} >
                    <div className='w-52 animate-width overflow-hidden bg-black/50 flex flex-col h-full' >
                        <div className='flex flex-col mt-10 items-center' >
                    <h3 className='font-bold'>Search</h3>
                    <input type="text" className='rounded-md m-6 pl-2 outline-none text-black'placeholder='Search' />
                        {/* <div className='w-[90%] px-4 bg-white text-black h-52'>
                            Search results...
                        </div> */}
                        </div>
                    </div>
                </div>
  )
}

export default SrchModal