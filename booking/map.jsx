import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { FaBusAlt, FaMapMarkerAlt, FaBars } from 'react-icons/fa'; // Import FaBars
import { Link } from 'react-router-dom'; // Import Link

// Custom icons
const busIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/61/61231.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
});

const userIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
});

const MapPage = () => {
    const [busPosition, setBusPosition] = useState([-1.9501, 30.0588]); // Kigali
    const [userPosition, setUserPosition] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

    // Simulate bus movement (example only)
    useEffect(() => {
        const interval = setInterval(() => {
            setBusPosition(prev => [prev[0] + 0.0002, prev[1] + 0.0001]);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Get user location
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => setUserPosition([pos.coords.latitude, pos.coords.longitude]),
            (err) => console.error(err)
        );
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="h-screen">
            <header className="bg-black py-4 px-6 flex items-center justify-between shadow-md">
                <h1 className="text-2xl font-bold text-blue-600">
                    <Link to="/" className="flex items-center">
                        <FaBusAlt className="mr-2" />
                        moveKigali
                    </Link>
                </h1>
                {isMobile ? (
                    <button
                        className="text-gray-400 hover:text-blue-500"
                        onClick={toggleMobileMenu}
                    >
                        <FaBars className="h-6 w-6" />
                    </button>
                ) : (
                    <nav className="hidden md:flex space-x-6">
                        <Link to="/homepage" className="text-gray-700 hover:text-blue-500 transition-colors">Home</Link>
                        <Link to="/bus" className="text-gray-700 hover:text-blue-500 transition-colors">Book</Link>
                        <Link to="/contact" className="text-gray-700 hover:text-blue-500 transition-colors">Contact</Link>
                    </nav>
                )}
                {/* Mobile Menu */}
                {isMobile && isMobileMenuOpen && (
                    <nav className="fixed top-0 left-0 h-full w-full bg-gray-900 bg-opacity-90 z-50 flex flex-col items-center justify-center space-y-6">
                        <button
                            className="absolute top-4 right-4 text-gray-300 hover:text-blue-300"
                            onClick={toggleMobileMenu}
                        >
                            {/* Close icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <Link to="/homepage" className="text-gray-300 hover:text-blue-300 transition-colors text-2xl" onClick={toggleMobileMenu}>Home</Link>
                        <Link to="/bus" className="text-gray-300 hover:text-blue-300 transition-colors text-2xl" onClick={toggleMobileMenu}>Book</Link>
                        <Link to="/contact" className="text-gray-300 hover:text-blue-300 transition-colors text-2xl" onClick={toggleMobileMenu}>Contact</Link>
                    </nav>
                )}
            </header>

            <MapContainer center={busPosition} zoom={13} scrollWheelZoom={true} className="h-[90%]">
                <TileLayer
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {busPosition && (
                    <Marker position={busPosition} icon={busIcon}>
                        <Popup>🚌 Bus is here</Popup>
                    </Marker>
                )}

                {userPosition && (
                    <Marker position={userPosition} icon={userIcon}>
                        <Popup>📍 You are here</Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
};

export default MapPage;
