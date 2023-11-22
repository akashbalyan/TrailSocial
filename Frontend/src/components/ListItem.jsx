import { react ,useState} from "react";
import PropTypes from 'prop-types'
import { connect } from "react-redux";

import getDate from "../utils/convertDate";
import {deleteItem} from '../actions/item';

const ListItem =  ({deleteItem, auth , item :{ _id, user, name, description , itemImage, location, price,email , date} , userItemsOnly}) => {

    const image = 'uploads/photo-1670188827740-dc2ae63dd21a.avif';
    const image2 ='uploads/painting-mountain-lake-with-mountain-background_188544-9126.avif';
    if(userItemsOnly && !auth.loading && user !== auth.user._id){
        return (
            <></>
        )
    }

    return (
      <div>
        <div className="pl-4 pr-4 pt-2  h-80 w-50">
          <img
            className="w-full h-full"
            src={`http://localhost:5001/${itemImage}`}
          ></img>
        </div>
        <div className="pl-4 pt-2 relative">
          <h2 className="text-lg font-bold">C${price}</h2>
          <h3>{name}</h3>
          <div className="flex justify-between">
            <h3>{location}</h3>
            <svg
              
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4 mt-1 mr-3"
              onClick={() => {
                document
                  .getElementById("itemInfo-div-" + _id)
                  .classList.toggle("hidden");
                const pathElement = document.getElementById(
                  "itemInfo-arrow-path-" + _id
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
                id={"itemInfo-arrow-path-" + _id}
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
          <div id={"itemInfo-div-"+_id}  className="w-full absolute bg-gray-200 hidden pt-4 pl-4 pb-4 pr-4 rounded-xl">
             { description  &&<div> <h2 className="font-bold">Description:</h2> <p>{description}</p></div>  }
             <div className="flex">
                <h2 className="font-bold">Email :</h2>
                <p>{email}</p>
             </div>
             <div className="flex">
                <h2 className="font-bold">Posted On :</h2>
                <p>{getDate(date)}</p>
             </div>
           
          </div>
        </div>
      </div>
    );
}

ListItem.propTypes = {
    auth: PropTypes.object.isRequired,
    item:PropTypes.object.isRequired,
    deleteItem:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth:state.auth
})

export default connect(mapStateToProps , {deleteItem})(ListItem);