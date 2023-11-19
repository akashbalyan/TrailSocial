
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import { Navigate } from 'react-router-dom';
import ListingForm from './ListingForm';

function Marketplace ({auth}) {

    if( !auth.isAuthenticated){
        return <Navigate to='/signin'/>
    }

    return (
      <div className="flex flex-row">
        <div className="basis-1/4">
          <h2 className='text-2xl font-bold pt-5 pl-5'>Search Results</h2>

          <form action="" className='pl-5 pt-5'>
            <div className='flex border-4 rounded-2xl h-14 bg-gray-200 pt-2 pb-2 pl-2'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-8 h-8 "
                    >
                        <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                    <input
                    type="text"
                    placeholder="Search Marketplace"
                    onChange={() => {}}
                    className='pl-3 bg-transparent w-full outline-none'
                    />
            </div>
          </form>
          <ListingForm/>
        </div>
        <div></div>
      </div>
    );
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