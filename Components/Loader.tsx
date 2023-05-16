import React from 'react'

type textType= {
    text:string
}

 export const Loader = (props:textType) => {
  return (
    <div className='h-full w-full overflow-hidden flex flex-col items-center justify-center'>{props.text}<div className='rounded-full overflow-hidden w-11/12 h-2 bg-gray-500 relative before:absolute before:h-2 before:w-2 before:rounded-full before:animate-loader before:bg-gradient-to-r from-cyan-500 to-blue-500'></div></div>
  )
}

export const Spinner = ()=>{
  return <svg className="animate-spin_loader border" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
   <circle className="stroke-1 animate-spin_dash text-blue-500" strokeDasharray={187} fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
</svg>
}

// stroke-dasharray: $offset;
//   stroke-dashoffset: 0;
//   transform-origin: center;