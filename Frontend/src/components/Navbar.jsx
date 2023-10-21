
import { Link } from 'react-router-dom';
import logo from '../assets/logo1.png'
import name from '../assets/name.png'
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { logout } from '../actions/auth';

function Navbar ({logout , isAuthenticated}) {
    

    const guestLinks = (
        <>
        <li className="bg-signin hover:bg-signinhover rounded-xl pr-1.5 pl-1.5"><Link to="/signup" className="hover:underline underline-offset-4" >Sign Up</Link></li>
         <li className="bg-signin hover:bg-signinhover rounded-xl pr-1.5 pl-1.5"><Link to="/signin"className="hover:underline underline-offset-4" >Sign In</Link></li>
        </>       
    );

    const UserLinks = (
        <>
        <li className=" hover:bg-signinhover rounded-xl pr-1.5 pl-1.5 flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>

            <Link to="/" className="hover:underline underline-offset-4" onClick={
            ()=>(logout())
            }>Logout</Link>
        </li>
        </>
         
    );



    
    return(

        <div className="min-h-[11vh] flex  w-full font-bold sticky top-0 bg-white">
            <div className="flex basis-1/5"> 
                <Link to="/" className="ml-10">
                    <img src={logo} alt="" className="w-24" />
                </Link>
                <Link to="/" className="mt-5 mb-5">
                    <img src={name} alt="" className="w-28" />
                </Link>
                
            </div>

            <div className=" basis-3/5">
                <ul className="flex text-black gap-[3vw] ml-6 mt-7">
                    <li><Link className="hover:underline underline-offset-4" to="/">Search</Link></li>
                    <li><Link className="hover:underline underline-offset-4"  to="/community">Community</Link></li>
                    <li><Link className="hover:underline underline-offset-4" to="/marketplace">Shop</Link></li>
                </ul>
            </div>
            <div className="basis-1/5 ">
                <ul className="flex gap-[2vw] justify-end mr-10 mt-7 text-black ">
                {isAuthenticated ? UserLinks :guestLinks }
                </ul>
            </div>
            
        </div>
    );
}


const mapStateToProps = state =>({
    logout:PropTypes.func.isRequired,
    isAuthenticated:state.auth.isAuthenticated
  });


export default connect(mapStateToProps,{logout})(Navbar);