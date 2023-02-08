
import { LOADING,ERROR, SUCCESS, RESET } from "./action.type";

export type imgInitype = {
    isloading:boolean,
    img:string,
    iserror:boolean,
    isdone:boolean
}
const initialState:imgInitype={
    isloading:false,
    img:"",
    iserror:false,
    isdone:false
}

export const imgPostReducer = (state=initialState,action:any)=>{
    const {type,payload} = action
    switch (type) {
        case LOADING:{
            return {...state, isloading:true,isdone:false}
        }case SUCCESS:{
            return {...state, isloading:false, img:payload, isdone:true}
        }case ERROR:{
            return {...state, isloading:false,iserror:true}
        }
        case RESET:{
            return {...state, isloading:false,
                img:"",
                iserror:false,
                isdone:false}
        }
        default:{
            return {...state}
        }
    }
}