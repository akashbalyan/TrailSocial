import { DELETE_POST, GET_POSTS ,POSTS_ERROR, UPDATE_LIKES, ADD_POST, ADD_COMMENT, REMOVE_COMMENT } from "./types";
import instance from "../config/axios-config";
import { setAlert } from "./alert";


//get posts

export const getPosts = () =>  async dispatch =>{

    try{

        const res = await instance.get('/api/posts');

        dispatch({
            type:GET_POSTS,
            payload:res.data
        })
    }catch(error){

        dispatch({
            type:POSTS_ERROR,
            payload:{msg:error.response.statusText , status: error.response.status}
        })
    }

    
}

//Add or remove a  like

export const addLike = (postId) =>  async dispatch =>{

    try{

        const res = await instance.put(`/api/posts/like/${postId}`);

        dispatch({
            type:UPDATE_LIKES,
            payload:{postId ,likes:res.data}
        })
    }catch(error){

        dispatch({
            type:POSTS_ERROR,
            payload:{msg:error.response.statusText , status: error.response.status}
        })
    }

    
}

//Delete a post

export const deletePost = (postId) =>  async dispatch =>{

    try{

        const res = await instance.delete(`/api/posts/${postId}`);

        dispatch({
            type: DELETE_POST,
            payload:postId
        })

        dispatch(setAlert('Post Removed','success'));
    }catch(error){

        dispatch({
            type:POSTS_ERROR,
            payload:{msg:error.response.statusText , status: error.response.status}
        })
    }

    
}

//Add a post

export const addPost = (imageFormData,formData) =>  async dispatch =>{

    try{
        // console.log("Inside AddPost ");
        // console.log(formData);
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res = await instance.post('/api/posts',imageFormData );
        
        dispatch({
            type: ADD_POST,
            payload:res.data
        })

        dispatch(setAlert('Post Added','success'));
    }catch(error){
            console.log(error)
        dispatch({
            type:POSTS_ERROR,
            payload:{msg:error.response.statusText , status: error.response.status}
        })
    }

    
}


//Add Comment

export const addComment = (postId, formData) =>  async dispatch =>{

    try{
                
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res = await instance.put(`/api/posts/comment/${postId}`,formData ,config);
    
        dispatch({
            type: ADD_COMMENT,
            payload:{ postId, comments:res.data}
        })

        dispatch(setAlert('Comment Added','success'));
    }catch(error){
            console.log("Error")
        dispatch({
            type:POSTS_ERROR,
            payload:{msg:error.response.statusText , status: error.response.status}
        })
    }

    
}

//Delete Comment

export const deleteComment = (postId, commentId) =>  async dispatch =>{

    try{


        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res = await instance.delete(`/api/posts/comment/${postId}/${commentId}` ,config);
    
        dispatch({
            type: REMOVE_COMMENT,
            payload:{ postId, comments:res.data}
        })

        dispatch(setAlert('Comment Deleted','success'));
    }catch(error){
            console.log("Error")
        dispatch({
            type:POSTS_ERROR,
            payload:{msg:error.response.statusText , status: error.response.status}
        })
    }

    
}