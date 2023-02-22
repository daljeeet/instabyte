import { userdataType } from '../auth/auth.actions';
import {USER_DATA_LOADING,USER_DATA_ERROR,USER_DATA_SUCCESS,USER_DATA_UPDATE_SUCCESS,
    USER_DATA_UPDATE_ERROR,
    USER_DATA_UPDATE_LOADING} from './user_data.action_types'

    interface insitDataType{
        loading:boolean,
        error:boolean,
        userData:userdataType
    }

     const insitData:insitDataType = {
        loading:false,
        error:false,
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
                return{...state,loading:false, error:false,userdata:payload}
            }
            case USER_DATA_UPDATE_ERROR:{
                return{...state,error:true,loading:false }
            }
            case USER_DATA_UPDATE_LOADING:{
                return{...state, loading:true, error:false}
            }
        
            default:{
                return{...state}
            }
        }
    }