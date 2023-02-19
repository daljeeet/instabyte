import { userdataType } from './auth.actions'
import {
    AUTH_LOADING,
    AUTH_ERROR,
    AUTH_SUCCESS,
    AUTH_RESET,
    AUTH_CHECK
} from './auth.actions.types'
export type authDataType = {
    login_loading:boolean,
    login_error:boolean,
    user:userdataType|null,
    isAuth:boolean
}

const iniitailState:authDataType = {
    login_loading: false,
    login_error: false,
    user: null,
    isAuth:false
}
export const authUserReducer = (state = iniitailState, actions: { type: any; payload: any }) => {
    let { type, payload } = actions
    switch (type) {
        case AUTH_LOADING: {
            return { ...state, login_loading: true,isAuth:false }
        }
        case AUTH_ERROR: {
            return { ...state, login_loading: false, error: true,isAuth:false }
        }
        case AUTH_SUCCESS: {
            return { ...state, login_loading: false, error: false,isAuth:true, user:payload}
        }
        case AUTH_CHECK: {
            if(payload.id===undefined){
                payload = null;
                return {...state,...state, login_loading:false, error: false, user:payload,isAuth:false  }
            }else{
                return { ...state, login_loading:false, error: false, user:payload,isAuth:true}
            }
        }
        case AUTH_RESET: {
            return { ...state,isAuth:false}
        }
        default: {
            return { ...state }
        }
    }
}