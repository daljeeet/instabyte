import axios from "axios"

export const getOneUserPostApi = async(id:string|number)=>{
    try{
        let res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_POST}/${id}`)
        console.log(res)
        return res.data.data
    }catch(err){
        throw err
    }
}