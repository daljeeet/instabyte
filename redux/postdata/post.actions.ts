import {GET_LOADING,
    GET_ERROR,
    GET_SUCCESS,
    PATCH_LOADING,
    PATCH_ERROR,
    PATCH_SUCCESS,
    POST_LOADING,
    POST_ERROR,
    POST_SUCCESS} from './actions.types'
import { postDataType } from "../../Components/CreateModal" 
import {getAllPostsApi, postDetailsApi} from './post.api'

 
export const getAllPosts = ()=>async(dispatch: (arg0: { type: string; payload?: void }) => void)=>{
dispatch({type:GET_LOADING})
try{
    let res = await getAllPostsApi()
    dispatch({type:GET_SUCCESS,payload:res})
}catch(err){
    dispatch({type:GET_ERROR})
}
}

export const postDetails = (data:postDataType)=>async(dispatch: (arg0: { type: string; payload?:any }) => void)=>{
    dispatch({type:POST_LOADING})
try{
    let res = await postDetailsApi(data)
    dispatch({type:POST_SUCCESS,payload:data})
}catch(err){
    dispatch({type:POST_ERROR})
}
}