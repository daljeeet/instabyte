import axios from "axios";
let url:any = process.env.NEXT_PUBLIC_IMG_URL;
export const postUrlApi = async (data:any)=>{
    try{
        let res = await axios.post(url,data)
        return res.data.data.url
    }catch(err){
        console.log("error from api",err)
    }
}