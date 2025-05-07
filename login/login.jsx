import axios from "axios";
import React, { useRef, useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser } from "react-icons/fa"; // Import user icon
import { useSearchParams } from "react-router-dom";

function Login() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const formref=useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handlesubmit=()=>{
    const values={};
    new FormData(formref.current).forEach((v,k)=>values[k]=v);
       try {
        axios.post('http://localhost:7000/insertUser',{email,...values})
        .then((res=>{
          console.log(res.data);
         if (res) {
            window.location='/confirm?email='+email;
          }
          else {
            alert("User already exists");
         }
        }))
       } catch (error) {
        console.error(error);
        
       }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-2xl font-bold text-blue-500 mb-1">moveKigali</h1>
          <p className="text-gray-500 text-sm text-center">
            Create your account to explore Kigali's travel options.
          </p>
        </div>

        <form ref={formref} onSubmit={(e)=>e.preventDefault()} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
              First Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="firstName"
                name="firstname"
                placeholder="First Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-blue-500" /> {/* Changed icon color to red */}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
              Last Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="lastName"
                name="lastname"
                placeholder="Last Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-blue-500" /> {/* Changed icon color to red */}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash className="h-5 w-5 text-blue-500" /> : <FaEye className="h-5 w-5 text-blue-500" />} {/* Changed icon color to red */}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmpassword"
                placeholder="Confirm Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FaEyeSlash className="h-5 w-5 text-blue-500" /> : <FaEye className="h-5 w-5 text-blue-500" />} {/* Changed icon color to red */}
              </div>
            </div>
          </div>

          <button onClick={handlesubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full cursor-pointer"
            type="submit"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;