import {GET_LOADING,
    GET_ERROR,
    GET_SUCCESS,
    PATCH_LOADING,
    PATCH_ERROR,
    PATCH_SUCCESS,
    POST_LOADING,
    POST_ERROR,
    DEL_LOADING,
    DEL_SUCCESS,
    DEL_ERROR,RESET_POSTS,
    POST_SUCCESS,
    INC_PAGE} from './actions.types'
import { postDataType } from "../../Components/CreateModal" 
import {deletePostApi, editPostApi, getAllPostsApi, postDetailsApi} from './post.api'

 
export const getAllPosts = (page:number)=>async(dispatch: (arg0: { type: string; payload?: void }) => void)=>{
    dispatch({type:GET_LOADING})
    try{
        let res = await getAllPostsApi(page)
    dispatch({type:GET_SUCCESS,payload:res})
}catch(err){
    dispatch({type:GET_ERROR})
}
}

export const postDetails = (data:postDataType)=>async(dispatch: (arg0: { type: string; payload?:any }) => void)=>{
    dispatch({type:POST_LOADING})
try{
   let res = await postDetailsApi(data)
    dispatch({type:POST_SUCCESS,payload:res})
}catch(err){
  dispatch({type:POST_ERROR})
}
}
export const deletePostt = (id:number|string)=>async(dispatch:(arg0: { type: string; payload?:any }) => void)=>{
    dispatch({type:DEL_LOADING})
    try{
        await deletePostApi(id);
            dispatch({type:DEL_SUCCESS,payload:id})
    }catch(err){
        dispatch({type:DEL_ERROR})
    }
}
export const editPost = (post:any,id:string)=>async(dispatch: (arg0: { type: string; payload?:any; }) => void)=>{
    dispatch({type:PATCH_LOADING})
    try{
        await editPostApi(post,id)
        dispatch({type:PATCH_SUCCESS})   
    }catch(err){
        dispatch({type:PATCH_ERROR})
    }
}

export const resetAllPosts =()=>(dispatch: (arg0: { type: string; }) => void)=>{
    dispatch({type:RESET_POSTS})
}

export const nextPage = ()=>(dispatch:(arg0:{type:string})=>void)=>{
    dispatch({type:INC_PAGE})
}