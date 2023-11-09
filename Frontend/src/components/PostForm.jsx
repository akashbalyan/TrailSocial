import { addPost } from "../actions/post";
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { useState } from "react";

function PostForm ({addPost}) {

    const [text, setText] =useState('');
    const [image, setImage] =useState(null);

    console.log(image);
    const onSubmit = async (e) =>  {
        console.log("hi")
            e.preventDefault();
            addPost({text});
            setText('');         
    }
    return(
        <>
        <div className="pl-4 pt-4 pr-4 pb-4">
                    <p className="text-lg mb-2">Add a Post </p>
                    <form action="" onSubmit={e=>onSubmit(e)}>
                    <input type="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder="Write Something about your experience....." 
                           className="w-full h-32 pl-2 border-2 rounded-xl"/>
                    <input type="file" onChange={(e)=>{setImage(e.target.files[0])}} className="mt-3" /> <br />
                    <input type="submit"  value="Add" className="bg-gray-300 hover:bg-gray-400 rounded-xl pl-3 pr-3 mt-3 text-lg"/> 
                    </form>
                </div>
        </>
    )
}
PostForm.propTypes = {
    addPost:PropTypes.func.isRequired
}

export default connect(null , {addPost})(PostForm);