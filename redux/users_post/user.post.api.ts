import axios from "axios"

export const getOneUserPostApi = async(id:string|number)=>{
    try{
        let res = await axios.get(`${process.env.NEXT_PUBLIC_PROTECTED_URL}/post/${id}`)
        return res.data.data
    }catch(err){
        throw err
    }
}

export const getUserDataApi = async(id:string|number)=>{
    try{
        let res = await axios.get(`${process.env.NEXT_PUBLIC_PROTECTED_URL}/userdata/${id}`)
        return res
    }catch(err){
        throw err
    }
} 

export const updateUserdataApi = async (data: any, id: number | string) => {
    try {
        let res = await axios.patch(`${process.env.NEXT_PUBLIC_PROTECTED_URL}/userdata/${id}`,data)
        return res
    } catch (err) {
        throw err
    }
}