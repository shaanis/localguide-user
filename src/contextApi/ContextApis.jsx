import React, { createContext, useState } from 'react'

export const addfavoriteResponseContext = createContext()
export const removefavoriteResponseContext = createContext()

const ContextApis = ({children}) => {
    const [addFavouriteResponse,setAddFavouriteResponse]=useState("")
    const [removeFavouriteResponse,setRemoveFavouriteResponse]=useState("")
  return (
  <removefavoriteResponseContext.Provider value={{removeFavouriteResponse,setRemoveFavouriteResponse}}>
       <addfavoriteResponseContext.Provider value={{addFavouriteResponse,setAddFavouriteResponse}}>
         {children}
       </addfavoriteResponseContext.Provider>
  </removefavoriteResponseContext.Provider>
  )
}

export default ContextApis