import{
    LOGIN_USER_LOADING,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    REGISTER_USER_LOADING,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS,
    LOGOUT_USER_LOADING,
    LOGOUT_USER_ERROR,
    LOGOUT_USER_SUCCESS,
  }from './auth.actions.types';
export type authDataType = {
    loggedInUser:null|string,
   login_loading:boolean,
   login_error:boolean,
   register_loading:boolean,
   register_error:boolean,
   logout_loading:boolean,
   logout_error:boolean
}

const iniitailState: authDataType = {
   loggedInUser:null,
   login_loading:false,
   login_error:false,
   register_loading:false,
   register_error:false,
   logout_loading:false,
   logout_error:false
}
export const authUserReducer = (state = iniitailState, actions: { type: any; payload: any }) => {
    let { type, payload } = actions
    switch (type) {
        case LOGIN_USER_LOADING:{
            return {...state,login_loading:true,
                login_error:false, }
        }
case LOGIN_USER_ERROR:{
    return {...state,login_loading:false,
        login_error:true, }
}
case LOGIN_USER_SUCCESS:{
    localStorage.setItem("token",payload)
        return {...state,login_loading:false,login_error:false,loggedInUser:payload}
}
case REGISTER_USER_LOADING:{
    return {...state,register_loading:true,
        register_error:false,}
}
case REGISTER_USER_ERROR:{
    return {...state,register_loading:false,
        register_error:true, }
}
case REGISTER_USER_SUCCESS:{
    localStorage.setItem("token",payload)
        return {...state,login_loading:false,login_error:false,loggedInUser:payload }
        
    }
    case LOGOUT_USER_LOADING:{
        return {...state,logout_loading:true,
            logout_error:false }
}
case LOGOUT_USER_ERROR:{
    return {...state,logout_loading:false,
        logout_error:true}
}
case LOGOUT_USER_SUCCESS:{
    localStorage.removeItem("token")
    return {...state,logout_loading:false,
        logout_error:false,loggedInUser:null }
}        
        default:{
            return state
        }
    }
    
}