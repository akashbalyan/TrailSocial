import { addPost } from "../actions/post";
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { useState } from "react";

function PostForm ({addPost}) {

    const [text, setText] =useState('');
    const [postImage, setPostImage] =useState(null);

    //console.log(image);
    const onSubmit = async (e) =>  {
            e.preventDefault();
            const formDataObject = {
                'text':text,
                'file':postImage
            };
            const formData = new FormData();
            formData.append('text', text);
            formData.append('file', postImage);
            console.log("Inside onSubmit");
            console.log(postImage);
            //console.log(formData);
            addPost(formData , {text});
            setText('');         
    }
    return(
        <>
        <div className="pl-4 pt-4 pr-4 pb-4">
                    <p className="text-lg mb-2">Add a Post </p>
                    <form action="" onSubmit={e=>onSubmit(e)}  >
                    <input type="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder="Write Something about your experience....." 
                           className="w-full h-32 pl-2 border-2 rounded-xl"/>
                    <input type="file" onChange={(e)=>{
                        setPostImage(e.target.files[0])
                        //console.log("hi");
                        //console.log(e.target.files[0]);
                        }} className="mt-3" /> <br />
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