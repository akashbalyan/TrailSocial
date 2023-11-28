import { connect } from "react-redux"
import { addItem } from "../actions/item"
import PropTypes from 'prop-types'
import { useState } from "react";


function ListingForm({addItem , auth:{user}}){

    const [name, setName] =useState('');
    const [description,setDescription] = useState('');
    const [location,setLocation] = useState('');
    const [price,setPrice] = useState('');
    const [itemImage, setItemImage] =useState(null);

    const onSubmit = async (e) =>  {
            e.preventDefault();

            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('location', location);
            formData.append('price', price);
            formData.append('file', itemImage);
            
            addItem(formData);

            setName('');  
            setDescription(''); 
            setLocation('');
            setPrice('');


    }

    return(
        <div className="pl-4 pt-4">
            <h2 className="text-2xl font-medium pb-2">Add a Listing</h2>
            <form onSubmit={e=>onSubmit(e)}className="border-2 rounded-xl pt-3 pl-3 pr-3 pb-3">
                <div className="flex pt-2 pb-2 ">
                    <label className="basis-1/3" htmlFor="">Name</label>
                    <input type="text" value={name} onChange={e=>setName(e.target.value)} className="ml-3 border-2 rounded-l" required/>
                </div>
                <div className="flex pt-2 pb-2">
                    <label  className="basis-1/3" htmlFor="">Description</label>
                    <input type="text" value={description} onChange={e=>setDescription(e.target.value)} className="ml-3 border-2 rounded-l h-24 break-words" required placeholder="Add description ...."/>
                </div>
                <div className="flex pt-2 pb-2">
                    <label  className="basis-1/3" htmlFor="">Location</label>
                    <input type="text" value={location} onChange={e=>setLocation(e.target.value)} className="ml-3 border-2 rounded-l" required/>
                </div>
                <div className="flex pt-2 pb-2">
                    <label  className="basis-1/3" htmlFor="">Price (CAD)</label>
                    <input type="number" value={price} onChange={e=>setPrice(e.target.value)} className="ml-3 border-2 rounded-l" required/>
                </div>
                <div className="flex pt-2 pb-2">
                    <input type="file" required  onChange={e=>setItemImage(e.target.files[0])} className="ml-3 "/>
                </div>
                <div className="flex pt-2 pb-2">
                    <input type="submit"  value="Add" className="ml-3  bg-gray-300 hover:bg-gray-400 rounded-xl pl-3 pr-3 mt-2 text-lg"/>
                </div>

            </form>
        </div>
    )
}

ListingForm.propTypes = {

    auth: PropTypes.object.isRequired,
    addItem:PropTypes.func.isRequired
}
const mapStateToProps = state =>(
    {
        auth:state.auth
    }
)
export default connect(mapStateToProps,{addItem})(ListingForm);