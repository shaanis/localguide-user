import React, { useEffect, useState } from 'react';
import { FaBed, FaStar, FaMapMarkerAlt, FaWifi, FaConciergeBell, FaCheckCircle } from 'react-icons/fa';
import Header from '../components/user/Header';
import { getHotelApi } from '../../services/allApi';
import serverurl from '../../services/serverurl';
import axios from 'axios';

const Hotels = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(()=>{
    hotelShow()
  },[])
  
  const handleBookingClick = (roomId) => {
    setRooms(rooms.map(room => 
      room.id === roomId ? { ...room, booked: true } : room
    ));
    
    setTimeout(() => {
      setRooms(rooms.map(room => 
        room.id === roomId ? { ...room, booked: false } : room
      ));
    }, 3000);
  };
  const hotelShow=async()=>{
   const result = await getHotelApi()
   if(result.status == 200){
    setRooms(result.data)
    console.log(result.data);
    
    

    
   }
  }


  const handlePayment = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/create-order", {
        amount: rooms.amount,
      });

      const options = {
        key: "rzp_test_DIWkmC5AuPZ9Zm",
        amount: data.amount,
        currency: "INR",
        name: "Hotel Booking",
        description: "Room Reservation",
        order_id: data.id,
        handler: async (response) => {
          const verifyRes = await axios.post("http://localhost:5000/verify-payment", {
            ...rooms,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verifyRes.data.success) {
            alert("Booking Confirmed!");
          } else {
            alert("Payment verification failed.");
          }
        },
        theme: { color: "#3399cc" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };


  return (
    <>
         <Header/>
        <div className="flex flex-col items-center pt-28 p-6 bg-gradient-to-r min-h-screen">
          <h1 className="text-5xl font-extrabold text-black mb-16 tracking-wide font-serif"> Hotel Rooms</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl">
            {rooms.map((room) => (
              <div key={room.id} className="bg-white shadow-2xl rounded-t-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-3xl">
                <img src={`${serverurl}/uploads/${room.hotelImg}`} alt={room.hotelName} className="w-full h-64 object-cover rounded-t-xl" />
                <div className="p-6 flex flex-col items-start">
                  <h2 className="text-3xl font-semibold text-gray-900 mb-2 font-serif">{room.hotelName}</h2>
                  <p className="text-gray-700 text-md leading-relaxed">{room.description}</p>
                  <div className="flex justify-between items-center w-full mt-4">
                    <p className="text-xl font-bold text-gray-900">{room.price}</p>
                    <div className="flex items-center">
                      <FaStar className="text-yellow-500 text-xl" />
                      <span className="ml-2 text-lg text-gray-700 font-semibold">{room.rating} Stars</span>
                    </div>
                  </div>
                  <div className="flex justify-between w-full mt-5 gap-4">
                    
                      <button 
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl flex items-center gap-2 hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg text-lg"
                        onClick={handlePayment}
                      >
                        <FaBed /> Book Now
                      </button>
                  
                      <a target='_blank' href={room.locationUrl} className="">
                        <span className="relative flex items-center after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-purple-600 after:transition-all after:duration-300 hover:after:w-full">
                          <FaMapMarkerAlt className="mr-2" />
                          Direction
                        </span>
                      </a>


                  </div>
                  <div className="flex items-center gap-3 mt-4 text-gray-600">
                    {room.wifi.toLowerCase() === "yes" && (
                      <div className="flex items-center gap-2">
                        <FaWifi className="text-xl" />
                        <span>Free Wi-Fi</span>
                      </div>
                    )}
                    <FaConciergeBell className="text-xl" /><span>24/7 Service</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </>
  );
};

export default Hotels;