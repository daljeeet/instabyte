import {USER_DATA_LOADING,USER_DATA_ERROR,USER_DATA_SUCCESS,USER_DATA_UPDATE_SUCCESS,
    USER_DATA_UPDATE_ERROR,
    USER_DATA_UPDATE_LOADING} from './user_data.action_types'
import { getUserDataApi } from './user_data_api'

export const getUserData = (id:string)=>async(dispatch: (arg0: { type: string; payload?: void }) => void)=>{
    try{    
        dispatch({type:USER_DATA_LOADING})
        let res = await getUserDataApi(id)
        dispatch({type:USER_DATA_SUCCESS,payload:res})
    }catch(err){
        dispatch({type:USER_DATA_ERROR})
    }
}