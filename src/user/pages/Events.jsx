import React, { useEffect, useState } from 'react';
import Header from '../components/user/Header';
import {  getEventslApi } from '../../services/allApi';
import serverurl from '../../services/serverurl';
import { useNavigate } from 'react-router-dom';


const Events = ({insideHome}) => {
  const [events,setEvents]=useState([])
   const navigate = useNavigate()
useEffect(()=>{
  getEvents()
},[])
// get all events
const getEvents=async()=>{
  const result = await getEventslApi()
  setEvents(result.data)
  console.log(result.data); 
}

const navigateDetail = (id)=>{
  navigate(`${id}/detail-events`)
}
  return (
   <>
      { insideHome ? "" : <Header/>}
      { insideHome ? "" : <h1 className='text-center font-bold text-2xl pt-28'>Events</h1>}
      <div className="grid gap-6 pt-8 px-6 py-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-10">
        
        {events.map((event) => (
          <div key={event._id} className="flex flex-col sm:flex-row sm:items-center shadow-lg rounded-lg overflow-hidden bg-white">
            <div className="sm:hidden w-full">
              <img className="w-full h-40 object-cover" src={`${serverurl}/uploads/${event.image}`} alt={event.name} />
            </div>
            <div className="p-4 flex-1">
              <h3 className="font-bold text-xl mb-3">{event.eventName}</h3>
              <p className="text-gray-700">{event.description}</p>
              {event.date && <p className="text-gray-500 mt-2">{event.date}</p>}
              { insideHome ? "" : <button onClick={()=>navigateDetail(event._id)} className="mt-4 border border-blue-600 p-2 rounded hover:bg-blue-600 hover:text-white transition duration-300">
                Explore
              </button>}
            </div>
            <div className="hidden sm:flex justify-center items-center m-2">
              <img className="w-full sm:w-40 h-40 object-cover" src={`${serverurl}/uploads/${event.image}`} alt={event.name} />
            </div>
          </div>
        ))}
      </div>
   </>
  
  );
};

export default Events;
