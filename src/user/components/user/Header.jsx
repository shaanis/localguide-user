import React, { useContext, useEffect, useState } from "react";
import logo from "../../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { getTicketsEventsApi, getUserFavApi } from "../../../services/allApi";
import { addfavoriteResponseContext, addTicketResponseContext, removefavoriteResponseContext } from "../../../contextApi/ContextApis";

const Header = () => {
  const {addFavouriteResponse,setAddFavouriteResponse}=useContext(addfavoriteResponseContext)
  const {removeFavouriteResponse,setRemoveFavouriteResponse} = useContext(removefavoriteResponseContext)
    const{addTicketResponse,setAddTicketResponse}=useContext(addTicketResponseContext)
  
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [favorite,setFavorite]=useState("")
  const [tickets,setTickets]=useState("")
  useEffect(()=>{
    getFavourite()
  },[addFavouriteResponse,removeFavouriteResponse])
  useEffect(()=>{
    getTickets()
  },[addTicketResponse])
   const getFavourite = async()=>{
      const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Authorization":`Bearer ${token}`
      }
      try{
        const result = await getUserFavApi(reqHeader)
        setFavorite(result.data)
        console.log(result.data);
        
      }catch(e){
        console.log(e);
        
      }
    }
      
     }

     const getTickets=async()=>{
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Authorization":`Bearer ${token}`
        }
        try{
          const result = await getTicketsEventsApi(reqHeader)
          setTickets(result.data)
        }catch(e){
          console.log(e);
          
        }
     }
    }
     

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <nav className="bg-transparent shadow dark:bg-gray-800 absolute z-1 w-full">
        <div className="container px-6 py-4 mx-auto">
          <div className="lg:flex lg:items-center">
            <div className="flex items-center justify-between">
              <a href="#">
                <img className="w-auto h-15 " src={logo} alt=" Logo" />
              </a>

              {/* Mobile menu button */}
              <div className="flex lg:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none"
                  aria-label="toggle menu"
                >
                  {!isOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 8h16M4 16h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div
              className={`${
                isOpen
                  ? "translate-x-0 opacity-100 flex justify-between"
                  : "opacity-0 -translate-x-full"
              } absolute inset-x-0 z-20 flex-1 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center lg:justify-between`}
            >
              <div className="flex flex-col text-gray-600 capitalize dark:text-gray-300 lg:flex lg:px-16 lg:-mx-4 lg:flex-row lg:items-center font-bold">
                <Link
                  to={"/"}
                  className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Home
                </Link>
                <Link
                  to={"/places"}
                  className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Places
                </Link>
                <Link
                  to={"/hotels"}
                  className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Hotels
                </Link>
                <Link
                  to={"/events"}
                  className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Events
                </Link>
                <Link
                  to={"/favourites"}
                  className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Favourites
                  { favorite.length>0?
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-600 text-teal-50 rounded-full ms-1 ">
                    {favorite.length}
                  </span>:""
                  }
                </Link>
                <Link
                  to={"/tickets"}
                  className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Tickets
                  { tickets?.length>0 ?
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-600 text-teal-50 rounded-full ms-1">
                  {tickets?.length}
                  </span>:""
                  }
                </Link>
                <Link className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200">
                  Contact Us
                </Link>

                <div className="relative mt-4 lg:mt-0 lg:mx-4">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      className="w-4 h-4 text-gray-600 dark:text-gray-300"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </span>

                  <input
                    type="text"
                    className="w-full rounded py-1 pl-10 pr-4 text-gray-700 placeholder-gray-600 bg-white border-b border-gray-600 dark:placeholder-gray-300 dark:focus:border-gray-300 lg:w-56 lg:border-transparent dark:bg-gray-800 dark:text-gray-300 focus:outline-none focus:border-gray-600"
                    placeholder="Search"
                  />
                </div>
              </div>
              <div className="btn cursor-pointer font-bold text-red-600" onClick={handleLogout}>Logout</div>

              <div className="flex justify-center mt-6 lg:flex lg:mt-0 lg:-mx-2">
                {/* Add social links/icons */}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
