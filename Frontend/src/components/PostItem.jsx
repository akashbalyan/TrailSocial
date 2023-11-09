import { react ,useState} from "react";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import SignUpImage from '../assets/SignUp.png'
import { addLike , deletePost ,addComment, deleteComment} from "../actions/post";

const PostItem =  ({addLike, deletePost, addComment, deleteComment, auth , post :{ _id, user, name, text ,postImage, likes , comments , date} , userPostsOnly}) => {

    const [commentText,setCommentText] = useState('');
    const getDate  = function(date){

        let arr = date.split('-');
        let month ='';

        switch (arr[1]) {
            case '01':
              month = 'Jan';
              break;
            case '02':
              month = 'Feb';
              break;
            case '03':
              month = 'Mar';
              break;
            case '04':
              month = 'Apr';
              break;
            case '05':
              month = 'May';
              break;
            case '06':
              month = 'Jun';
              break;
            case '07':
              month = 'Jul';
              break;
            case '08':
              month = 'Aug';
              break;
            case '09':
              month = 'Sep';
              break;
            case '10':
              month = 'Oct';
              break;
            case '11':
              month = 'Nov';
              break;
            case '12':
              month = 'Dec';
              break;
            default:
           
          }
          
        let resultDate = arr[2].substr(0,2) + ' ' + month + ',' +arr[0];
        return resultDate;
    }
    if(userPostsOnly && !auth.loading && user !== auth.user._id){
        return (
            <></>
        )
    }

    return (
      <div className=" max-w-2xl border-2 rounded-lg  mb-10  ">
        <div className="flex justify-between h-12">
          <div className="flex mt-auto mb-auto">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-7 h-7 ml-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div className="ml-2">
              <h4>{name}</h4>
            </div>
          </div>
          <div className="text-sm text-slate-400 mt-auto mb-auto mr-3">
            {" "}
            {getDate(date)}
          </div>
        </div>

        {userPostsOnly && !auth.loading && user === auth.user._id && (
          <div className="flex justify-end pr-2 mb-3">
            <button
              className="pr-4 bg-red-500 hover:bg-red-700 rounded-xl pl-2 pr-2 text-white"
              onClick={() => deletePost(_id)}
            >
              Delete Post
            </button>
          </div>
        )}

        <div className="pl-4 pr-4 pt-2 border-t-2">
          <img className="max-h-80" src={SignUpImage}></img>
        </div>

        <div className="break-words pl-4 pr-4 pt-2 pb-2">{text}</div>

        <div className="flex pt-4 pb-4 border-t-2 ">
          <div className="flex ">
            <div>
              <svg
                id={"like-icon-" + _id}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class={`w-6 h-6 ml-4 ${
                  !auth.loading &&
                  likes &&
                  likes.filter((like) => like.user.toString() === auth.user._id)
                    .length > 0
                    ? "fill-blue-300"
                    : ""
                }`}
                onClick={() => {
                  document
                    .getElementById("like-icon-" + _id)
                    .classList.toggle("fill-blue-300");
                  addLike(_id);
                }}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                />
              </svg>
            </div>
            <div className="ml-2">{likes.length}</div>
          </div>
          <div className="ml-8  w-1/4 flex">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
            </div>
            <div className="ml-2">Comments {comments.length}</div>
          </div>
          <div className="flex w-3/4 justify-end">
            <svg
              id="comments-arrow"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 mr-4"
              onClick={() => {
                document
                  .getElementById("comments-div-" + _id)
                  .classList.toggle("hidden");
                const pathElement = document.getElementById(
                  "comments-arrow-path-" + _id
                );
                const currentD = pathElement.getAttribute("d");

                // Toggle between two different path "d" values
                if (currentD === "M19.5 8.25l-7.5 7.5-7.5-7.5") {
                  pathElement.setAttribute("d", "M4.5 15.75l7.5-7.5 7.5 7.5");
                } else {
                  pathElement.setAttribute("d", "M19.5 8.25l-7.5 7.5-7.5-7.5");
                }
              }}
            >
              <path
                id={"comments-arrow-path-" + _id}
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>

        <div id={"comments-div-" + _id} className=" pl-4 pr-4 pt-2  hidden">
          <div>
            <form onSubmit={(e)=>{ 
                e.preventDefault();
                addComment(_id,{text:commentText});
                setCommentText('')

            }}>
              <input
                type="text"
                value={commentText}
                onChange={(e)=>{setCommentText(e.target.value)}}
                placeholder="Add a comment..."
                className="border-2 w-4/5 pt-2 pb-2 pl-2 rounded-lg break-words"
              />
              <input type="submit"  value="Add" className="pl-2 pt-1 pb-1 pr-2 ml-5 border-4 rounded-2xl bg-slate-200 hover:bg-slate-300" />
            
            
            </form>
          </div>
          <div className="mb-2">
            <ul>
              {comments.map((comment) => (
                <li key={comment._id}>
                  <p className="pl-2 mt-2"> {comment.name}</p>
                  <div className="flex">
                    <p className=" w-[90%] border-2 rounded-2xl pl-2 break-words">
                        {comment.text}
                    </p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class={`w-6 h-6 ml-5 ${
                            !auth.loading &&
                            comment &&
                            comment.user.toString() === auth.user._id
                            ? "fill-red-200 hover:fill-red-400"
                            : "hidden"
                        }`}
                        onClick={()=>{deleteComment(_id,comment._id)}}
                    >
                        <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                    </svg>
                  </div>
                </li>
              ))}
              {/* <li>
                        <p className="pl-2 mt-2">Akash Balyan</p>
                        <p className="border-2 rounded-2xl pl-2 break-words">nrvkuwbnv jnkuvwnrvu jknvunerwov nrvkuwbnv jnkuvwnrvu jknvunerwov nrvkuwbnv jnkuvwnrvu jknvunerwov </p>
                    </li> */}
            </ul>
          </div>
        </div>
      </div>
    );
}

PostItem.propTypes = {
    auth: PropTypes.object.isRequired,
    post:PropTypes.object.isRequired,
    addLike:PropTypes.func.isRequired,
    deletePost:PropTypes.func.isRequired,
    deleteComment:PropTypes.func.isRequired,
    addComment:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth:state.auth
})

export default connect(mapStateToProps , {addLike , deletePost , addComment,  deleteComment})(PostItem);