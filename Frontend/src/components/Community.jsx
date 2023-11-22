import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { getPosts } from "../actions/post";
import {connect} from 'react-redux';
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import { Navigate } from 'react-router-dom';

function Community ( {getPosts , auth, post:{ posts , loading}}) {

    if( !auth.isAuthenticated){
        return <Navigate to='/signin'/>
    }
    const [userPosts, setUserPosts] = useState(false);

    useEffect(()=>{
        getPosts();
        
    },[getPosts])


    const handlePostsClick = () =>{
        setUserPosts(!userPosts)
        document.getElementById("btn-allPosts").classList.toggle("bg-gray-200");
        document.getElementById("btn-myPosts").classList.toggle("bg-gray-200");
        
    }
    
    return(
        <>
        <div className="flex">
            <div className="w-[30%] ">
                <div className="text-2xl pt-5 pl-5 mb-4 break-words">
                    Welcome <span className="text-username">{auth.isAuthenticated && auth.user && auth.user.name}</span> to Community
                </div>
                <PostForm/>
            </div>
            <div>
                <div className="pt-3 pb-3 "> 
                    <button id="btn-allPosts" className="border-4 pl-2 pr-2 rounded-lg bg-gray-200" onClick={handlePostsClick}> All Posts</button>
                    <button id="btn-myPosts" className="border-4 pl-2 pr-2 rounded-lg ml-3" onClick={handlePostsClick}> My Posts</button>
                </div>
                <div id="posts" className=" max-h-screen overflow-scroll">
                 {posts.map((post)=>(<PostItem key={post._id} post={post} userPostsOnly={userPosts}/>))}
                </div>
                
            </div>
        </div>
        </>
    )
}

Community.propTypes = {
    getPosts: PropTypes.func.isRequired , 
    post:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired
}
const mapStateToProps = state => (
    {
        auth:state.auth,
        post:state.post
    }
)

export default connect( mapStateToProps , { getPosts })(Community);