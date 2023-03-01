import { userdataType } from './auth.actions'
import {
    AUTH_LOADING,
    AUTH_ERROR,
    AUTH_SUCCESS,
    AUTH_RESET,
    GET_USER_LOADING,
    GET_USER_ERROR,
    GET_USER_SUCCESS,
    UPDATE_USER_LOADING,
    UPDATE_USER_ERROR,
    UPDATE_USER_SUCCESS
} from './auth.actions.types';
export type authDataType = {
    login_loading: boolean,
    login_error: boolean,
    user: userdataType | null,
    get_loading: boolean,
    get_error: boolean,
    update_loading: boolean;
    update_success: boolean;
    update_error: boolean;
}
const iniitailState: authDataType = {
    login_loading: false,
    login_error: false,
    user: null,
    get_loading: false,
    get_error: false,
    update_loading: false,
    update_success: false,
    update_error: false
}
export const authUserReducer = (state = iniitailState, actions: { type: any; payload: any }) => {
    let { type, payload } = actions
    switch (type) {
        case AUTH_LOADING: {
            return { ...state, login_loading: true, get_error:false, login_error:false}
        }
        case AUTH_ERROR: {
            return { ...state, login_loading: false, error: true,get_loading:false, get_error:false, }
        }
        case AUTH_SUCCESS: {
            return { ...state, login_loading: false, error: false, user: payload,get_loading:false, get_error:false,}
        }
        case AUTH_RESET: {
            return {...iniitailState}
        }
        case GET_USER_LOADING: {
            return { ...state, get_loading:true, get_error:false,}
        }
        case GET_USER_ERROR: {
            return { ...state, get_error:true,get_loading:false, }
        }
        case GET_USER_SUCCESS: {
            return { ...state, get_loading:false, get_error:false, user:payload}
        }
        case UPDATE_USER_LOADING: {
            return { ...state, update_loading:true,update_error:false, get_error:false,}
        }
        case UPDATE_USER_ERROR: {
            return { ...state, update_error:true,update_loading:false, get_error:false, }
        }
        case UPDATE_USER_SUCCESS: {
            return { ...state, update_error:false,update_loading:false,user:payload}
        }
        default: {
            return { ...state }
        }
    }
}