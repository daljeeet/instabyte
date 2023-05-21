import { postDataType} from "@/helpers/dataTypes";
import axios from "axios";
export const postDetailsApi = async(data:postDataType)=>{
    try{
        const res = await axios.post(`${process.env.NEXT_PUBLIC_PROTECTED_URL}/post`,data)
        return res.data.data
    }catch(err){
        throw err
    }
}

// not-protected route
export const getAllPostsApi = async(page:number)=>{
    try{
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_POST}?page=${page}`)
        return res.data.data
    }catch(err){
        throw err
    }
}

export const deletePostApi = async(id:number|string)=>{
    try{
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_PROTECTED_URL}/post/${id}`)
        return res;
    }catch(err){
        throw err
    }
}
export const updatePostApi = async(data:any,id:string|number)=>{
    try{
     const res = await axios.patch(`${process.env.NEXT_PUBLIC_PROTECTED_URL}/post/${id}`,data)
        return res.data
    }catch(err){
        throw err
    }
}