import { Dispatch } from 'redux';
import{
    LOGIN_USER_LOADING,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    REGISTER_USER_LOADING,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS,
    LOGOUT_USER_LOADING,
    LOGOUT_USER_ERROR,
    LOGOUT_USER_SUCCESS,
  }from './auth.actions.types';
import { loginUserApi, logoutUserApi, registerUserApi, signInWithSocialMediaApi } from './auth.api';
  export interface initialUserData{
    name:string,
    email:string,
    password:string,
    username:string
  }
export const registerUser = (data:initialUserData)=>async(dispatch:Dispatch)=>{
dispatch({type:REGISTER_USER_LOADING})
try{
    let res = await registerUserApi(data)
    console.log(res)
    dispatch({type:REGISTER_USER_SUCCESS})
}catch(err){
    dispatch({type:REGISTER_USER_ERROR,payload:err})
}
}


export interface userSocialData{
    name: string | null | undefined;
    email: string | null | undefined;
    image: string | null | undefined;
}

export const signInWithSocialMedia = (data:userSocialData)=>async(dispatch:Dispatch)=>{
    dispatch({type:LOGIN_USER_LOADING})
    try{
        let res = await signInWithSocialMediaApi(data)
        dispatch({type:LOGIN_USER_SUCCESS,payload:res.data})
    }catch(err){
        dispatch({type:LOGIN_USER_ERROR})
    }
}

export interface initialLoginData{
    email:string,
    password:string
}

export const loginUser = (data:initialLoginData)=>async(dispatch:Dispatch)=>{
    dispatch({type:LOGIN_USER_LOADING})
    try{
        let res = await loginUserApi(data)
        console.log(res);
        dispatch({type:LOGIN_USER_SUCCESS})
    }catch(err){
        dispatch({type:LOGIN_USER_ERROR})
    }
}

export const logoutUser = ()=>async(dispatch:Dispatch)=>{
    dispatch({type:LOGOUT_USER_LOADING})
    try{
        await logoutUserApi()
        dispatch({type:LOGOUT_USER_SUCCESS})
    }catch(err){
        dispatch({type:LOGOUT_USER_ERROR})
    }
}



// export const loginwithGoogle =()=> async(dispatch: (arg0: { type: string; payload?:any }) => void)=>{
//     dispatch({type:AUTH_LOADING})
//     try{
//        let user = await signInWithPopup(auth,google)
//        const userData:userdataType = {
//         name:user?.user?.displayName,
//         email:user?.user?.email,
//         username:user?.user?.displayName?.split(' ')[0],
//         id:user?.user?.uid,
//         profile:user?.user.photoURL,
//         cover:"/cover.jpg",
//         bookmarks:[]
//     }  
//     let res = await addUserApi(userData)
//     dispatch({type:AUTH_SUCCESS,payload:res})
//     }catch(err){
//         dispatch({type:AUTH_ERROR})
//     }
// }

// export const  loginwithGithub = ()=> async(dispatch: (arg0: { type: string; payload?:any }) => void)=>{
//     dispatch({type:AUTH_LOADING})
//     try{
//         let res = await signInWithPopup(auth,github)
//         dispatch({type:AUTH_SUCCESS,payload:res})
//     }catch(er){
//         dispatch({type:AUTH_ERROR})
//     }
// }

export const signoutUser =()=> async(dispatch: (arg0: { type: string; payload?:any }) => void)=>{
    try{
        // await signOut(auth)
        // await userLogoutApi()
    }catch(err){
        console.log(err)
    }
}

// export const isUserLogin = ()=> async(dispatch: (arg0: { type: string; payload?:any }) => void)=>{
//     dispatch({type:GET_USER_LOADING})
//     try{
//         auth.onAuthStateChanged(async(user)=>{
//             if(user){
//             let userDta = await getUserDataApi(user.uid)
//             dispatch({type:GET_USER_SUCCESS,payload:userDta})
//             }else{
//             dispatch({type:GET_USER_ERROR})
//             }
//            })
//     }catch(err){
//         dispatch({type:GET_USER_ERROR})
//     }
// }

export const updateUserdata =  (data:any,id:string)=>async(dispatch: (arg0: { type: string; payload?:any }) => void)=>{
    try{
     dispatch({type:"UPDATE_USER_LOADING"})
    let res =  "wait"
     dispatch({type:"UPDATE_USER_SUCCESS",payload:'helo'})
    }catch(err){
    dispatch({type:"UPDATE_USER_ERROR"})
    }
}