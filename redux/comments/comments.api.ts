
import { initialCommentType } from "@/Components/Post/Comments/NewComment"
import axios from "axios"

export const addCommentApi = async(comment:initialCommentType)=>{
    try{    
        let res = await axios.post(`${process.env.NEXT_PUBLIC_PROTECTED_URL}/comments`,comment)
        return res
    }catch(err){
        throw err
    } 
}
export const getCommentsApi = async(id:string)=>{
    try{
        let res = await axios.get(`${process.env.NEXT_PUBLIC_PROTECTED_URL}/comments/${id}`)
        return res.data.data
    }catch(err){
        throw err
    }
}

export const updatecommentApi = async(data:any,id:string|number)=>{
    try{
        let res = await axios.patch(`${process.env.NEXT_PUBLIC_PROTECTED_URL}/comments/${id}`,data)
        return res
    }catch(err){
        throw err
    }
}

export const deleteCommentApi = async(id:number|string)=>{
    try{
        let res = await axios.delete(`${process.env.NEXT_PUBLIC_PROTECTED_URL}/comments/${id}`)
        return res
    }catch(err){
        throw err
    }
}
