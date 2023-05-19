import { useEffect, useState } from 'react'
import Jwt from 'jsonwebtoken';
import { getCookie } from 'cookies-next';
const GetUser = () => {
  const [user, setUser] = useState<any>(null);
  let key = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
  let token = getCookie("token")
  useEffect(()=>{
    if(typeof token==="string")
    getUserFromToken(token)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[token])
  const getUserFromToken = async(token:string)=>{
    if(key){
      let data = await Jwt.decode(token)
      setUser(data)
    }else{
    }
  }
    return user
}
export default GetUser
