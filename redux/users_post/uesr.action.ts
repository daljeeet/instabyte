import {USER_POST_GET_LOADING,USER_POST_GET_SUCCESS,USER_POST_GET_ERROR}from './user.action.type'
import {getOneUserPostApi} from './user.post.api'
export const getOneUserPost = (id:string)=>async(dispatch: (arg0: { type: string; payload?: any; }) => void)=>{
    try{
        dispatch({type:USER_POST_GET_LOADING})
        let res = await getOneUserPostApi(id);
        dispatch({type:USER_POST_GET_SUCCESS,payload:res})
    }catch(err){
        dispatch({type:USER_POST_GET_ERROR})
    }
}