import axios from "axios";



export const getUserDataApi = async(id:string)=>{
    try{
        let res = await axios.get(`${process.env.NEXT_PUBLIC_PROTECTED_URL}/userdata/${id}`)
        return res.data.data[0]
    }catch(err){
        console.log(err)
    }
}