import React, { useContext, useEffect, useState } from "react";
import { getTicketsEventsApi } from "../../services/allApi";
import Header from "../components/user/Header";
import { addTicketResponseContext } from "../../contextApi/ContextApis";
import moment from "moment";

const TicketsPage = () => {
  const [bookedTickets, setBookedTickets] = useState([]);
  const { addTicketResponse } = useContext(addTicketResponseContext);

  useEffect(() => {
    getTickets();
  }, [addTicketResponse]);

  const getTickets = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await getTicketsEventsApi(reqHeader);
        if (result.status >= 200 && result.status <= 299) {
          setBookedTickets(result.data);
        }
      } catch (e) {
        console.error("Error fetching tickets:", e);
      }
    } else {
      alert("Please log in to access your tickets.");
    }
  };

  return (
    <>
      <Header />
      <div className="pt-28">
        <div className="container mx-auto my-10 p-8 bg-white rounded-lg shadow-xl">
          <h2 className="text-4xl font-bold text-center mb-8 text-orange-500">
            My Event Tickets
          </h2>
          {bookedTickets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookedTickets.sort((a, b) => {
                  const aExpired = moment().isAfter(moment(a.date));
                  const bExpired = moment().isAfter(moment(b.date));
                  return aExpired - bExpired; // Moves expired tickets to the bottom
                }).map((ticket) => {
                const isExpired = moment().isAfter(moment(ticket.date));
                return (
                  <div
                    key={ticket._id}
                    className="relative p-6 bg-gray-100 rounded-lg shadow-lg border border-gray-300 hover:shadow-2xl transition transform hover:scale-105"
                  >
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                      {ticket.eventName}
                    </h3>
                    <p className="text-gray-700 font-medium"> Date: {moment(ticket.date).format("DD MMM YYYY")}</p>
                    <p className="text-gray-700 font-medium"> Time: {moment(ticket.time, "HH:mm").format("hh:mm A")}</p>
                    <p className="text-gray-700 font-medium"> Tickets Booked: {ticket.ticketCount}</p>
                    <p className="text-gray-700 font-medium"> Price: ${ticket.totalPrice}</p>
                    {isExpired && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 text-xs font-bold rounded">
                        Expired
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-600 text-lg font-medium">No tickets booked yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default TicketsPage;
