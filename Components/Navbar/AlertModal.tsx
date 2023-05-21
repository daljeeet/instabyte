import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'

type alertType ={
    text:string,
    type:string,
}
const AlertModal = (props:alertType) => {
    const {text,type} = props
    const [alertColor, setAlertColor] = useState("")
    const [modal, setModal] = useState(false)
    useEffect(()=>{
        setModal(true)
    },[])
    setTimeout(()=>{
        setModal(false)
    },3000)
    useEffect(()=>{
      switch (type) {
        case "info":
          setAlertColor("blue")
          break;
        case "success":
          setAlertColor("green")
          break;
        case "error":
          setAlertColor("red")
          break;
        default:
          break;
      }
    },[type])
  return (
    <>
    {
      modal&&<div className={`bg-black fixed top-0 right-0 left-0 w-screen left-0 z-10 w-52 rounded-md px-4 font-bold animate-in slide-in-from-bottom-10 ease-in-out duration-500`}>
        <div className={`my-2 text-center text-${alertColor}-500 flex items-center justify-center`} >
          <h4>{text}</h4> <AiOutlineCloseCircle className='text-xl ml-4 cursor-pointer' onClick={()=>setModal(false)} />
        </div>
      </div>
    }
    </>
  )
}

export default AlertModal