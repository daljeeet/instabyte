
import { LOADING,ERROR, SUCCESS, RESET } from "./action.type";

type initype = {
    isloading:boolean,
    img:string,
    iserror:boolean,
    isdone:boolean
}
const initialState:initype={
    isloading:false,
    img:"https://cdn.iconscout.com/icon/premium/png-128-thumb/photo-122-88145.png",
    iserror:false,
    isdone:false
}

export const imgPostReducer = (state=initialState,action:any)=>{
    const {type,payload} = action
    switch (type) {
        case LOADING:{
            return {...state, isloading:true,isdone:false}
        }case SUCCESS:{
            return {...state, isloading:false, img:payload,isdone:true}
        }case ERROR:{
            return {...state, isloading:false,iserror:true}
        }
        case RESET:{
            return {...state,img:"https://cdn.iconscout.com/icon/premium/png-128-thumb/photo-122-88145.png",isloading:false,iserror:false,isdone:false}
        }
        default:{
            return {...state}
        }
    }
}