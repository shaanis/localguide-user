import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { loginUserApi, registerUserApi } from "../../services/allApi";
import loadingGif from'../../assets/loading.gif'
import { toast } from "react-toastify";
import loginBg from '../../assets/loginbg.jpg'

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (userDetails.username && userDetails.email && userDetails.password) {
      
      try {
        const result = await registerUserApi(userDetails);
        console.log(userDetails);

        if (result.status === 200) {
          alert("Registered Successfully!");
          setUserDetails({ username: "", email: "", password: "" });
          setTimeout(()=>{setIsLoading(true); },2000)
          setIsSignUp(false);
        } else {
          alert(result.response.data);
          setIsLoading(false)
        }
      } catch (e) {
        console.error(e);
      } 
    } else {
      alert("All fields are required");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (userDetails.email && userDetails.password) {
      setIsLoading(true); // ✅ Corrected spelling
      try {
        const result = await loginUserApi(userDetails);
        if (result.status === 200) {
          sessionStorage.setItem("user", JSON.stringify(result.data.user));
          sessionStorage.setItem("token", result.data.token);
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          // alert(result?.response?.data?.message || "Login failed");
           toast.error("Login failed")
          setIsLoading(false);
        }
      } catch (e) {
        console.error(e);
        setIsLoading(false); // ✅ Ensures loading state is reset on failure
      }
    } else {
      alert("All fields are required");
    }
  };
  

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${loginBg})` }}>
  {/* Blurred Background Overlay */}
  {/* <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div> */}

  {/* Auth Form (Not Blurred) */}
  <div className="relative z-10 px-32 py-24 backdrop-blur-sm shadow-lg rounded-lg">
    <form className="w-full max-w-md">
      <div className="flex justify-center mx-auto">
        <img className="h-15" src={logo} alt="Logo" />
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center mt-6">
        <button
          type="button"
          onClick={() => setIsSignUp(false)}
          className={`w-1/3 pb-4 font-medium text-center capitalize ${
            !isSignUp ? "border-b-2 border-blue-500 text-gray-800" : "text-gray-500"
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => setIsSignUp(true)}
          className={`w-1/3 pb-4 font-medium text-center capitalize ${
            isSignUp ? "border-b-2 border-blue-500 text-gray-800" : "text-gray-500"
          }`}
        >
          Sign Up
        </button>
      </div>

      {/* Username (Only for Sign Up) */}
      {isSignUp && (
        <div className="relative flex items-center mt-8">
          <input
            value={userDetails.username}
            onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
            type="text"
            className="block w-full text-start ps-2 py-3 border rounded-lg "
            placeholder="Username"
          />
        </div>
      )}

      {/* Email */}
      <div className="relative flex items-center mt-6">
        <input
          value={userDetails.email}
          onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
          type="email"
          className="block w-full text-start ps-2 py-3 border rounded-lg "
          placeholder="Email address"
        />
      </div>

      {/* Password */}
      <div className="relative flex items-center mt-4">
        <input
          value={userDetails.password}
          onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
          type="password"
          className="block w-full text-start ps-2 py-3 border rounded-lg"
          placeholder="Password"
        />
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          onClick={isSignUp ? handleRegister : handleLogin}
          className="w-full flex justify-center items-center gap-3 px-6 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-400"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
          {isLoading && <img style={{ width: "30px" }} src={loadingGif} alt="" />}
        </button>
      </div>

      {/* Toggle between Sign In and Sign Up */}
      <div className="mt-6 text-center">
        <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="text-sm text-blue-500 hover:underline">
          {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </button>
      </div>
    </form>
  </div>
</section>

  );
};

export default Auth;
