import { REGISTER_SUCCCESS,
        REGISTER_FAIL,
        USER_LOADED,
        AUTH_ERROR,
        LOGIN_SUCCCESS,
        LOGIN_FAIL,
        LOGOUT
    } from "./types";
import instance from "../config/axios-config";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";


//Load User using token
export const loadUser =  () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try{
        console.log(localStorage.token);
        const res = await instance.get('/api/auth');
        dispatch({
            type:USER_LOADED,
            payload:res.data
        })
    }catch(error){

        dispatch({
            type:AUTH_ERROR
        })
    }
}


//Register User
export const register = ({name,email,password}) => async dispatch => {

    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    };
    const body = JSON.stringify({name,email,password});
    try {

        const res = await instance.post('/api/users',body,config);
        
        dispatch({
            type:REGISTER_SUCCCESS,
            payload:res.data
        })
        dispatch(loadUser());
    } catch (error) {
        
        const errors = error.response.data.errors;
        if(errors){
            
            errors.forEach(error => {
                dispatch(setAlert(error.msg,"danger",5000))
            });
        }
        dispatch({
            type:REGISTER_FAIL
        })
        
    }
}

//login user
export const login = ({email,password}) => async dispatch => {

    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    };
    const body = JSON.stringify({email,password});
    try {

        const res = await instance.post('/api/auth',body,config);
        
        dispatch({
            type:LOGIN_SUCCCESS,
            payload:res.data
        })
        dispatch(loadUser());
    } catch (error) {
        
        const errors = error.response.data.errors;
        if(errors){
            
            errors.forEach(error => {
                dispatch(setAlert(error.msg,"danger",5000))
            });
        }
        dispatch({
            type:LOGIN_FAIL
        })
        
    }
}

//logoutUser
export const logout = () => dispatch =>{
    dispatch({
        type:LOGOUT
    })
}