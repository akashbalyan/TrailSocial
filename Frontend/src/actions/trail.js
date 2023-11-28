import { GET_TRAILS, TRAILS_ERROR , LIKE_TRAIL, UNLIKE_TRAIL } from "../actions/types";
import instance from "../config/axios-config";


export const getTrails = () => async dispatch =>{

    try{
        const res = await instance.get('/api/trails');

        dispatch({
            type:GET_TRAILS,
            payload:res.data
        })

    }catch(error){
        dispatch({
            type:TRAILS_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}



export const addLike = (trailId) =>  async dispatch =>{

    try{

        const res = await instance.put(`/api/trails/addLike/${trailId}`);

        dispatch({
            type:LIKE_TRAIL,
            payload:trailId
        })
    }catch(error){

        dispatch({
            type:TRAILS_ERROR,
            payload:{msg:error.response.statusText , status: error.response.status}
        })
    }

    
}


export const removeLike = (trailId) =>  async dispatch =>{

    try{

        const res = await instance.put(`/api/trails/removeLike/${trailId}`);

        dispatch({
            type:UNLIKE_TRAIL,
            payload:trailId
        })
    }catch(error){

        dispatch({
            type:TRAILS_ERROR,
            payload:{msg:error.response.statusText , status: error.response.status}
        })
    }

    
}