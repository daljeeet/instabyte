import { postUrl, resetPost } from '@/redux/ImageUrl/actions'
import { rootReducertype } from '@/redux/store'
import React,{Dispatch} from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { BsFillImageFill} from 'react-icons/bs'
import { BiImageAdd} from 'react-icons/bi'
import Image from 'next/image'
import { postDataType } from './CreateModal'
import { editPost } from '@/redux/postdata/post.actions'

type addType = {
  closeAddMorePhotos:()=>void
  data:postDataType
}
const AddMorePhotos = (props:addType) => {
  const {closeAddMorePhotos,data} = props;
    const {isloading,img,iserror,isdone} = useSelector((val:rootReducertype)=>val?.imgUrl)
    const dispatch:Dispatch<any> = useDispatch()
    
    const handleClose = ()=>{
      closeAddMorePhotos()
    }
    const handleImage = (e:any)=>{
        let form = new FormData()
        form.append("image",e.target.files[0])
        dispatch(postUrl(form))
    }
    const PostAddImage = ()=>{
      data.imgUrl.push(img)
      data.edit_post=false
      dispatch(editPost(data))
      dispatch(resetPost())
      handleClose()
    }

  return (
    <div className={`fixed top-0 left-0 bg-black/60 right-0 w-full min-h-screen flex items-center justify-center z-10`} >
    {iserror?<div> Image Upload Failed ☹️ <span onClick={handleClose} className='underline font-bold text-sm'>close</span> </div>:<div className='m-auto w-5/6 md:w-96 bg-gray-900 text-center text-white rounded-lg max-h-[80vh] overflow-auto'>
                <div className='w-full relative my-4'>
               {isloading?<h3 className='text-2xl'>Please Wait...</h3> :<h3 className='text-xl'>Add Photo </h3> }
                <AiOutlineClose onClick={handleClose} className='absolute right-0 top-0 text-xl mt-2 mr-2 font-bold cursor-pointer'/>
                </div>
                <div className='m-auto w-1/2 flex items-center justify-center'>
                  {img?<Image src={img} height={800} width={500} alt='asdf' />:<BsFillImageFill className='text-8xl' />}
                </div>
                <div className='p-2 my-4 w-fit m-auto flex w-1/2 justify-around'>
                 <label htmlFor='imageUpload' className='border-indigo-500 border-2 rounded-md px-2 py-1'><BiImageAdd className='text-4xl cursor-pointer ' />
                    <input onChange={handleImage} type="file" className='hidden' id="imageUpload" accept="image"/>
                </label>
                <button onClick={PostAddImage} className='border-indigo-500 border-2 rounded-md px-2 font-bold'>
                  Done
                </button>
                </div>
            </div>}
    </div>
  )
}

export default AddMorePhotos