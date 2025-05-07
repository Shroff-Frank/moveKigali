import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBusAlt, FaTicketAlt, FaMapMarkerAlt, FaUsers, FaArrowRight, FaCalendarAlt, FaCheckCircle, FaRoute, FaPhone, FaBars, FaTimes } from 'react-icons/fa'; // Import FaBars and FaTimes for the menu icon

// Mock data for locations (replace with your actual data)
const locations = [
    { id: 'kigali', name: 'Kigali' },
    { id: 'musanze', name: 'Musanze' },
    { id: 'gisenyi', name: 'Rubavu (Gisenyi)' },
    { id: 'huye', name: 'Huye' },
    { id: 'rwamagana', name: 'Rwamagana' },
    { id: 'nyanza', name: 'Nyanza' },
];

// Define available languages
const languages = [
    { code: 'en', name: 'Eng', fullName: 'English', flag: 'https://flagcdn.com/w40/gb.png' }, // UK Flag
    { code: 'fr', name: 'Franc', fullName: 'Français', flag: 'https://flagcdn.com/w40/fr.png' }, // French Flag
    { code: 'rw', name: 'Kiny', fullName: 'Kinyarwanda', flag: 'https://flagcdn.com/w40/rw.png' }, // Rwanda Flag
];

const HomePage = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    const [passengers, setPassengers] = useState(1);
    const [isMobile, setIsMobile] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]); // Default to English
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu visibility
    const navigate = useNavigate();


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSearch = () => {
        // Implement your search/booking logic here
        console.log('Searching for buses:', { from, to, date, passengers });
        navigate('/bus');
        
        // You might want to redirect to a search results page
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="min-h-screen bg-black flex flex-col">
            {/* Header Section */}
            <header className="py-6 px-4 md:px-8 lg:px-12">
                <div className="container mx-auto flex items-center justify-between">
                    <Link to="/" className="flex items-center text-blue-600 font-bold text-2xl md:text-3xl">
                        <FaBusAlt className="mr-2" />
                        moveKigali
                    </Link>
                    <div className="flex items-center gap-4">
                        {/* Language Selector */}
                        <div className="relative">
                            <select
                                value={selectedLanguage.code}
                                onChange={(e) => {
                                    const langCode = e.target.value;
                                    const selected = languages.find(lang => lang.code === langCode);
                                    if (selected) {
                                        setSelectedLanguage(selected);
                                        // In a real app, you would also update the app's locale here
                                        // For example: i18n.changeLanguage(langCode);
                                        console.log(`Language changed to: ${selected.fullName} (${selected.code})`);
                                    }
                                }}
                                className="w-20 border border-gray-700 rounded-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-gray-800 text-sm text-white"
                            >
                                {languages.map((lang) => (
                                    <option key={lang.code} value={lang.code} className="bg-gray-800 text-white">
                                        {lang.name}
                                    </option>
                                ))}
                            </select>
                            {/* Country Flag */}
                            <img
                                src={selectedLanguage.flag}
                                alt={selectedLanguage.fullName}
                                className="absolute right-2 top-2 h-5 w-5 rounded-full"
                                style={{ pointerEvents: 'none' }}
                            />
                        </div>
                        {/* Mobile Menu Button */}
                        {isMobile && (
                            <button
                                onClick={toggleMenu}
                                className="text-gray-300 hover:text-blue-300 focus:outline-none focus:shadow-outline"
                                aria-label="Toggle Menu"
                            >
                                {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
                            </button>
                        )}
                    </div>
                    {/* Navigation Links */}
                    <nav
                        className={`${isMobile ? (isMenuOpen ? 'fixed inset-0 bg-gray-900 bg-opacity-90 z-50 flex flex-col items-center justify-center' : 'hidden') : 'flex'} ${isMobile ? '' : 'md:flex'} space-x-6`}
                    >
                        {isMobile && (
                            <button
                                onClick={toggleMenu}
                                className="absolute top-4 right-4 text-gray-300 hover:text-blue-300 focus:outline-none focus:shadow-outline md:hidden"
                                aria-label="Close Menu"
                            >
                                <FaTimes className="h-6 w-6" />
                            </button>
                        )}
                        <div className={`${isMobile ? 'flex flex-col items-center' : ''}`}>
                            <Link
                                to="/"
                                className={`${isMobile ? 'text-gray-400 text-2xl my-4' : 'text-gray-300 hover:text-blue-300'} transition-colors`}
                                onClick={isMobile ? toggleMenu : undefined}
                            >
                                 Home
                            </Link>
                            <Link
                                to="/bus"
                                className={`${isMobile ? 'text-gray-400 text-2xl my-4' : 'text-gray-300 hover:text-blue-300'} transition-colors`}
                                onClick={isMobile ? toggleMenu : undefined}
                            >
                                Book
                            </Link>
                            <Link
                                to="/contact"
                                className={`${isMobile ? 'text-gray-400 text-2xl my-4' : 'text-gray-300 hover:text-blue-300'} transition-colors`}
                                onClick={isMobile ? toggleMenu : undefined}
                            >
                                Contact
                            </Link>
                            <Link
                                to="/logout"
                                className={`${isMobile ? 'text-gray-400 text-2xl my-4' : 'text-gray-300 hover:text-blue-300'} transition-colors`}
                                onClick={isMobile ? toggleMenu : undefined}
                            >
                                Logout
                            </Link>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <main className="container mx-auto px-4 md:px-8 lg:px-12 py-8 flex-grow flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-500 mb-4">
                        Discover Rwanda by Bus
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl mb-4">
                        MoveKigali is a platform designed to simplify bus travel in Rwanda. We provide a convenient way to book tickets,
                        find routes, and manage your travel plans. Our goal is to make transportation accessible and efficient for everyone.
                    </p>
                    <p className="text-gray-300 text-lg md:text-xl mb-8">
                        Book your bus ticket with ease and explore the beautiful landscapes of Rwanda.
                    </p>

                    {/* Booking Form  */}
                    <div className="bg-gray-800 rounded-lg shadow-md p-6 w-full max-w-lg mx-auto border border-gray-700">
                        <h2 className="text-lg md:text-2xl text-blue-500 mb-4">Book Your Trip</h2>
                        <p className="text-gray-400 mb-4">
                            Enter your travel details to find available buses.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* From Location */}
                            <div className="relative">
                                <select
                                    value={from}
                                    onChange={(e) => setFrom(e.target.value)}
                                    className="w-full border border-gray-700 rounded-md py-3 px-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-gray-900 text-white"
                                >
                                    <option value="" disabled className="bg-gray-800 text-gray-400">
                                        From
                                    </option>
                                    {locations.map((location) => (
                                        <option key={location.id} value={location.id} className="bg-gray-800 text-white">
                                            {location.name}
                                        </option>
                                    ))}
                                </select>
                                <FaMapMarkerAlt className="absolute left-3 top-3.5 h-5 w-5 text-gray-500 pointer-events-none" />
                            </div>

                            {/* To Location */}
                            <div className="relative">
                                <select
                                    value={to}
                                    onChange={(e) => setTo(e.target.value)}
                                    className="w-full border border-gray-700 rounded-md py-3 px-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-gray-900 text-white"
                                >
                                    <option value="" disabled className="bg-gray-800 text-gray-400">
                                        To
                                    </option>
                                    {locations.map((location) => (
                                        <option key={location.id} value={location.id} className="bg-gray-800 text-white">
                                            {location.name}
                                        </option>
                                    ))}
                                </select>
                                <FaArrowRight className="absolute left-3 top-3.5 h-5 w-5 text-gray-500 pointer-events-none" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            {/* Date */}
                            <div className="relative">
                                <input
                                    type="date"
                                    placeholder="Date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full border border-gray-700 rounded-md py-3 px-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-900 text-white"
                                />
                                <FaCalendarAlt className="absolute left-3 top-3.5 h-5 w-5 text-gray-500 pointer-events-none" />
                            </div>
                            {/* Passengers */}
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="Passengers"
                                    value={passengers}
                                    onChange={(e) => setPassengers(parseInt(e.target.value, 10))}
                                    className="w-full border border-gray-700 rounded-md py-3 px-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-900 text-white"
                                    min="1"
                                />
                                <FaUsers className="absolute left-3 top-3.5 h-5 w-5 text-gray-500 pointer-events-none" />
                            </div>
                        </div>

                        <button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer"
                            onClick={handleSearch}
                        >
                            Find Buses
                        </button>
                    </div>
                </div>
            </main>

            {/* Feature Boxes Section */}
            <section className="container mx-auto px-4 md:px-8 lg:px-12 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Feature 1: Easy Booking */}
                    <div className="bg-gray-800 rounded-lg shadow-md p-6 flex items-start border border-gray-700">
                        <FaCheckCircle className="text-blue-500 mr-4 h-8 w-8 flex-shrink-0" />
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-2">Easy Booking</h3>
                            <p className="text-gray-400">
                                Book your bus tickets quickly and easily from your computer or mobile device.
                            </p>
                        </div>
                    </div>

                    {/* Feature 2: Wide Coverage */}
                    <div className="bg-gray-800 rounded-lg shadow-md p-6 flex items-start border border-gray-700">
                        <FaRoute className="text-blue-500 mr-4 h-8 w-8 flex-shrink-0" />
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-2">Wide Coverage</h3>
                            <p className="text-gray-400">
                                Access a wide network of bus routes across Rwanda.
                            </p>
                        </div>
                    </div>

                    {/* Feature 3: Customer Support */}
                    <div className="bg-gray-800 rounded-lg shadow-md p-6 flex items-start border border-gray-700">
                        <FaPhone className="text-blue-500 mr-4 h-8 w-8 flex-shrink-0" />
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-2">24/7 Support</h3>
                            <p className="text-gray-400">
                                Get assistance whenever you need it with our dedicated customer support.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 py-4 px-4 md:px-8 lg:px-12">
                <div className="container mx-auto text-center text-gray-400">
                    &copy; {new Date().getFullYear()} moveKigali. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
