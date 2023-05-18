import { rootReducertype } from '@/redux/store'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Jwt from 'jsonwebtoken';
const GetUser = () => {
  const userToken = useSelector((val:rootReducertype)=>val?.user?.loggedInUser)
  const [user, setUser] = useState<any>(null)
  let key = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
  useEffect(()=>{
    if(typeof window ){
      let token:null|string = localStorage.getItem('token')||userToken
      if(token)
      getToken(token)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[userToken])

  const getToken = async(token:string)=>{
    if(key){
      let data = await Jwt.decode(token)
      setUser(data)
    }else{
    }
  }
    return user
}

export default GetUser