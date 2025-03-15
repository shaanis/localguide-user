import React, { useEffect, useState } from 'react';
import Header from '../components/user/Header';
import { getEventslApi } from '../../services/allApi';
import serverurl from '../../services/serverurl';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Card, CardContent, CardMedia, Typography, Box, Skeleton, Grid } from "@mui/material";

const Events = ({ insideHome }) => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const[isLoading,setIsLoading]=useState(false)

  useEffect(() => {
    getEvents();
  }, []);

  // get all events
  const getEvents = async () => {
   try{
    setIsLoading(true)
    const result = await getEventslApi();
    const filteredEvents = result.data.filter(event => moment().isBefore(moment(event.date)));
    setEvents(filteredEvents);
    console.log(filteredEvents);
   }catch(e){
    console.log(e);
   }finally{
    setIsLoading(false)
   }
  };

  const navigateDetail = (id) => {
    navigate(`${id}/detail-events`);
  };

  return (
    <>
      {insideHome ? "" : <Header />}
      {insideHome ? "" : <h1 className='text-center font-bold text-2xl pt-28'>Events</h1>}
      <div className="grid gap-6 pt-8 px-6 py-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-10">
        {
          isLoading? (
            <div item xs={12} sm={6} md={4} >
            <Card sx={{ maxWidth: 345, borderRadius: 3 }}>
              <Skeleton variant="rectangular" width="100%" height={140} />
              <CardContent>
                <Skeleton width="80%" height={20} />
                <Skeleton width="60%" height={20} />
                <Skeleton width="100%" height={60} />
              </CardContent>
            </Card>
          </div>
          ) :
          events.map((event) => (
          <div key={event._id} className="flex flex-col sm:flex-row sm:items-center shadow-lg rounded-lg overflow-hidden bg-white">
            <div className="sm:hidden w-full">
              <img className="w-full h-40 object-cover" src={`${serverurl}/uploads/${event.image}`} alt={event.name} />
            </div>
            <div className="p-4 flex-1">
              <h3 className="font-bold text-xl mb-3">{event.eventName}</h3>
              <p className="text-gray-700">{event.description}</p>
              {event.date && <p className="text-gray-500 mt-2">{event.date}</p>}
              {insideHome ? "" : <button onClick={() => navigateDetail(event._id)} className="mt-4 border border-blue-600 p-2 rounded hover:bg-blue-600 hover:text-white transition duration-300">
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
