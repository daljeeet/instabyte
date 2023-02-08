import Image from 'next/image'
import React, { useState } from 'react'
import { postDataType } from './CreateModal'
import { AiFillEdit, AiOutlineClose} from 'react-icons/ai'
import { MdAddCircle } from 'react-icons/md'
import { useDispatch} from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { editPost } from '@/redux/postdata/post.actions'
import AlertModal from './AlertModal'
import CardSwiper from './CardSwiper'
import AddMorePhotos from './AddMorePhotos'

type postDataAll = {
    data: postDataType,
    closeModal: () => void
}

const ModalEdit = (props: postDataAll) => {
    const [caption, setCaption] = useState(false)
    const dispatch:Dispatch<any> = useDispatch()
    const { data, closeModal } = props;
    const [changeCaption, setChangeCaption] = useState(data?.caption)
    const [alert,setAlert] = useState(false)
    const [addphoto, setAddPhoto] = useState(false)
    const handleChange = (e:any)=>{
        setChangeCaption(e.target.value)
    }
    const handleCaptionChange = (post:postDataType)=>{
       post.caption=changeCaption;
       post.edit_post=false
        dispatch(editPost(post))
        setAlert(true)
        setCaption(!caption)
    }
    const handleAddMore= ()=>{
        setAddPhoto(true)
    }
    const closeAddPhotos= ()=>{
        setAddPhoto(false)
    }

    return (
        <div className='fixed h-screen flex justify-center items-center right-0 top-0 left-0 bg-black/60 z-10' >
            <div onClick={() => closeModal()} className='fixed md:top-2 top-0 right-0 z-10 md:right-2 m-4 cursor-pointer'><AiOutlineClose className='text-3xl' /></div>
            <div className='bg-darkbg flex md:flex-row flex-col h-[90%] md:w-[80%] relative overflow-y-auto'>

                {/* ===================post Image ===================== */}

                <div className='md:w-1/2 w-full justify-center items-center flex'>
                    <div className="h-full overflow-y-auto m-auto justify-center items-center flex scrollbar-hide" >
                        {/* <Image src={el} width={400} height={1600} className='rounded-2xl' alt='Post Image' /> */}
                        <CardSwiper data={data?.imgUrl} />
                    </div>
                   </div>
                {/* ===================post Details And comments ===================== */}
                <div className='md:w-1/2 w-full flex flex-col justify-center items-center'>

                    {/* ===================profile image and name ===================== */}
                    <div className='w-11/12 h-14 flex items-center'> <Image src={data.owner_profile} className="rounded-full ml-4 " width={50} height={50} alt={data.owner} />
                       <div className='mx-4' > <div className='font-semibold'> {data.owner} (You) </div>
                        <div className='text-gray-400 font-bold text-sm' >{data.posted_on}</div></div>
                    </div>

                    {/* ===================profile image and name ===================== */}
                    <div className='w-11/12  overflow-y-auto py-2 scrollbar-hide border-t-2 mt-2 border-gray-600 flex flex-col items-center'>
                        <div onClick={handleAddMore} className='flex items-center w-1/2 text-lime-400 hover:underline cursor-pointer font-bold'>
                            <MdAddCircle className='mx-3' /> Add More Photos
                        </div>
                        <div onClick={() => setCaption(!caption)} className='flex items-center text-yellow-300 w-1/2 hover:underline cursor-pointer font-bold my-4'>
                            <AiFillEdit className='mx-3' /> Edit Caption
                        </div>
                        {caption && <div className='w-11/12 flex flex-col justify-between items-center ml-4 mt-10'>
                            <textarea placeholder='Edit Caption...' onChange={handleChange} value={changeCaption} className='border-2 border-gray-600 bg-transparent rounded-md w-2/3 pl-4 outline-none min-h-24 max-h-32' />
                            <button onClick={()=>handleCaptionChange(data)} className={`px-2 my-2 rounded-md font-semibold border-2 border-gray-600`} >Change</button>
                        </div>}
                    </div>
                </div>
            </div>
            {alert&&<AlertModal text="Caption Changed Successfully" color="bg-green-500"  />}
            {addphoto&&<AddMorePhotos data={data} closeAddMorePhotos={closeAddPhotos} />}
        </div>
    )
}

export default ModalEdit