import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShieldAlt, FaEnvelope, FaQuestionCircle } from "react-icons/fa"; // Recommended icons
import axios from "axios";

function Confirm() {

  const [verificationCode, setVerificationcode] = useState('')
  const formref = useRef();
  const navigate = useNavigate();
  
  const handleSubmit = () => {
    const data = {};
              new FormData(formref.current).forEach((v,k)=>data[k]=v);
              try {
                  axios.post('http://localhost:7000/insertuser', data)
                  .then((res=> {
                      console.log(res.data);
                      setVerificationcode(prev => [...prev, data]);
                      navigate('/homepage');
                  }
                ))
              }
              catch(error) {
                  console.error(error)
              }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-between p-6">
      {/* Top Section */}
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md flex flex-col items-center">
        <h1 className="text-2xl font-bold text-blue-500 mb-4">moveKigali</h1>
        <h2 className="text-gray-800 text-xl font-bold mb-2 text-center">
          Confirm Your Email
        </h2>
        <p className="text-gray-500 text-center mb-1">
          We've sent a 10-digit verification code to
        </p>
        <p className="text-gray-500 text-center">
          <span className="text-blue-500 font-semibold">
            shrofffrank@gmail.com
          </span>
        </p>
      </div>

      {/* Verification Code Input */}
      <form ref={formref}>
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md mt-6">
        <div className="mb-4">
          <label
            htmlFor="verificationCode"
            className="block text-gray-700 text-sm font-bold mb-2 text-center"
          >
            Enter Verification Code <FaShieldAlt className="inline-block ml-1 text-green-500" title="Secure Verification" />
          </label>
          <div className="relative">
            <input
              type="number"
              id="verificationCode"
              name="verificationcode"
              placeholder="Verification Code"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="h-5 w-5 text-gray-400" /> {/* Email icon for context */}
            </div>
          </div>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full cursor-pointer"
          type="button"
          name="verificationcode"
          onClick={()=> handleSubmit()}
        >
          Verify and Create Account
        </button>
      </div>
      </form>

      {/* Footer Links */}
      <div className="mt-8 text-center">
        <Link
          to="#"
          className="font-bold text-gray-500 hover:text-red-600 flex items-center justify-center"
        >
          Need Help <FaQuestionCircle className="inline-block ml-1 text-gray-500" />
        </Link>
        <span className="text-gray-400 mx-2">|</span>
        <Link to="#" className="font-bold text-gray-500 hover:text-red-600">
          FAQ
        </Link>
        <span className="text-gray-400 mx-2">|</span>
        <Link to="#" className="font-bold text-gray-500 hover:text-red-600">
          Terms of Use
        </Link>
      </div>
    </div>
  );
}

export default Confirm;