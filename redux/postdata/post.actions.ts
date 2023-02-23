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
    DEL_ERROR,
    POST_SUCCESS} from './actions.types'
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
  await postDetailsApi(data)
    dispatch({type:POST_SUCCESS,payload:data})
}catch(err){
    dispatch({type:POST_ERROR})
}
}

export const deletePostt = (id:number|string,postData:postDataType[])=>async(dispatch:(arg0: { type: string; payload?:any }) => void)=>{
    dispatch({type:DEL_LOADING})
    try{
        let res = await deletePostApi(id);
        if(res?.status==200){
            dispatch({type:DEL_SUCCESS,payload:postData})
        }else{
            dispatch({type:DEL_ERROR})
        }
    }catch(err){
        dispatch({type:DEL_ERROR})
    }
}
export const editPost = (post:any,id:string)=>async(dispatch: (arg0: { type: string; payload?:any; }) => void)=>{
    dispatch({type:PATCH_LOADING})
    try{
        
        let res = await editPostApi(post,id)
   
        dispatch({type:PATCH_SUCCESS})
      

   
    }catch(err){
        dispatch({type:PATCH_ERROR})
    }
}