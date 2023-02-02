import { postDataType } from "../../Components/CreateModal" 
import axios from "axios";

const posts:any = process.env.NEXT_PUBLIC_POSTS;
export const postDetailsApi = async(data:postDataType)=>{
    try{
        const res = await axios.post(posts,data)
        return res.data
    }catch(err){
        console.log(err)
    }
}

export const getAllPostsApi = async()=>{
    try{
        const res = await axios.get(posts)
        return res.data
    }catch(err){
        console.log(err)
    }
}