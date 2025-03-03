import React, { useState, useEffect, useContext } from "react";
import { addToFavApi, getPlaceDetailApi } from "../../services/allApi";
import { useParams } from "react-router-dom";
import serverurl from "../../services/serverurl";
import { toast, ToastContainer } from "react-toastify";
import Header from "../components/user/Header";
import { addfavoriteResponseContext } from "../../contextApi/Contextapi";

const DetailPlace = () => {
    const {addFavouriteResponse,setAddFavouriteResponse}=useContext(addfavoriteResponseContext)
  const { id } = useParams(); // Get ID from URL
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlace();
  }, [id]);

  const fetchPlace = async () => {
    try {
      const result = await getPlaceDetailApi(id);
      if (result?.data) {
        setPlace(result.data);
      } else {
        console.error("No place data found");
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToFav = async () => {
    if (!place) {
      alert("Place details are not available!");
      return;
    }
  
    const { locationUrl, description, placeName, placeImg } = place;
  
    const reqBody = new FormData();
    reqBody.append("placeName", placeName);
    reqBody.append("locationUrl", locationUrl);
    reqBody.append("description", description);
  
    // Handle placeImg properly
    if (placeImg instanceof File) {
      reqBody.append("placeImg", placeImg);
    } else if (typeof placeImg === "string") {
      try {
        const response = await fetch(`${serverurl}/uploads/${placeImg}`);
        const blob = await response.blob();
        reqBody.append("placeImg", new File([blob], placeImg, { type: blob.type }));
      } catch (error) {
        console.error("Error fetching image:", error);
        alert("Failed to retrieve image for upload.");
        return;
      }
    }
  
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("You need to be logged in to add to favourites!");
      return;
    }
  
    const reqHeader = {
      "Authorization": `Bearer ${token}`,
    };
  
    try {
      const result = await addToFavApi(reqBody, reqHeader);
      
      // Improved success check
      if (result.status === 200 || result.status === 201 || result?.data?.success) {
        setAddFavouriteResponse(result)
        toast.success("Added to favourites successfully!")
      } else {
        toast.error("Place already in favourites.")
      }
    } catch (error) {
      console.error("Error adding to favourites:", error);
      alert("An error occurred. Please try again later.");
    }
  };
  

  if (loading) return <p className="text-center text-gray-600 mt-5">Loading...</p>;

  return (
    <>
    <Header/>
      <div className="flex flex-col items-center pt-28  p-5">
        {/* Card Container */}
        <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-lg p-6 w-full max-w-5xl flex flex-col md:flex-row gap-6 border border-gray-200">
          {/* Image Section */}
          <div className="w-full md:w-[350px] h-[250px] md:h-[300px] rounded-lg overflow-hidden shadow-lg">
            <img
              className="w-full h-full object-cover"
              src={place?.placeImg ? `${serverurl}/uploads/${place.placeImg}` : "/default.jpg"}
              alt={place?.placeName || "Place Image"}
            />
          </div>
  
          {/* Text Section */}
          <div className="flex flex-col justify-between w-full">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-3">
              🌄 {place?.placeName}
            </h1>
            <p className="text-gray-700 text-md md:text-lg leading-relaxed">
              {place?.description}
            </p>
  
            {/* Buttons Section */}
            <div className="flex flex-col md:flex-row md:justify-between items-center mt-5 gap-3">
              {/* Get Directions Button */}
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-amber-500 text-white font-bold rounded-lg shadow-md flex items-center gap-2 hover:bg-black hover:text-amber-400 transition-all duration-300"
                href={place?.locationUrl}
              >
                Get Directions <i className="fa-solid fa-location-dot"></i>
              </a>
  
              {/* Add to Favourite Button */}
              <button
                onClick={addToFav}
                className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-red-500 rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
              >
                ❤️ Add to Favourite
              </button>
            </div>
          </div>
        </div>
  
        {/* Reviews Section */}
        <div className="bg-white/80 backdrop-blur-lg shadow-lg rounded-lg p-6 mt-10 w-full max-w-5xl border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">💬 Reviews</h2>
          {/* Review section can be implemented here */}
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />

    </>
  );
};

export default DetailPlace;
