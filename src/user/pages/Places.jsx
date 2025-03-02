import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import serverurl from '../../services/serverurl';
import { getPlaceApi } from '../../services/allApi';
import Header from '../components/user/Header';

const Places = ({insideHome}) => {
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      const result = await getPlaceApi();
      if (result.status === 200) {
        setPlaces(result.data);
        console.log(result.data);
        
      } else {
        console.error("Failed to fetch places");
      }
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  const handleMore=(id)=>{
    navigate(`/detailPlace/${id}`);
  }

  return (
    <>
   { !insideHome && <Header/>}
    <h1 className='text-2xl font-bold text-center pt-28  mb-5'>Popular Places</h1>
      <div className='min-h-screen '>
        <div className=" grid gap-6 px-6 py-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {places.map((place) => (
            <div 
              key={place._id} onClick={()=>handleMore(place._id)}
              className="flex flex-col sm:flex-row shadow-lg rounded-lg overflow-hidden bg-white cursor-pointer"
            >
              {/* Image on top for small screens */}
              <div className="sm:hidden w-full">
                <img 
                  className="w-full h-40 object-cover" 
                  src={`${serverurl}/uploads/${place.placeImg}`} 
                  alt={place.placeName} 
                />
              </div>
    
              {/* Description */}
              <div className="p-4 flex-1">
                <h3 className="font-bold text-xl mb-3">{place.placeName}</h3>
                <p className="text-gray-700">{place.description}</p>
              </div>
             
    
              {/* Image on the side for larger screens */}
              <img 
                className="hidden sm:block w-40 h-40 object-cover" 
                src={`${serverurl}/uploads/${place?.placeImg}`} 
                alt={place.placeName} 
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Places;
