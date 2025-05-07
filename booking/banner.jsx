import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBusAlt } from 'react-icons/fa';

const BannerPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/email');
    }, 4000); // 4 seconds

    return () => clearTimeout(timer); // Clean up the timer
  }, [navigate]);

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center text-blue-500 text-4xl md:text-6xl font-bold mb-4">
          <FaBusAlt className="mr-3" />
          moveKigali
        </div>
        <p className="text-gray-300 text-lg md:text-xl">
          Your journey starts here...
        </p>
      </div>
    </div>
  );
};

export default BannerPage;
