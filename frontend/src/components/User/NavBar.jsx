import React, { useState, useRef, useEffect } from 'react';
import { FaUser } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import CountryLogo from "../../images/CountryLogo.png";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router
import Profile from '../Specials/Profile';

export default function NavBar() {
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const searchInputRef = useRef(null);
    const navigate = useNavigate(); // For navigation

    const toggleSearch = () => {
        setIsSearchExpanded(!isSearchExpanded);
    };

    const handleLogout = () => {
        // Clear user data (e.g., tokens, session storage, etc.)
        localStorage.removeItem("userToken"); // Example: Remove token from localStorage
        sessionStorage.clear();

        // Redirect to login page
        navigate("/");
    };

    // Focus the input when search is expanded
    useEffect(() => {
        if (isSearchExpanded && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchExpanded]);

    // Close search on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setIsSearchExpanded(false);
            }
        };

        if (isSearchExpanded) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isSearchExpanded]);

    const OpenProfile = () => {
        setOpenProfile(!openProfile);
    }

    return (
        <nav className="border-b-[2px] border-gray-300 px-28 py-3 flex bg-lme-300 font-semibold">
            {/* Left side: Logo and navigation links */}
            <div className="flex items-center space-x-8">
                {/* Logo */}
                <div className="text-xl text-indigo-600">
                    <img
                        src={CountryLogo}
                        alt="Logo"
                        className='w-36'
                    />
                </div>

                {/* Navigation Links */}
                <div className="flex space-x-4">
                    <a href="/user-content" className="text-indigo-600 hover:text-indigo-800 text-xl">
                        Home
                    </a>
                    <a href="#" className="text-indigo-600 hover:text-indigo-800 text-xl">
                        Countries
                    </a>
                </div>
            </div>

            {/* Right side: Search and Profile */}
            <div className="flex items-center space-x-8">
                {/* Search Bar */}
                <div className="relative w-[8in] mx-7">
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search Countries..."
                        className="w-full text-gray-500 border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        className="absolute right-[2px] top-1/2 transform -translate-y-1/2 text-white bg-indigo-600 hover:bg-indigo-800 rounded-lg p-1.5 cursor-pointer"
                        onClick={() => setIsSearchExpanded(false)}
                    >
                        <IoSearch size={25} />
                    </button>
                </div>

                {/* Profile Icon */}
                <div className="cursor-pointer" onClick={OpenProfile}>
                    <FaUser className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200" size={30} />
                </div>
                {openProfile && (
                        <Profile closePopup={setOpenProfile} />
                )}

                {/* Logout Icon */}
                <div className="cursor-pointer" onClick={handleLogout}>
                    <MdLogout className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200" size={30} />
                </div>
            </div>
        </nav>
    );
}