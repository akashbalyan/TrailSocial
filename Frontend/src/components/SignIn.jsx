
import {useState} from 'react';
import { Navigate } from 'react-router-dom';

import SignUpImage from '../assets/SignUp.png'
import {connect} from 'react-redux';
import { login } from '../actions/auth';
import  PropTypes from 'prop-types'


 function SignIn({ login , isAuthenticated}) {

    const [formData , setFormData] = useState({

        email:'',
        password:''

    });

    const {email,password} = formData;

    const onChange= (e) => {setFormData({...formData, [e.target.name]:e.target.value})};

    const onSubmit = async (e)=>{

        e.preventDefault();
        login({email,password});
        
    };


    if(isAuthenticated){
        return <Navigate to='/'/>
    }
    
    return (
      <>
        <div
          className=" flex justify-center min-h-[89vh] bg-opacity-75 bg-cover "
          style={{ backgroundImage: `url(${SignUpImage})` }}
        >
          <div className="  bg-white mt-auto mb-auto w-1/4 border-2 border-gray-500 rounded-lg ring-2 ring-gray-200" >
            <h1 className="text-3xl text-center mt-12 mb-12 font-bold" >Sign In</h1>
            <form onSubmit={e=>onSubmit(e)} >
              <div className="ml-auto mr-auto w-[80%]">

                <div className="flex justify-center mt-6 mb-6">
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
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  <input type="text" placeholder='Email' name="email" value={email} onChange={(e)=>(onChange(e))}  required className="border-2 border-gray-300 rounded-md ml-2 w-3/4"/>
                </div>

                <div className="flex justify-center mt-6 mb-6" >
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
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                  <input type="password" placeholder="Password" name="password"  value={password}  onChange={(e)=>(onChange(e))}  required className="border-2 border-gray-300 rounded-md ml-2 w-3/4" />
                </div>

                
              </div>
              <div className="flex justify-center mt-12 mb-12" >
                <div className='bg-black rounded-xl' >
                <input type="submit"   value="Sign In" className="pt-2 pr-2 pl-2 pb-2 text-white" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
 }

 SignIn.propTypes = {
    login:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool
}
 
 const mapStateToProps = state=>({
    isAuthenticated:state.auth.isAuthenticated
  });

 export default connect(mapStateToProps , { login })(SignIn);