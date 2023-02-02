import { LOADING,ERROR, SUCCESS, RESET } from "./action.type"
import { postUrlApi } from "./postImgApi";

type reducerAction ={
    type:string,
    payload?:string
}
export const postUrl = (data:{})=>async(dispatch: ({ type, payload}:reducerAction) => void)=>{
    dispatch({type:LOADING})
    try{
        let res = await postUrlApi(data);
        if(res){
            dispatch({type:SUCCESS,payload:res})
        }else{
        dispatch({type:ERROR})    
    }
}catch(err){
        dispatch({type:ERROR})    
        
    }
}
export const resetPost = ()=>(dispatch: (arg0: { type: string; }) => void)=>{
    dispatch({type:RESET})
}