
import { REGISTER_SUCCCESS,
         REGISTER_FAIL,
         USER_LOADED,
         AUTH_ERROR,
         LOGIN_SUCCCESS,
         LOGIN_FAIL, 
         LOGOUT} from "../actions/types";

const initialState ={
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    loading:true,
    user:null
};

export default function(state=initialState,action) {
    const {type , payload} =action;

    switch(type){
        case REGISTER_SUCCCESS:
        case LOGIN_SUCCCESS:
            localStorage.setItem('token',payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL: 
        case LOGOUT:
            localStorage.removeItem('token');
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                loading:true
            }
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                loading:false,
                user:payload
            }
        default:
            return state;
    }

}