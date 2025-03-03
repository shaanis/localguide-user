import React, { useContext, useEffect, useState } from 'react';
import { FaTrash, FaMapMarkerAlt } from 'react-icons/fa';
import { getUserFavApi, removeFavApi } from '../../services/allApi';
import serverurl from '../../services/serverurl';
import Header from '../components/user/Header'
import { toast, ToastContainer } from 'react-toastify';
import { removefavoriteResponseContext } from '../../contextApi/ContextApis';

const Favorites = () => {
 const {removeFavouriteResponse,setRemoveFavouriteResponse} = useContext(removefavoriteResponseContext)
  const [favorites, setFavorites] = useState("")

  useEffect(()=>{
    getFavourite()
  },[])
   const getFavourite = async()=>{
    const token = sessionStorage.getItem("token")
  if(token){
    const reqHeader = {
      "Authorization":`Bearer ${token}`
    }
    try{
      const result = await getUserFavApi(reqHeader)
      setFavorites(result.data)
      console.log(result.data);
      
    }catch(e){
      console.log(e);
      
    }
  }
    
   }

  //  delete fav items
  const deletefav= async(id)=>{
    const result = await removeFavApi(id)
    if(result.status == 200){
      toast.error("item removed from favourites")
      setRemoveFavouriteResponse(result)
      getFavourite()
    }
  }

  return (
    <>
       <Header/>
      <div className="flex flex-col items-center pt-32  p-6 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Your Favorite Places</h1>
        
        {favorites.length === 0 ? (
          <p className="text-gray-600 text-lg">No favorites added yet. Start exploring and save your favorite places!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
            {favorites.map((place) => (
              <div key={place._id} className="bg-white shadow-lg rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
                <img src={`${serverurl}/uploads/${place.placeImg}`} alt={place.name} className="w-full h-56 object-cover rounded-t-2xl" />
                <div className="p-6 flex flex-col items-center">
                  <h2 className="text-2xl font-semibold text-gray-900 text-center">{place.placeName}</h2>
                  {/* <p className="text-gray-700 text-sm text-center mt-3 leading-relaxed">{place.description}</p> */}
                  
                  <div className="flex justify-between w-full mt-5 gap-4">
                    <a href={place.locationUrl} target="_blank" rel="noopener noreferrer"
                      className="px-5 py-3 bg-blue-500 text-white font-bold rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-all shadow-md">
                      <FaMapMarkerAlt /> View on Map
                    </a>
                    <button  onClick={()=>deletefav(place._id)}
                      className="px-5 py-3 bg-red-500 text-white font-bold rounded-lg flex items-center gap-2 hover:bg-red-700 transition-all shadow-md">
                      <FaTrash /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />

    </>
  );
};

export default Favorites;
