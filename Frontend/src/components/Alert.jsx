import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const Alert=({alerts})=>
    alerts !== null &&
    alerts.length>0 &&
    alerts.map(alert=>(
        <div key={alert.id}>
        <div class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
  <p class="font-bold">{alert.msg}</p>
  
</div>
        </div>
        )
);

Alert.propTypes = {
    alerts:PropTypes.array.isRequired
}
const mapStateToProps=(state)=>({
    alerts:state.alert
})

export default connect(mapStateToProps)(Alert);