import axios from "axios"




export const getOneUserPostApi = async(name:string)=>{
    try{
        let res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/userdata`,{
            headers:{Authorization:name}
        })
        console.log(res)
    }catch(err){

    }
}