import React, { useEffect, useState } from 'react'

type alertType ={
    text:string,
    color:string,
}
const AlertModal = (props:alertType) => {
    const {text,color} = props
    const [modal, setModal] = useState(false)
    useEffect(()=>{
        setModal(true)
    },[])
    setTimeout(()=>{
        setModal(false)
    },3000)
  return (
    <>
    {
      modal&&<div className={`${color} fixed top-20 md:left-[50%] left-0 z-10 w-52 rounded-md px-4 font-bold`}>
        {text}
      </div>
    }
    </>
  )
}

export default AlertModal