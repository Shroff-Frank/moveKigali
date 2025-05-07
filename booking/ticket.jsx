import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBusAlt, FaCreditCard, FaCheckCircle, FaPhone } from 'react-icons/fa';
import axios from 'axios';

const BusTicketPay = () => {

  //insert payment
      const [payment, setPayment] = useState('');
      const formref = useRef();

      const handleSubmit = () => {
          const data = {};
          new FormData(formref.current).forEach((v,k)=>data[k]=v);
          const confirmationPayment = ('Are you sure you want to pay')
          try {
              axios.post('http://localhost:7000/insertpayment', data)
              .then((res=> {
                alert('Are you sure you want to pay');
                  console.log(res.data);
                  setPayment(prev => [...prev, data]);
              }
            ))
            if(!confirmationPayment) {
                console.log('Error payment failed');
            }
          }
          catch(error) {
              console.error(error)
          }
         }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <header className="mb-8 text-center">
        <Link to="/" className="flex items-center text-blue-500 font-bold text-3xl">
          <FaBusAlt className="mr-2" />
          moveKigali
        </Link>
      </header>

      {/* Payment Card */}
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md text-center">
        <FaCreditCard className="mx-auto h-12 w-12 text-blue-500 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pay for Ticket</h2>
        <p className="text-gray-600 mb-6">
          Complete your payment to confirm your bus ticket booking.
        </p>

        <form ref={formref}>
        <div className="space-y-4">
          {/* Payment Details (Simplified) */}
          <div className="text-left">
            <label htmlFor="cardNumber" className="block text-gray-700 text-sm font-bold mb-2">
              Card Number
            </label>
            <input
              type="text"
              name="cardnumber"
              id="cardNumber"
              placeholder="XXXX-XXXX-XXXX-XXXX"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-left">
              <label htmlFor="expiryDate" className="block text-gray-700 text-sm font-bold mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                name="expirydate"
                id="expiryDate"
                placeholder="MM/YY"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="text-left">
              <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="phonenumber"
                  id="phone"
                  placeholder="XXX XXX XXXX"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-16" // Added pl-16
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-1.5 pointer-events-none">
                  <span className="flex items-center">
                    <img
                      src="https://flagcdn.com/w40/rw.png" // URL for Rwanda flag
                      alt="Rwanda Flag"
                      className="h-5 w-5 mr-1 rounded"
                    />
                    +250
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline w-full flex items-center justify-center cursor-pointer"
            onClick={() => {
              handleSubmit()
              //  Implement your payment processing logic here
              console.log('Processing payment...');
            }}
          >
            <FaCheckCircle className="mr-2" />
            Pay Now
          </button>
          <Link
            to="/bus"
            className="text-gray-700 hover:text-blue-500 font-semibold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline w-full block text-center"
          >
            Cancel
          </Link>
        </div>
        </form>
      </div>
      {/* Footer */}
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} moveKigali. All rights reserved.</p>
        <p>
          <Link to="/terms" className="hover:text-red-500 mx-2">
            Terms of Service
          </Link>
          |
          <Link to="/privacy" className="hover:text-red-500 mx-2">
            Privacy Policy
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default BusTicketPay;
