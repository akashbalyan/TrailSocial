import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

import TrailItem from './TrailItem';

import bgImage1 from '../assets/bgImage1.png'
import bgImage2 from '../assets/bgImage2.png'
import trailIcon from '../assets/trailIcon.png'
import instagramIcon from '../assets/instagramIcon.png'
import linkedinIcon from '../assets/linkedinIcon.png'
import twitterIcon from '../assets/twitterIcon.png'
import facebookIcon from '../assets/facebookIcon.png'

import { getTrails } from '../actions/trail';

function Home ({getTrails,trail:{trails ,topFiveTrails, loading}}) {

    var data = [{name: 'Trail/Hike A', uv: 400, pv: 2400, amt: 2400},
                    {name: 'Trail/Hike A', uv: 800, pv: 2400, amt: 2400},
                    {name: 'Trail/Hike A', uv: 400, pv: 2400, amt: 2400},
                    {name: 'Trail/Hike A', uv: 400, pv: 2400, amt: 2400},
                    {name: 'Trail/Hike A', uv: 400, pv: 2400, amt: 2400}                                        
                ];
    const [searchText, setSearchText] = useState('');

    const setGraphData =() => {

        const maxLikes = topFiveTrails[0].likes;
        data = topFiveTrails.map(({ likes }) => ({ Likes:likes , pv:maxLikes, amt:maxLikes }));
        data[0].name ='A'
        data[1].name ='B'
        data[2].name ='C'
        data[3].name ='D'
        data[4].name ='E'
    }

    useEffect(()=>{ getTrails() },[getTrails]);


    {!loading && setGraphData()}
    return(
        <div className='min-h-81vh overflow-scroll'>

            <div className="min-h-[60vh] ">
                <div className='flex min-h-[60vh] absolute'>
                    <div className='basis-1/2 bg-blue-400'> <img className=" min-h-full object-fit" src={bgImage1}></img></div>
                    <div className='basis-1/2 bg-green-400'><img className=" min-h-full object-fit" src={bgImage2}></img></div>
                </div>
                <div className='absolute ml-[35%] mt-[15%]'>
                    <div className='flex border-4 rounded-2xl h-20 bg-gray-100 pt-4 pb-2 pl-4 w-[500px]'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-10 h-10  "
                        >
                            <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                        <input
                        type="text"
                        value={searchText}
                        placeholder="Search Your Trails and Hikes here"
                        onChange={e=>(setSearchText(e.target.value))}
                        className=' text-xl pl-10 bg-transparent w-full outline-none'
                        />
                    </div>
                </div>
            </div>
      
            <div>
                <div>
                    <div className='flex justify-center mt-20'>
                        <h2 className='text-[50px] font-mono font-bold text-green-800'>MOST LIKED TRAILS AND HIKES OF THE YEAR</h2>
                    </div>
                    <div className='flex justify-center mt-5'>
                            <div>
                                <BarChart width={700} height={400} data={data}>
                                <XAxis dataKey="name" stroke="#8884d8" />
                                <YAxis />
                                <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
                                <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <Bar dataKey="Likes" fill="#8884d8" barSize={30} />
                                </BarChart>
                             </div>
                    </div>
                    <div className='flex justify-between pl-10 pr-10'>
                            <div className='flex '> 
                                <img src={trailIcon} alt="" className='h-10 w-10 ' />
                                <h2 className='text-lg pt-1 pl-1 flex underline underline-offset-8'>
                                    <h3 className='font-purple font-bold '>A : </h3> <p>{!loading && topFiveTrails[0].name}</p>
                                </h2>
                            </div>
                            <div className='flex '> 
                                <img src={trailIcon} alt="" className='h-10 w-10' />
                                <h2 className='text-lg pt-1 pl-1 flex underline underline-offset-8'>
                                <h3 className='font-purple font-bold'>B : </h3> <p>{!loading && topFiveTrails[1].name}</p>
                                </h2>
                            </div>
                            <div className='flex '> 
                                <img src={trailIcon} alt="" className='h-10 w-10' />
                                <h2 className='text-lg pt-1 pl-1 flex underline underline-offset-8'>
                                <h3 className='font-purple font-bold'>C : </h3> <p>{!loading && topFiveTrails[2].name}</p>
                                </h2>
                            </div>
                            <div className='flex '> 
                                <img src={trailIcon} alt="" className='h-10 w-10' />
                                <h2 className='text-lg pt-1 pl-1 flex underline underline-offset-8'>
                                <h3 className='font-purple font-bold'>D : </h3> <p>{!loading && topFiveTrails[3].name}</p>
                                </h2>
                            </div>
                            <div className='flex '> 
                                <img src={trailIcon} alt="" className='h-10 w-10' />
                                <h2 className='text-lg pt-1 pl-1 flex underline underline-offset-8'>
                                <h3 className='font-purple font-bold'>E : </h3> <p>{!loading && topFiveTrails[4].name}</p>
                                </h2>
                            </div>
                    </div>
                </div>
            
            </div>

            <div className='min-h-[80vh] max-h-[80vh] pt-16 pl-16 pr-16 pb-16 border-2 border-gray-200 ml-20 mr-20 mt-20 rounded-2xl overflow-scroll bg-slate-100' >
            {!loading && trails.map((trail)=>(<TrailItem key={trail._id} trail={trail}  searchText={searchText} liked={false} />))}
            </div>


            <div className='pl-[30px] pr-[30px] mt-5'>
                <div className='flex justify-end'>
                    <div>
                        <h2 className='text-xl mb-4'>Connect with Us</h2>
                        <div className='flex w-[200px] justify-between mr-4'>
                            <a  href="https://www.instagram.com" target='_blank'>
                                <img src={instagramIcon}  className="h-10 w-10 " alt="" />
                            </a>
                            <a href="https://www.facebook.com" target='_blank'>
                                <img src={facebookIcon}  className="h-10 w-10" alt="" />
                            </a>
                            <a href="https://www.twitter.com" target='_blank'>
                                <img src={twitterIcon}  className="h-10 w-10" alt="" />
                            </a>
                            <a href="https://www.linkedin.com" target='_blank'>
                                <img src={linkedinIcon}  className="h-10 w-10" alt="" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className='border-2 border-gray-400 mt-5'></div>
                    <div className='mt-5'>
                        <p className=''>
                            2023 TrailSocial, LLC All Rights Reserved <br />
                            TrailSocial ® and the TrailSocial Mountain Design are registered trademarks of TrailsSocial, LLC in the United States as well as certain other jurisdictions. <br />
                            FIND YOUR WAY OUTSIDE™ is a trademark of TrailsSocial, LLC. <br />
                        </p>
                    </div>
                    <div className=' mt-3'>
                        <a className ='hover:underline' href="">Privacy Policy * </a>
                        <a className ='hover:underline' href="">Terms * </a>
                        <a className ='hover:underline' href="">Conditions </a>
                    </div>

                <div className='border-2 border-gray-400 mt-5 mb-5'></div>
            </div>
        </div>
    )
}

Home.propTypes = {
    trail:PropTypes.object.isRequired,
    getTrails:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    trail:state.trail
})

export default connect(mapStateToProps , {getTrails})(Home);