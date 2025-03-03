import commonApi from "./commonApi"
import serverurl from "./serverurl"

// register called by auth component
export const registerUserApi=async(reqBody)=>{
    return await commonApi('POST',`${serverurl}/register`,reqBody)
   }

//    login 
export const loginUserApi = async(reqBody)=>{
    return await commonApi("POST",`${serverurl}/login`,reqBody)
}
//    get places 
export const getPlaceApi = async()=>{
    return await commonApi("GET",`${serverurl}/dash-places`,{})
}
//    get places 
export const getPlaceDetailApi = async(id)=>{
    return await commonApi("GET",`${serverurl}/get-places/${id}`,{})
}

export const addToFavApi=async(reqBody,reqHeader)=>{
    return await commonApi('POST',`${serverurl}/add-fav`,reqBody,reqHeader)
}

// get userbased favourites
export const getUserFavApi=async(reqHeader)=>{
    return await commonApi('GET',`${serverurl}/get-fav`,{},reqHeader)
}
// get userbased favourites
export const removeFavApi=async(id)=>{
    return await commonApi('DELETE',`${serverurl}/${id}/remove-fav`,{})
}

//get all hotels
export const getHotelApi=async()=>{
    return await commonApi('GET',`${serverurl}/get-hotel`,{})
}
//get all Events
export const getEventslApi=async()=>{
    return await commonApi('GET',`${serverurl}/events`,{})
}
//get details Events
export const getDetailEventsApi=async(id)=>{
    return await commonApi('GET',`${serverurl}/events/${id}/detail-events`,{})
}
//get booking Events
export const addBookingEventsApi=async(id,reqBody,reqHeader)=>{
    return await commonApi('POST',`${serverurl}/${id}/add-booking`,reqBody,reqHeader)
}
//get booked tickets of Events
export const getTicketsEventsApi=async(reqHeader)=>{
    return await commonApi('GET',`${serverurl}/user-booking`,{},reqHeader)
}