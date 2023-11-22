import { react ,useState} from "react";
import PropTypes from 'prop-types'
import { connect } from "react-redux";

import getDate from "../utils/convertDate";
import {deleteItem} from '../actions/item';

const ListItem =  ({deleteItem, auth , item :{ _id, user, name, description , itemImage, location, price , date} , userItemsOnly}) => {

    
    if(userItemsOnly && !auth.loading && user !== auth.user._id){
        return (
            <></>
        )
    }

    return (
      <div>

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