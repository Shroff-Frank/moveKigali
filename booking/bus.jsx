import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBusAlt, FaArrowRight, FaCalendarAlt, FaUsers, FaHome, FaTicketAlt, FaUserCircle, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
import { useRef } from "react";

// Simulate fetching default locations from a database
const fetchDefaultLocations = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: "Kigali" },
                { id: 2, name: "Musanze" },
                { id: 3, name: "Gisenyi" },
                { id: 4, name: "Huye" },
            ]);
        }, 500);
    });
};

function Bus() {
    const [fromLocation, setFromLocation] = useState("");
    const [toLocation, setToLocation] = useState("");
    const [defaultLocations, setDefaultLocations] = useState([]);
    const [numberOfPassengers, setNumberOfPassengers] = useState(1);  // Default to 1
    const [ticketPrice, setTicketPrice] = useState(10000); // Set default ticket price
    const [totalPrice, setTotalPrice] = useState(10000);

    //insert passengers
    const [book, setBook] = useState('');
    const formref = useRef();
    const navigate = useNavigate();

   const handleSubmit = () => {
    const data = {};
    new FormData(formref.current).forEach((v,k)=>data[k]=v);
    try {
        axios.post('http://localhost:7000/insertpassenger', data)
        .then((res=> {
            console.log(res.data);
            setBook(prev => [...prev, data]);
            navigate('/ticket')
        }))
    }
    catch(error) {
        console.error(error)
    }
   }

    useEffect(() => {
        const getDefault = async () => {
            const locations = await fetchDefaultLocations();
            setDefaultLocations(locations);
        };
        getDefault();
    }, []);

      useEffect(() => {
        // Update total price whenever number of passengers or ticket price changes
        setTotalPrice(numberOfPassengers * ticketPrice);
    }, [numberOfPassengers, ticketPrice]);

    const handlePassengersChange = (event) => {
        const passengers = parseInt(event.target.value, 10);
        setNumberOfPassengers(isNaN(passengers) ? 1 : passengers); // Ensure a valid number, default to 1
    };

    const handlePriceChange = (event) => {
        const price = parseInt(event.target.value, 10);
        setTicketPrice(isNaN(price) ? 0 : price);
    };

    return (
        <div className="min-h-screen bg-black flex flex-col">
            {/* Logo and Header */}
            <header className="bg-black p-4 flex items-center justify-between shadow-md">
                <Link to="/" className="flex items-center text-blue-600 font-bold text-xl">
                    <FaBusAlt className="mr-2" /> moveKigali
                </Link>
                <p className="text-blue-600 font-bold text-xl">Book Your Trip</p>
            </header>

            {/* Content Area */}
            <div className="p-4 flex-grow flex flex-col justify-start items-center">
                {/* Trip Type Selection */}
                <div className="bg-white rounded-lg shadow-md w-full max-w-md mb-6">
                    <div className="grid grid-cols-3 gap-2 p-2">
                        <Link
                            to="#"
                            className="bg-blue-500 text-white p-3 rounded-lg font-bold text-center hover:bg-blue-700"
                        >
                            One Way
                        </Link>
                        <Link to="#" className="text-blue-800 p-3 rounded-lg text-center hover:bg-blue-100">
                            Round Trip
                        </Link>
                        <Link to="#" className="text-blue-800 p-3 rounded-lg text-center hover:bg-blue-100">
                            Multi-city
                        </Link>
                    </div>
                </div>

                {/* Booking Form */}
                <form ref={formref}>
                <div className="bg-white rounded-lg shadow-md w-full max-w-md p-4">
                    <div className="mb-3">
                        <label htmlFor="from" className="block text-gray-700 text-sm font-bold mb-1">
                            From
                        </label>
                        <div className="relative">
                            <select
                                id="from"
                                name="fromcity"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={fromLocation}
                                onChange={(e) => setFromLocation(e.target.value)}
                            >
                                <option value="" disabled>Select Departure City</option>
                                {defaultLocations.map((location) => (
                                    <option key={location.id} value={location.name}>{location.name}</option>
                                ))}
                            </select>
                            <FaMapMarkerAlt className="absolute inset-y-0 left-0 pl-3 flex items-center text-red-500" />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="to" className="block text-gray-700 text-sm font-bold mb-1">
                            To
                        </label>
                        <div className="relative">
                            <select
                                id="to"
                                name="tocity"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={toLocation}
                                onChange={(e) => setToLocation(e.target.value)}
                            >
                                <option value="" disabled>Select Destination City</option>
                                {defaultLocations.map((location) => (
                                    <option key={location.id} value={location.name}>{location.name}</option>
                                ))}
                            </select>
                            <FaArrowRight className="absolute inset-y-0 right-0 pr-3 flex items-center text-red-500" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                            <label htmlFor="depart" className="block text-gray-700 text-sm font-bold mb-1">
                                Depart
                            </label>
                            <div className="relative">
                                <input
                                    type="date"
                                    name="depart"
                                    id="depart"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <FaCalendarAlt className="absolute inset-y-0 right-0 pr-3 flex items-center text-red-500" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="passengers" className="block text-gray-700 text-sm font-bold mb-1">
                                No. of Passengers
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    id="passengers"
                                    name="passengers"
                                    placeholder="No."
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={numberOfPassengers}
                                    onChange={handlePassengersChange}
                                />
                                <FaUsers className="absolute inset-y-0 right-0 pr-3 flex items-center text-red-500" />
                            </div>
                        </div>
                         <div>
                            <label htmlFor="ticketPrice" className="block text-gray-700 text-sm font-bold mb-1">
                                Ticket Price
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    id="ticketPrice"
                                    name="ticket"
                                    placeholder="Price"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={ticketPrice}
                                    onChange={handlePriceChange}
                                />
                            </div>
                        </div>
                         <div>
                            <label  className="block text-gray-700 text-sm font-bold mb-1">
                                 Total Price
                            </label>
                            <div className="relative">
                                 <input
                                    type="text"
                                    id="totalPrice"
                                    name="totalprice"
                                 readOnly
                                    value={totalPrice}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  />
                            </div>
                        </div>
                    </div>

                    <button
                        className="bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:shadow-outline w-full cursor-pointer mb-10"
                        type="button"
                        onClick={() =>handleSubmit()}
                    >
                        Book Now
                    </button>
                </div>
                </form>
            </div>

            {/* Responsive Navigation Footer */}
            <nav className="bg-black py-3 w-full bottom-0 fixed sm:static shadow-md">
                <div className="max-w-md mx-auto flex justify-around items-center">
                    <Link
                        to="/homepage"
                        className="flex flex-col items-center text-blue-500 hover:text-blue-700"
                    >
                        <FaHome className="h-6 w-6 mb-1" />
                        <span className="text-xs">Home</span>
                    </Link>
                    <Link
                        to="/bus" // Add appropriate route
                        className="flex flex-col items-center text-blue-500 hover:text-blue-700"
                    >
                        <FaTicketAlt className="h-6 w-6 mb-1" />
                        <span className="text-xs">Book</span>
                    </Link>
                    <Link
                        to="/map" // Add appropriate route
                        className="flex flex-col items-center text-blue-500 hover:text-blue-700"
                    >
                        <FaMapMarkerAlt className="h-6 w-6 mb-1" />
                        <span className="text-xs">Map</span>
                    </Link>
                    <Link
                        to="/logout" // Add appropriate route
                        className="flex flex-col items-center text-blue-500 hover:text-blue-700"
                    >
                        <FaUserCircle className="h-6 w-6 mb-1" />
                        <span className="text-xs">User</span>
                    </Link>
                    {/* You can add more navigation items here */}
                </div>
            </nav>
        </div>
    );
}

export default Bus;
