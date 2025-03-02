import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { addBookingEventsApi, getDetailEventsApi } from "../../services/allApi";
import serverurl from "../../services/serverurl";
import Header from "../components/user/Header";
import { toast } from "react-toastify";
import { Store } from "react-notifications-component";
// import { store } from "react-notifications-component";


const EventDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState(1);
  const { id } = useParams();
 const user =  sessionStorage.getItem("user")
 const userDetial = JSON.parse(user)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const increaseTickets = () => setTickets((prev) => prev + 1);
  const decreaseTickets = () => {
    if (tickets > 1) setTickets((prev) => prev - 1);
  };

  useEffect(() => {
    detailEvent();
  }, []);

  const detailEvent = async () => {
    try {
      const result = await getDetailEventsApi(id);
      if (result.status === 200) {
        setEvent(result.data);
      }
    } catch (e) {
      console.log("Error fetching event details:", e);
    }
  };

  // Format time to 12-hour format with AM/PM
  const formatTime = (timeString) => {
    if (!timeString) return "TBA"; 
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  // Format date to display Month name
  const formatDate = (dateString) => {
    if (!dateString) return "TBA";
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const ticketBooking = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
        toast.error("Please log in to book tickets.");
        return;
    }

    if (!event) {
        toast.error("Event details not available.");
        return;
    }

    if (event.availableTickets === 0) {
      toast.error("Tickets are sold out!");
      setIsModalOpen(false)
      return;
      
  }

    if (tickets > event.availableTickets) {
        toast.error(`Only ${event.availableTickets} tickets are left!!.`);
        setIsModalOpen(false)
        return;
    }

    const reqHeader = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    };

    const reqBody = {
        ticketCount: tickets,
    };

    try {
        const response = await addBookingEventsApi(id, reqBody, reqHeader);
        
        if (response.status >= 200 && response.status < 300) {
            // toast.success("Booking successful!");
            setIsModalOpen(false);
            setTickets(1);
            Store.addNotification({
              title: "Booking Confirmed!",
              message: "Your ticket has been successfully booked.",
              type: "success",
              insert: "top",
              container: "top-right",
              dismiss: { duration: 5000 },
            });
            const socket = new WebSocket("ws://localhost:8080");
            socket.onopen = () => {
                socket.send(JSON.stringify({ role: "user", user: userDetial.username  }));
            };

            // ✅ Refresh event details to update available tickets
            detailEvent();
        } else {
            toast.error(response.message || "Booking failed! Please try again.");
        }
    } catch (error) {
        console.error("Error during booking:", error);
        toast.error("An error occurred while booking.");
    }
};
const totalPrice = event?.ticketPrice*tickets


  return (
   <>
        <Header/>
        <div className="min-h-screen pt-28  p-8 flex flex-col items-center">
          {/* Hero Section */}
          <div className="relative w-full max-w-6xl h-72 bg-gradient-to-r from-purple-500 to-blue-600 text-white flex flex-col items-center justify-center rounded-xl shadow-lg">
            <h1 className="text-4xl font-extrabold">{event?.eventName || "Event Name"}</h1>
            <p className="mt-2 text-lg">Innovate | Connect | Grow</p>
          </div>
    
          {/* Marquee for Time Display */}
          <div className="w-full py-3 mt-6 overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-lg font-semibold rounded-md shadow-md">
            <marquee behavior="scroll" direction="left" className="p-2">
               Event starts on {formatDate(event?.date)} |  Time: {formatTime(event?.time)} |  Venue: {event?.location || "TBA"}
            </marquee>
          </div>
    
          {/* Event Details */}
          <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-8 mt-10 flex flex-col md:flex-row items-center">
            <img
              src={event?.image ? `${serverurl}/uploads/${event.image}` : "/placeholder-image.jpg"}
              alt="Event"
              className="w-full md:w-1/3 rounded-lg shadow-md mb-6 md:mb-0 md:mr-6"
            />
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Event Details</h2>
              <p className="text-gray-600 leading-relaxed">{event?.description || "Event description will be updated soon."}</p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-purple-500 text-xl" />
                  <span className="text-lg">{formatDate(event?.date)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-red-500 text-xl" />
                  <span className="text-lg">{event?.location || "TBA"}</span>
                </div>
                <div className="text-red-600 font-bold">{event?.availableTickets<=10 ? `Only ${event.availableTickets} tickets are left hurry up!`: ""}</div>
              </div>
            </div>
          </div>
    
          {/* Registration Button */}
          <div className="mt-10">
          <button
  className={`px-8 py-4 font-bold rounded-full shadow-lg text-lg transition duration-300 ${
    event?.availableTickets === 0 
      ? "bg-gray-400 cursor-not-allowed" 
      : "bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:from-purple-600 hover:to-blue-700"
  }`}
  onClick={toggleModal}
  disabled={event?.availableTickets === 0}
>
  {event?.availableTickets === 0 ? "Tickets Sold Out" : "Book Now"}
</button>

          </div>
    
          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-sm p-4">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative z-10">
                <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={toggleModal}>
                  <FaTimes size={20} />
                </button>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Select Tickets</h2>
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md text-lg font-bold shadow-md hover:bg-red-600"
                    onClick={decreaseTickets}
                  >
                    –
                  </button>
                  <input
                    style={{ width: "70px" }}
                    type="text"
                    readOnly
                    className="text-xl text-center font-bold"
                    value={tickets}
                  />
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md text-lg font-bold shadow-md hover:bg-green-600"
                    onClick={increaseTickets}
                  >
                    +
                  </button>
                </div>
                <div className="flex my-1 font-bold"><h2>Total Price : <span className="text-red-600">{totalPrice}</span></h2></div>
                <button
                  onClick={ticketBooking}
                  className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          )}
        </div>
   </>
  );
};

export default EventDetails;
