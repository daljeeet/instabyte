import { userdataType } from '../auth/auth.actions';
import {USER_DATA_LOADING,USER_DATA_ERROR,USER_DATA_SUCCESS,USER_DATA_UPDATE_SUCCESS,
    USER_DATA_UPDATE_ERROR,
    USER_DATA_UPDATE_LOADING} from './user_data.action_types'
    interface insitDataType{
        get_loading:boolean,
        get_error:boolean,
        patch_loading:boolean,
        patch_error:boolean
        userData:userdataType
    }

     const insitData:insitDataType = {
        get_loading:false,
        get_error:false,
        patch_loading:false,
        patch_error:false,
        userData:{
            name:"",
            email:"",
            id:"",
            profile:"",
            cover:"",
            username:""
        }
    }

    export const userDataReducer = (state=insitData,actions: { type:string; payload:userdataType})=>{
        const {type,payload} = actions
        switch (type) {
            case USER_DATA_LOADING:{
                return{...state, loading:true}
            }
            case USER_DATA_ERROR:{
                return{...state, error:true}
            }
            case USER_DATA_SUCCESS:{
                return{...state,loading:false, error:false, userData:payload}
            }
            case USER_DATA_UPDATE_SUCCESS:{
                return{...state,patch_loading:false, patch_error:false}
            }
            case USER_DATA_UPDATE_ERROR:{
                return{...state,patch_error:true,patch_loading:false }
            }
            case USER_DATA_UPDATE_LOADING:{
                return{...state, patch_loading:true, patch_error:false}
            }
            default:{
                return{...state}
            }
        }
    }