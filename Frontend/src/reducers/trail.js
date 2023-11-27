import { GET_TRAILS , TRAILS_ERROR, LIKE_TRAIL, UNLIKE_TRAIL } from "../actions/types";

const initialState = {
    trails:[],
    topFiveTrails:[],
    loading:true,
    error:{}
}

export default function (state=initialState,action){
    
    const {type, payload} = action;

    switch(type){

        case GET_TRAILS:
        return{
            ...state,
            trails:payload,
            topFiveTrails:payload.sort((a, b) => b.likes - a.likes).slice(0,5),
            loading:false
        }
        case LIKE_TRAIL:
        return{
            ...state,
            trails:state.trails.map(trail=>
                trail._id === payload ? {...trail , likes:Number(trail.likes)+1} : trail),
            loading:false
        }
        case UNLIKE_TRAIL:
        return{
            ...state,
            trails:state.trails.map(trail=>
                trail._id === payload ? {...trail , likes:Number(trail.likes)-1} : trail),
            loading:false
        }
        case TRAILS_ERROR:
            return {
                ...state,
                error:payload,
                loading:false,
            }
        default:
        return state;
    }
}