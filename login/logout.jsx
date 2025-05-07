import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBusAlt, FaSignOutAlt } from 'react-icons/fa'; // Import icons
import { Navigate } from 'react-router-dom';

const Logout = () => {

    const navigate = useNavigate();

    const handleSubmit = async () => {
      navigate('/email');
    }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="mb-8 text-center">
        <Link to="/" className="flex items-center text-blue-500 font-bold text-3xl">
          <FaBusAlt className="mr-2" />
          moveKigali
        </Link>
      </div>

      {/* Logout Card */}
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md text-center">
        <FaSignOutAlt className="mx-auto h-12 w-12 text-blue-500 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Logging Out</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to log out of your moveKigali account?
        </p>

        <div className="space-y-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline w-full cursor-pointer"
            onClick={() => {
              handleSubmit();
              //  Implement your logout logic here (e.g., clear session, redirect)
              console.log("User logged out");
            }}
          >
            Log Out
          </button>
          <Link
            to="/bus"
            className="text-gray-700 hover:text-blue-500 font-semibold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline w-full block"
          >
            Cancel
          </Link>
        </div>
      </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} moveKigali. All rights reserved.</p>
            <p>
                <Link to="/terms" className="hover:text-red-500 mx-2">Terms of Service</Link>
                |
                <Link to="/privacy" className="hover:text-red-500 mx-2">Privacy Policy</Link>
            </p>
        </footer>
    </div>
  );
};

export default Logout;
