import{combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import post from './post'; 
import item from './item'

export default combineReducers({
alert,
auth,
post,
item
});