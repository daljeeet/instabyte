import { postDataType } from "@/pages/Components/CreateModal" 
import axios from "axios";

const posts:any = process.env.NEXT_PUBLIC_POSTS;
export const postDetailsApi = async(data:postDataType)=>{
    const res = await axios.post(posts,data)
    return res.data
}
export const getAllPostsApi = async()=>{
    try{
        const res = await axios.get(posts)
        return res.data
    }catch(err){
        console.log(err)
    }
}