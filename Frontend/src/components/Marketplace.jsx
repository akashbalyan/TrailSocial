
import PropTypes from 'prop-types';
import { useState,useEffect } from 'react';
import {connect} from 'react-redux';

import { Navigate } from 'react-router-dom';
import ListingForm from './ListingForm';
import ListItem from './ListItem';
import { getItems } from '../actions/item';


function Marketplace ({getItems ,auth , item : { items , loading }}) {

    if( !auth.isAuthenticated){
        return <Navigate to='/signin'/>
    }

    const [userItems, setUserItems] = useState(false);

    useEffect(()=>{
        getItems();
        
    },[getItems])

    function selectRadio(radioId) {
        // Get the radio button by its ID
        var radio = document.getElementById(radioId);
        
        // Set the radio button as checked
        radio.checked = true;
    }

    const handleItemsClick = () =>{
        setUserItems(!userItems)
        document.getElementById("btn-allItems").classList.toggle("bg-gray-200");
        document.getElementById("btn-myItems").classList.toggle("bg-gray-200");
        
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

          <div className='border-t-2 border-b-2  mt-4 pb-4'>
            <h2 className='text-2xl font-bold pt-5 pl-5 '>Filters</h2>

            <div className='flex justify-between mt-2 hover:bg-gray-200 pt-2 pb-2 rounded-2xl'>
                <div>
                    <h2 className='text-xl font-medium pl-5 '>Sort By</h2>
                </div>
                <div>
                    <svg
                    id="comments-arrow"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 mr-4"
                    onClick={() => {
                    document.getElementById("sortBy-div").classList.toggle("hidden");
                    const pathElement = document.getElementById("sortBy-arrow-path");
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
                    id="sortBy-arrow-path"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
                    </svg>
                </div>
            </div>
            
            <div id="sortBy-div" className='hidden'>
                <div className='flex justify-between pt-1 pb-1 hover:bg-gray-200 rounded-lg' onClick={()=>{selectRadio('radio-suggestion')}} >
                    <label htmlFor="" className='text-xl pl-5'>Suggested</label>
                    <input type="radio" id="radio-suggestion" name="SortBy"  className='mr-5 w-4'/>
                </div>
                <div className='flex justify-between pt-1 pb-1 hover:bg-gray-200 rounded-lg' onClick={()=>{selectRadio('radio-priceLowestFirst')}} >
                    <label htmlFor="" className='text-xl pl-5'>Price Lowest First</label>
                    <input type="radio" id="radio-priceLowestFirst" name="SortBy" className='mr-5 w-4'/>
                </div>
                <div className='flex justify-between pt-1 pb-1 hover:bg-gray-200 rounded-lg'onClick={()=>{selectRadio('radio-priceHighestFirst')}} >
                    <label htmlFor="" className='text-xl pl-5'> Price Highest First</label>
                    <input type="radio" id="radio-priceHighestFirst" name="SortBy" className='mr-5 w-4'/>
                </div>
            </div>
            
            <div>
                <h2 className='text-xl font-medium pl-5 '>Price</h2>
                <div className='flex pl-5 pt-2'>
                    <input type="text" className=' bg-gray-100 text-l rounded-lg border-1  outline-gray-300 hover:bg-gray-200 pt-1 pb-1 pl-1 pr-1 w-[110px] mr-2' placeholder='Min'/>
                    <h2 className=' text-xl pt-1 pb-1'>to</h2>
                    <input type="text" className='  bg-gray-100 text-l rounded-lg border-1 outline-gray-300  hover:bg-gray-200 pt-1 pb-1 pl-1 pr-1 w-[110px] ml-2'  placeholder='Max'/>
                </div>
            </div>
           
          </div>
          
          <ListingForm/>
        </div>

        <div className='border-l-2 ml-4 pl-4'>
            <div className="pt-3 pb-3 "> 
                <button id="btn-allItems" className="border-4 pl-2 pr-2 rounded-lg bg-gray-200" onClick={handleItemsClick}> All Items</button>
                <button id="btn-myItems" className="border-4 pl-2 pr-2 rounded-lg ml-3" onClick={handleItemsClick}> My Items</button>
            </div>
            <div id="posts" className="  grid grid-cols-3 gap-4 max-h-screen overflow-scroll bg-gray-100">
                {items.map((item)=>(<ListItem key={item._id} item={item} userItemsOnly={userItems}/>))}
            </div>
        </div>
            
      </div>
    );
}


Marketplace.propTypes = {
    auth:PropTypes.object.isRequired,
    getItems:PropTypes.func.isRequired,
    item:PropTypes.object.isRequired
}
const mapStateToProps = state => (
    {
        auth:state.auth,
        item:state.item
    }
)

export default connect( mapStateToProps , {getItems })(Marketplace);