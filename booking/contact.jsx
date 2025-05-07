import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBusAlt, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBars } from 'react-icons/fa'; // Import FaBars

// Define available languages
const languages = [
    { code: 'en', name: 'Eng', fullName: 'English', flag: 'https://flagcdn.com/w40/gb.png' }, // UK Flag
    { code: 'fr', name: 'Franc', fullName: 'Français', flag: 'https://flagcdn.com/w40/fr.png' }, // French Flag
    { code: 'rw', name: 'Kiny', fullName: 'Kinyarwanda', flag: 'https://flagcdn.com/w40/rw.png' }, // Rwanda Flag
];

const ContactPage = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]); // Default to English
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu visibility

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
        <div className="min-h-screen bg-black flex flex-col">
            {/* Header Section */}
            <header className="py-6 px-4 md:px-8 lg:px-12">
                <div className="container mx-auto flex items-center justify-between">
                    <Link to="/" className="flex items-center text-blue-600 font-bold text-2xl md:text-3xl">
                        <FaBusAlt className="mr-2" />
                        moveKigali
                    </Link>
                    {/* Mobile Menu Button */}
                    {isMobile && (
                        <button
                            className="md:hidden text-gray-300 hover:text-blue-300"
                            onClick={toggleMobileMenu}
                        >
                            <FaBars className="h-6 w-6" />
                        </button>
                    )}
                    <nav
                        className={
                            isMobile
                                ? isMobileMenuOpen
                                    ? "fixed top-0 left-0 h-full w-full bg-gray-900 bg-opacity-90 z-50 flex flex-col items-center justify-center space-y-6"
                                    : "hidden"
                                : "hidden md:flex space-x-6"
                        }
                    >
                        {isMobile && isMobileMenuOpen && (
                            <button
                                className="absolute top-4 right-4 text-gray-300 hover:text-blue-300"
                                onClick={toggleMobileMenu}
                            >
                                {/* Close icon  */}
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
                        )}
                        <Link
                            to="/homepage"
                            className="text-gray-300 hover:text-blue-300 transition-colors"
                            onClick={isMobile ? toggleMobileMenu : undefined}
                        >
                            Home
                        </Link>
                        <Link
                            to="/bus"
                            className="text-gray-300 hover:text-blue-300 transition-colors"
                            onClick={isMobile ? toggleMobileMenu : undefined}
                        >
                            Book
                        </Link>
                        <Link
                            to="/contact"
                            className="text-gray-300 hover:text-blue-300 transition-colors"
                            onClick={isMobile ? toggleMobileMenu : undefined}
                        >
                            Contact
                        </Link>
                    </nav>
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
                    </div>
                </div>
            </header>

            {/* Main Content Section */}
            <main className="container mx-auto px-4 md:px-8 lg:px-12 py-8 flex-grow flex items-center justify-center">
                <div className="text-center w-full max-w-2xl">
                    <h1 className="text-4xl font-bold text-blue-500 mb-6">Contact Us</h1>
                    <p className="text-gray-300 text-lg mb-8">
                        We're here to help! Please feel free to reach out to us with any questions, feedback, or inquiries.
                    </p>

                    <div className="bg-gray-800 rounded-lg shadow-md p-6 w-full border border-gray-700">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Contact Information - Phone */}
                            <div className="flex items-center">
                                <FaPhone className="text-blue-500 mr-4 h-6 w-6 flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-1">Phone</h3>
                                    <p className="text-gray-400">+250 788 123 456</p>
                                </div>
                            </div>

                            {/* Contact Information - Email */}
                            <div className="flex items-center">
                                <FaEnvelope className="text-blue-500 mr-4 h-6 w-6 flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-1">Email</h3>
                                    <p className="text-gray-400">info@movekigali.com</p>
                                </div>
                            </div>

                            {/* Contact Information - Address */}
                            <div className="flex items-center">
                                <FaMapMarkerAlt className="text-blue-500 mr-4 h-6 w-6 flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-1">Address</h3>
                                    <p className="text-gray-400">
                                        KN 2 St, Kigali, Rwanda
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Optional: Add a contact form here if you want to allow users to submit messages directly. */}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 py-4 px-4 md:px-8 lg:px-12">
                <div className="container mx-auto text-center text-gray-400">
                    &copy; {new Date().getFullYear()} moveKigali. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default ContactPage;

