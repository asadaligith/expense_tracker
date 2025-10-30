import React, { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from '../../components/auth/AuthLayout';
import Input from '../../components/input/Input';
import { validateEmail } from '../../utils/helper';
import { UserContext } from '../../context/UserContext';

const Login = () => {
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const [error, setError]= useState(null);

  const {updateUser} = useContext(UserContext);
  const navigate = useNavigate()



  const handleLogin = async (e)=>{
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please Enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please Enter a password");
      return;
    }

    setError("");
    //  login api call 
    try {
        const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
            // Note: The variable names (email, password) match the state variables
            email,
            password,
        });

        // Assuming the backend returns { token: '...', user: {...} }
        const { token, user } = response.data; 

        if (token) {
            // Save token to local storage (Request Interceptor will use this)
            localStorage.setItem("token", token);
            updateUser(user)

            // Navigate to the protected dashboard page
            navigate("/dashboard");
        }
    } catch (error) {
        // This catch block handles all errors (400, 404, network, etc.)
        // Global 401/500/timeout handling is managed in the Response Interceptor

        if (error.response && error.response.data && error.response.data.message) {
            // Display specific error message from the server (e.g., "Invalid credentials")
            setError(error.response.data.message);
        } else {
            // Display a generic error if no specific message is available
            setError("Login failed. Please check your network or try again.");
        }
    }


  };

  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
      <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please Enter Your Details to log in</p>

      <form onSubmit={handleLogin}>
        <Input
        value={email} 
        onChange={(e)=> setEmail(e.target.value)}
        label="email"
        placeholder="asad@gmail.com" 
        type="text"/>

        <Input
        value={password} 
        onChange={(e)=> setPassword(e.target.value)}
        label="password"
        placeholder="Min 8 characters" 
        type="password"/>

         {error && <p className="text-red-500 text-xs pb-2.5"> {error} </p>}
        <button className="btn-primary" type="submit">
          LOGIN
        </button>
        <p className="text-[13px]  text-slate-800 mt-3">
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-primary underline">
            Sign Up
          </Link>
        </p>

      </form>
      </div>
    </AuthLayout>
  )
};

export default Login

