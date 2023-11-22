import { ADD_ITEM, DELETE_ITEM, GET_ITEMS , ITEMS_ERROR } from "../actions/types";
import instance from "../config/axios-config";
import { setAlert } from "./alert";

export const getItems = () => async dispatch =>{

    try{
        const res = await instance.get('/api/items');

        dispatch({
            type:GET_ITEMS,
            payload:res.data
        })

    }catch(error){
        dispatch({
            type:ITEMS_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}

export const addItem = (formData) => async dispatch => {

    try{

        const res = await instance.post('/api/items',formData);

        dispatch({
            type:ADD_ITEM,
            payload:res.data
        })

        dispatch(setAlert('Listing Item Added','success'));

    }catch(error){
        dispatch({
            type:ITEMS_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}

export const deleteItem = (itemId) => async dispatch => {

    try{

        const res = await instance.delete(`/api/items/${itemId}`);

        dispatch({
            type:DELETE_ITEM,
            payload:itemId
        })

        dispatch(setAlert('Listing Item Deleted','success'));

    }catch(error){
        dispatch({
            type:ITEMS_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}