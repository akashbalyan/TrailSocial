import { react ,useState} from "react";
import PropTypes from 'prop-types'
import { connect } from "react-redux";

import {addLike,removeLike} from '../actions/trail';

const TrailItem =  ({ trail :{ _id, name, location ,trailImage, length, time, level, likes } ,addLike,removeLike , searchText }) => {

    const [liked,setLiked] = useState(null);

    const onLikeClick = () => {
     
        document.getElementById("like-icon-" + _id).classList.toggle("fill-blue-500");
        if(liked == null || liked ==  false){
            addLike(_id);
            setLiked(true);
        }else{
            removeLike(_id);
            setLiked(false);
        }
          
    }

    if(( searchText.toString() !== '' &&
        ( ( !name.toString().toLowerCase().includes(searchText.toString().toLowerCase()) )
        && ( !location.toString().toLowerCase().includes(searchText.toString().toLowerCase()) )
        ) ) 
    ){
        return(
            <></>
        )
    }

    return (
      <div className="flex border-2 border-b-gray-300 p-5 mb-5 rounded-xl">
            <div className="w-[400px]">
                <img className="rounded-xl" src={`http://localhost:5001/${trailImage}`} alt="" />
            </div>
            <div className="pl-5 pt-5">
                <h2 className="text-3xl font-bold">{name}</h2>
                <h2 className="text-2xl mt-2 ">{location}</h2>
                <h2 className="text-xl mt-2">Length - {length}</h2>
                <div className="flex mt-2">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div> <h2 className="text-xl ml-2">{time}</h2> </div>
                </div>
                
                <div className="flex text-xl mt-2">
                    <div>
                        <svg
                            id={"like-icon-" + _id}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class='w-8 h-8'
                            onClick={() => onLikeClick(_id)}
                        >
                            <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                            />
                        </svg>
                    </div>
                    <div className="ml-2">Likes :{likes}</div>
                </div>
            </div>
      </div>
    );
}

TrailItem.propTypes = {
    trail:PropTypes.object.isRequired,
    addLike:PropTypes.func.isRequired,
    removeLike:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    
})

export default connect(mapStateToProps , {addLike,removeLike})(TrailItem);