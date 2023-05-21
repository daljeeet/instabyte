import { Dispatch } from "redux";
import { LOADING,ERROR, SUCCESS, RESET } from "./action.type"
import { postUrlApi } from "./postImgApi";

export const postUrl = (data:any)=>async(dispatch:Dispatch)=>{
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