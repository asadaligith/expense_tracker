import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from '../../components/auth/AuthLayout';
import Input from '../../components/input/Input';

const Login = () => {
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const [error, setError]= useState(null);
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
  };

  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
      <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please Enter Your Details to log in</p>

      <form onSubmit={handleLogin}>
        <Input
        value={email} 
        onChange={(target)=> setEmail(target.value)}
        label="email"
        placeholder="asad@gmail.com" 
        type="text"/>

        <Input
        value={password} 
        onChange={(target)=> setPassword(target.value)}
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

