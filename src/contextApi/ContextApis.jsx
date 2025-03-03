import React, { createContext, useState } from 'react'

export const addfavoriteResponseContext = createContext()
export const removefavoriteResponseContext = createContext()
export const addTicketResponseContext = createContext()

const ContextApis = ({children}) => {
    const [addFavouriteResponse,setAddFavouriteResponse]=useState("")
    const [removeFavouriteResponse,setRemoveFavouriteResponse]=useState("")
    const[addTicketResponse,setAddTicketResponse]=useState("")
  return (
 <addTicketResponseContext.Provider value={{addTicketResponse,setAddTicketResponse}}>
      <removefavoriteResponseContext.Provider value={{removeFavouriteResponse,setRemoveFavouriteResponse}}>
           <addfavoriteResponseContext.Provider value={{addFavouriteResponse,setAddFavouriteResponse}}>
             {children}
           </addfavoriteResponseContext.Provider>
      </removefavoriteResponseContext.Provider>
 </addTicketResponseContext.Provider>
  )
}

export default ContextApis