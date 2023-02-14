import React from 'react'

type textType= {
    text:string
}

const Loader = (props:textType) => {
  return (
    <div className='h-full w-full overflow-hidden flex flex-col items-center justify-center'>{props.text}<div className='rounded-full overflow-hidden w-11/12 h-2 bg-gray-500 relative before:absolute before:h-2 before:w-2 before:rounded-full before:animate-loader before:bg-gradient-to-r from-cyan-500 to-blue-500'></div></div>
  )
}

export default Loader