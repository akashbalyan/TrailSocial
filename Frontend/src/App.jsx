import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Community from './components/Community'
import Marketplace from './components/Marketplace'
import SignUp from './components/SignUp'

import {Provider} from 'react-redux';
import store from './store';
import Alert from './components/Alert'
import SignIn from './components/SignIn'
import setAuthToken from './utils/setAuthToken'
import { useEffect } from 'react'
import { loadUser } from './actions/auth'

if(localStorage.token){
  setAuthToken(localStorage.token);
}

function App() {

  useEffect(()=>{

    store.dispatch(loadUser());

  },[])
  return (
    <Provider store={store}>
    <Router>
      <Navbar/>
      <Alert/>
       <Routes>
        
        <Route path="/" element={<Home/>} />
        <Route path="/community" element={<Community/>} />
        <Route path="/marketplace" element={<Marketplace/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>} />

      </Routes>
    </Router>
    </Provider>
  )
}

export default App
