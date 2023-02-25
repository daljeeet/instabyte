import {USER_DATA_LOADING,USER_DATA_ERROR,USER_DATA_SUCCESS,USER_DATA_UPDATE_SUCCESS,
    USER_DATA_UPDATE_ERROR,
    USER_DATA_UPDATE_LOADING} from './user_data.action_types'
import { getUserDataApi, upageUserDataApi } from './user_data_api'

export const getUserData = (id:string)=>async(dispatch: (arg0: { type: string; payload?: void }) => void)=>{
    try{    
        dispatch({type:USER_DATA_LOADING})
        let res = await getUserDataApi(id)
        if(res){
            dispatch({type:USER_DATA_SUCCESS,payload:res})
        }else{
            dispatch({type:USER_DATA_ERROR})
        }
    }catch(err){
        dispatch({type:USER_DATA_ERROR})
    }
}

export const updateUserData = (data:any,id:string)=>async(dispatch: (arg0: { type: string; payload?: any; }) => void)=>{
    try{
        dispatch({type:USER_DATA_UPDATE_LOADING})
        let res = await upageUserDataApi(data,id)
        dispatch({type:USER_DATA_UPDATE_SUCCESS})
    }catch(err){
        dispatch({type:USER_DATA_UPDATE_ERROR})
    }
}