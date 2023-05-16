import { getComments } from '@/redux/comments/comments.action'
import Image from 'next/image'
import React, { useState,useEffect,useRef,Dispatch } from 'react'
import { useDispatch } from 'react-redux'
import PostDetails from './PostDetails'
import { resPostDataType } from '@/helpers/dataTypes'
type postdataObj={
    data:resPostDataType
    isLast:boolean;
    newLimit:()=>void
}
const ExploreImg = (props:postdataObj) => {
    const [modal, setModal]= useState(false)
    const {data,isLast,newLimit} = props;
    const [dta,setDta]= useState(data)
    const cardRef: any = useRef()
    const dispatch:Dispatch<any> = useDispatch()
    useEffect(() => {
        if (!cardRef?.current) return
        const observe = new IntersectionObserver(([entry]) => {
            if (isLast&& entry.isIntersecting) {
                newLimit();
                observe.unobserve(entry.target)
            } else {
            }
        })
        observe.observe(cardRef.current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLast])


    const handleImagePost = (data:resPostDataType)=>{
        setModal(true)
        if(data._id){
            setDta(data)
            dispatch(getComments(data._id))
        }
    }
    const closePostDtlModal = ()=>{
        setModal(false)
    }
    const keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63)

const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`
  let color1 = Math.random()*235;
  let color2 = Math.random()*255;
  let color3 = Math.random()*255;
  return (
    <>
       {data?.imgUrl.map((el,id)=><Image ref={cardRef} key={id} src={el} width={400} height={400} placeholder="blur" alt="image" onClick={()=>handleImagePost(data)} onLoad={(e:any)=>{e.target.naturalHeight>500?e.target.className="rounded-lg row-span-2 cursor-zoom-in ":e.target.className="rounded-lg self-center cursor-zoom-in"}} blurDataURL={rgbDataURL(color1,color2,color3)} />
       )}
    {modal&&<PostDetails data={dta} closeModal={closePostDtlModal}  />}
    </>
  )
}

export default ExploreImg