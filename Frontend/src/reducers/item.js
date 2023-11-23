import { ADD_ITEM, DELETE_ITEM, GET_ITEMS , ITEMS_ERROR, SORT_ITEMS } from "../actions/types";

const initialState = {
    items:[],
    loading:true,
    error:{}
}

export default function (state=initialState,action){
    
    const {type, payload} = action;

    switch(type){

        case GET_ITEMS:
        return{
            ...state,
            items:payload,
            loading:false
        }
        case ADD_ITEM:
        return{
            ...state,
            items:[payload,...state.items],
            loading:false
        }
        case DELETE_ITEM:
        return{
            ...state,
            items:state.items.filter(item=>item._id !== payload)
        }
        case SORT_ITEMS:
            if(payload == 'radio-priceLowestFirst' ){
                return{
                    ...state,
                    items:state.items.sort((a,b)=>(a.price-b.price))
                }
            }
            if(payload == 'radio-priceHighestFirst' ){
                return{
                    ...state,
                    items:state.items.sort((a,b)=>(b.price-a.price))
                }
            }
            if(payload == 'radio-suggestion' ){
                return{
                    ...state,
                    items:state.items.sort((a,b)=>(new Date(b.date)-new Date(a.date)))
                }
            }
            return state;
            
        case ITEMS_ERROR:
            return {
                ...state,
                error:payload,
                loading:false,
            }
        default:
        return state;
    }
}