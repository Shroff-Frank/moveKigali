// import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEnvelope, FaBusAlt } from "react-icons/fa"; // Using email and bus icons
import Cookie from 'js-cookie'; // For cookie management


function Email() {
  const logo = '/images/logo-pic.png'

  const [ emailOrPhone, setEmailOrPhone ] = useState('');


  const handleInputChange = (event) => {
    setEmailOrPhone(event.target.value);
  };

  const handleSubmit = async () => {
  window.location='/login?email='+emailOrPhone;
  };

  useEffect(() => {
    Cookie.remove('id');
  }, []); // Clear the cookie when the component mounts

  //insert email or phonenumber

  return (
    <div className="min-h-screen bg-black flex flex-col items-center">
      <div className="bg-black py-8 flex flex-col items-center w-full max-w-md px-6 rounded-lg">
        <h1 className="text-gray-400 text-2xl font-bold mb-2 text-center">
          Create Your Account
        </h1>
        <p className="text-gray-500 text-sm text-center mb-6">
          Let's set up your account to explore Kigali's transport!
        </p>

        {/* Logo Area (Centered above the title) */}
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-blue-500 text-3xl font-semibold text-center mb-1">
            moveKigali
          </h2>
          <FaBusAlt className="text-indigo-400 text-4xl mb-2" />
          <p className="text-gray-500 text-sm text-center">Your friendly guide to getting around Kigali.</p>
        </div>

        {/* Illustration Area */}
        <div className="mb-8 w-full">
          {/* REPLACE THIS WITH A KIND AND INVITING ILLUSTRATION RELATED TO TRAVEL OR KIGALI */}
          <div className="flex flex-col items-center mb-8">
            <img src={logo} alt="moveKigali Logo" className="w-70 h-50 object-contain rounded-lg mb-1 "/>
          </div>
        </div>

        {/* Email or Phone Number Input */}
        <div className="mb-4 w-full">
          <label
            htmlFor="emailOrPhone"
            className="block text-gray-500 text-sm font-bold mb-2"
          >
            Your Email or Phone Number
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
              <FaEnvelope className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="email"
              value={emailOrPhone}
              onChange={handleInputChange}
              id="emailOrPhone"
              placeholder="Enter your email or phone number"
              className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-200 focus:outline-none  focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
        {/* Continue Button */}
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 shadow-md cursor-pointer"
          type="button"
          onClick={handleSubmit}
        >
          Let's Get Started!
        </button>
      </div>
    </div>

  );
}

export default Email;