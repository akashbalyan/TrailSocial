
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import { Navigate } from 'react-router-dom';

function Marketplace ({auth}) {

    if( !auth.isAuthenticated){
        return <Navigate to='/signin'/>
    }

    return(
        <div>
            Marketplace
        </div>
    )
}


Marketplace.propTypes = {
    auth:PropTypes.object.isRequired
}
const mapStateToProps = state => (
    {
        auth:state.auth
    }
)

export default connect( mapStateToProps , { })(Marketplace);