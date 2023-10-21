import instance from "../config/axios-config";

const setAuthToken = (token) => {

    if(token){
        instance.defaults.headers.common['x-auth-token'] = token;
    }else{
        delete instance.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;
