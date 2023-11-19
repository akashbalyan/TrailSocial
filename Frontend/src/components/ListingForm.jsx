import { connect } from "react-redux"



function ListingForm(){
    return(
        <div className="pl-4 pt-4">
            <h2 className="text-2xl pb-2">Add a Listing</h2>
            <form className="border-2 rounded-xl pt-3 pl-3 pr-3 pb-3">
                <div className="flex pt-2 pb-2 ">
                    <label className="basis-1/3" htmlFor="">Name</label>
                    <input type="text" className="ml-3 border-2 rounded-l" required/>
                </div>
                <div className="flex pt-2 pb-2">
                    <label  className="basis-1/3" htmlFor="">Description</label>
                    <input type="text" className="ml-3 border-2 rounded-l h-24 break-words" required placeholder="Add description ...."/>
                </div>
                <div className="flex pt-2 pb-2">
                    <label  className="basis-1/3" htmlFor="">Location</label>
                    <input type="text" className="ml-3 border-2 rounded-l" required/>
                </div>
                <div className="flex pt-2 pb-2">
                    <label  className="basis-1/3" htmlFor="">Price</label>
                    <input type="text" className="ml-3 border-2 rounded-l" required/>
                </div>
                <div className="flex pt-2 pb-2">
                    <input type="file" className="ml-3 "/>
                </div>
                <div className="flex pt-2 pb-2">
                    <input type="submit"  value="Add" className="ml-3  bg-gray-300 hover:bg-gray-400 rounded-xl pl-3 pr-3 mt-2 text-lg"/>
                </div>

            </form>
        </div>
    )
}

ListingForm.propTypes = {

}
const mapStateToProps = state =>(
    {

    }
)
export default connect(mapStateToProps,{})(ListingForm);