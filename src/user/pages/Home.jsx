import React, { useEffect, useState } from 'react'
import Places from './Places'
import Header from '../components/user/Header'
import { Link } from 'react-router-dom'
import bgImg from '../../assets/snow.jpg'
import Events from './Events'

const Home = () => {
  const [name,setName]=useState("")
  const token = sessionStorage.getItem("token")
  const user = sessionStorage.getItem("user")
  useEffect(()=>{
    if(user){
      const userDetails= JSON.parse(user)
      console.log(userDetails.username);
      setName(userDetails.username.split(" ")[0])
     }
  },[])
  
  
  return (
    <>
       <Header/>
       <div style={{backgroundImage:`url(${bgImg})`}} className='flex items-center bg-cover justify-center flex-col  min-h-screen'>
            <h1 className='text-center text-4xl font-bold mt-5 mb-3'>Discover Your Next <br />Adventure</h1>
            <p>Uncover hidden gems and explore new destinations with ease.
            </p>
            {
              token ? <p className='text-4xl mt-10'>Welcome<span className='text-red-600 font-bold'> {name}</span></p> : 
              <Link to={'/register'} className='btn mt-5 bg-blue-600 p-2 rounded hover:bg-amber-600 text-white'>Explore with us</Link>
          
            }
       </div>
       
       {/* places */}
       { sessionStorage.getItem("token") &&
        <Places insideHome={true} />
        
        }
     
      
       
    </>
  )
}

export default Home