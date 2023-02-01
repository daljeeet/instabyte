import React,{Dispatch,useEffect} from 'react'
import {FcGoogle} from 'react-icons/fc'
import {FaGithub} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { loginwithGithub, loginwithGoogle } from '../redux/auth/auth.actions'
import { useRouter } from 'next/router'
const Login = () => {
  const route = useRouter()
  const user = useSelector((val:any)=>val?.user?.user)
    const dispatch:Dispatch<any> = useDispatch()
    const handleGoogleLogin = ()=>{
        dispatch(loginwithGoogle())
    }
    useEffect(() => {
        if(user){
          route.push("/")
        }
    }, [route, user])
    
    const handleGithubLogin = ()=>{
    dispatch(loginwithGithub())
    }
  return (
    <>
    <FcGoogle onClick={handleGoogleLogin} className='text-4xl mx-2 cursor-pointer' />
            <FaGithub onClick={handleGithubLogin} className='text-4xl mx-2 cursor-pointer' />
    </>
  )
}
export default Login