import React, { useEffect, useState } from "react";
import { getTicketsEventsApi } from "../../services/allApi";
import Header from "../components/user/Header";



const TicketsPage = () => {
  const [bookedTickets, setBookedTickets] = useState([]);
  useEffect(()=>{
    getTickets()
  },[])
  const getTickets = async()=>{
    const token = sessionStorage.getItem("token")
    if(token){
     const reqHeader={
        "Authorization":`Bearer ${token}`
      }
      try{
        const result = await getTicketsEventsApi(reqHeader)
        if(result.status >=200 || result.status<=299){
          setBookedTickets(result.data)
        console.log(result.data);
        }
        
        
      }catch(e){
        console.log(e);
      }
    }else{
      alert("Login for full access")
    }
    
  }

  return (
    <>
    <Header/>
      <div className="pt-28">
        <div className="container mx-auto my-10 p-8 rounded-lg shadow-xl">
          <h2 className="text-5xl font-extrabold text-center mb-8 text-orange-400">Event Tickets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {
              bookedTickets.length > 0? (
                bookedTickets.map(ticket=>(
                  <div key={ticket._id}  className="relative   p-6 rounded-lg shadow-lg border border-gray-600 transform hover:scale-105 transition duration-300">
                <h3 className="text-3xl font-bold text-gray-900 mb-3">{ticket.eventName}</h3>
                <p className=" font-semibold">📅 Date:{ticket.date}</p>
                <p className=" font-semibold">⏰ Time:{ticket.time} </p>
                {/* <p className=" font-semibold">🎟️ Seat: </p> */}
                <p className=" font-semibold">💰 Price: {ticket.totalPrice}</p>
                <div className="mt-5 flex justify-center">
    
                </div>
              </div>
                ))
              ): <div>No Tickets</div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketsPage;
