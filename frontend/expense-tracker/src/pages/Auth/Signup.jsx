import React, { useState } from "react";
import AuthLayout from '../../components/auth/AuthLayout';
import { Link, useNavigate } from "react-router-dom";
import {validateEmail} from '../../utils/helper';
import ProfilePhotoSelector from "../../components/input/ProfilePhotoSelector";
import Input from "../../components/input/Input";

const Signup = () => {
  const [profile,setProfile] = useState(null);
  const [fullName,setFullName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = (e) =>{
    e.preventDefault();

    let profileImageurl = "";
    if(!fullName){
      setError("Please enter your full name");
      return;
    }
    if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return;
    }
    if(!password){
      setError("Password is required");
      return;
    }
    setError("");
    //  signup api call
  };
  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className=" text-xl font-semibold text-black  ">Create Account </h3>
        <p className="text-xs text-slate-500 mt[5px] mb-6"> Join us today by entering your details below </p>


        <ProfilePhotoSelector image={profile} setImage={setProfile} />


        <form onSubmit={handleSignUp}>
          <div className=" grid grid-col-2">
          <Input 
            value={fullName}
            onChange={(target)=>setFullName(target.value)}
            label="Full Name"
            placeholder="Asad Ali"
            type="text"
            />

          <Input
          type="email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          placeholder="asad@gmail.com"
          label="Email Address"
        />
        <div className="col-span-2">
        <Input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          placeholder="Min 8 characters"
          label="Password"
        />
        </div>
          </div>


                  {error && <p className="text-red-500 text-xs pb-2.5"> {error} </p>}
                  <button className="btn-primary" type="submit">
                    SIGN UP
                  </button>
                  <p className="text-[13px]  text-slate-800 mt-3">
                    Already have an account?{" "}
                    <Link to="/login" className="font-medium text-primary underline">
                      LogIn
                    </Link>
                  </p>
        </form>
      </div>
    </AuthLayout>

  );
}

export default Signup