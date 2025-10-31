import React, {useContext, useState } from "react";
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate } from "react-router-dom";
import {validateEmail} from '../../utils/helper';
import ProfilePhotoSelector from "../../components/input/ProfilePhotoSelector";
import Input from "../../components/input/Input";
import { UserContext } from "../../context/UserContext";
import uploadImage from "../../utils/uploadImage";
import { API_PATHS } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosinstance";

const Signup = () => {
  const [profile,setProfile] = useState(null);
  const [fullName,setFullName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(null);

  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  const handleSignUp = async (e) =>{
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
    try {
            let profileImageUrl = "";

            // 1. Upload image if present
            if (profile) {
              const imgUploadResponse = await uploadImage(profile);
              console.log("Upload response:", imgUploadResponse);
              profileImageUrl = imgUploadResponse.imageUrl || imgUploadResponse.filePath || ""; 
              }

            // 2. Perform the main registration API call
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                fullname :fullName,
                email,
                password,
                profileImageUrl: profileImageUrl,
                // Include the uploaded profile image URL in the registration payload
                // profileImageUrl: profileImageUrl,
            });

            // 3. Handle successful registration
            const { token, user } = response.data; 

            if (token) {
                localStorage.setItem("token", token);
                updateUser(user); // Update the global user state
                navigate("/dashboard"); // Navigate on success
            }
        } catch (error) {
            // Catch errors from registration AND the uploadImage call
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else if (!error.message.includes("Failed to upload")) { // Avoid double-logging the upload error
                setError("Registration failed. Please check your network.");
            }
        }


  };
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className=" text-xl font-semibold text-black  ">Create Account </h3>
        <p className="text-xs text-slate-500 mt[5px] mb-6"> Join us today by entering your details below </p>


        <ProfilePhotoSelector image={profile} setImage={setProfile} />


        <form onSubmit={handleSignUp}>
          <div className=" grid grid-col-2">
          <Input 
            value={fullName}
            onChange={(e)=>setFullName(e.target.value)}
            label="Full Name"
            placeholder="Asad Ali"
            type="text"
            />

          <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="asad@gmail.com"
          label="Email Address"
        />
        <div className="col-span-2">
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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