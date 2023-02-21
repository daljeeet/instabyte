import axios from "axios";
export const postUrlApi = async (data:any)=>{
    try{
        let imgApi = process.env.NEXT_PUBLIC_IMG_URL
        if(imgApi){
            let res = await axios.post(imgApi,data)
            return res.data.data.url
        }
    }catch(err){
        console.log("error from api",err)
    }
} 
// https://instabyte.glitch.me/users