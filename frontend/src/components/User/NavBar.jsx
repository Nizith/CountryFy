import React, { useState, useRef, useEffect } from 'react';
import { FaUser } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import CountryLogo from "../../images/CountryLogo.png";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router
import Profile from './Profile';
import Loading from '../Specials/Loading';
import { FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";

export default function NavBar() {
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const searchInputRef = useRef(null);
    const navigate = useNavigate(); // For navigation

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
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setIsSearchExpanded(true);
        setIsLoading(true);
        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${searchQuery}`);
            if (!response.ok) {
                throw new Error('Failed to fetch countries');
            }
            const data = await response.json();

            // Filter countries whose names start with the search query
            const filteredResults = data.filter((country) => {
                const countryName = country.name.common.toLowerCase();
                const searchLower = searchQuery.toLowerCase();
                return countryName.startsWith(searchLower);
            });

            console.log("Filtered countries: ", filteredResults);
            setSearchResults(filteredResults);
        } catch (error) {
            console.error('Error fetching countries:', error);
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Add an event listener for the Enter key
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // Attach the keydown event to the search input
    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            if (searchInputRef.current) {
                searchInputRef.current.removeEventListener('keydown', handleKeyDown);
            }
        };
    }, [searchQuery]);

    return (
        <nav className="border-b-[4px] border-gray-300 px-28 py-3 font-semibold">
            {/* Navbar container */}
            <div className="flex items-center justify-between">
                {/* Left side: Logo and navigation links */}
                <div className="flex items-center space-x-4">
                    {/* Logo */}
                    <div className="text-xl text-indigo-600">
                        <img
                            src={CountryLogo}
                            alt="Logo"
                            className="w-36"
                        />
                    </div>

                    {/* Navigation Links */}
                    <div className="flex space-x-4">
                        <a href="/user-content" className="text-indigo-600 hover:text-indigo-800 text-xl">
                            Home
                        </a>
                        <a href="/Independants" className="text-indigo-600 hover:text-indigo-800 text-xl">
                            Independants
                        </a>
                    </div>
                </div>

                <div className="flex-1 mx-6">
                    <div className="relative">
                        {isFocused && (
                            <div
                                className="fixed w-screen h-screen inset-0"
                                onClick={() => setIsFocused(false)}
                                style={{ backgroundColor: 'rgb(0, 0, 0, 0.5)' }}
                            ></div>
                        )}
                        <motion.div
                            className="relative w-full"
                            initial={{ y: 0, opacity: 1 }} // Start at the default position
                            animate={isFocused ? { y: 70, opacity: 1 } : { y: 0, opacity: 1 }} // Animate downward when focused
                            transition={{ type: "spring", stiffness: 200, damping: 20 }} // Smooth animation
                        >
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search Countries..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsFocused(true)} // Trigger animation on focus
                                onBlur={(e) => {
                                    // Check if the blur event is caused by clicking inside the search results
                                    if (!e.relatedTarget || !e.relatedTarget.closest('.search-results')) {
                                        setIsFocused(false);
                                    }
                                }}
                                className="w-full bg-white text-gray-500 border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button
                                className="absolute right-[2px] top-1/2 transform -translate-y-1/2 text-white bg-indigo-600 hover:bg-indigo-800 rounded-lg p-1.5 cursor-pointer"
                                onClick={handleSearch}
                            >
                                <IoSearch size={25} />
                            </button>

                            {/* Search Results */}
                            <motion.div
                                className={`absolute w-full bg-gray-50 shadow-lg rounded-lg p-4 max-h-[4in] overflow-y-auto mt-2 border border-gray-300 search-results ${isFocused ? "block" : "hidden"
                                    }`}
                                initial={{ opacity: 0, y: -10 }}
                                animate={isFocused ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            >
                                {isLoading ? (
                                    <div className="flex justify-center items-center">
                                        <Loading />
                                    </div>
                                ) : searchResults.length > 0 ? (
                                    searchResults.map((country, index) => (
                                        <div
                                            key={index}
                                            className="py-2 border-b last:border-none inline-flex justify-between bg-lie-400 w-full"
                                        >
                                            <div className="inline-flex gap-x-5">
                                                <img
                                                    src={country.flags.png}
                                                    alt={country.flags.alt}
                                                    className="w-10 h-6"
                                                />
                                                <p className="text-indigo-600 font-medium">
                                                    {country.name.common}
                                                </p>
                                            </div>
                                            <button
                                                className="font-semibold bg-indigo-200 hover:bg-indigo-300 text-indigo-800 border border-indigo-400 text-sm px-4 py-1 rounded-lg inline-flex cursor-pointer"
                                                onMouseDown={(e) => e.preventDefault()} // Prevent blur when clicking the button
                                                onClick={() => {
                                                    // Navigate to the country page
                                                    navigate(`/country/${country.name.common}`, {
                                                        state: { country },
                                                    });

                                                    // Refresh the page
                                                    window.location.reload();
                                                }}
                                            >
                                                View More
                                                <FiExternalLink className="ms-2 my-auto" />
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No results found</p>
                                )}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Right side: Profile and Logout */}
                <div className="flex items-center space-x-6">
                    {/* Profile Icon */}
                    <div className="cursor-pointer" onClick={OpenProfile}>
                        <FaUser className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200" size={30} />
                    </div>
                    {openProfile && (
                        <Profile closePopup={setOpenProfile} />
                    )}

                    {/* Logout Icon */}
                    <div className="cursor-pointer" onClick={handleLogout}>
                        <MdLogout className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200" size={35} />
                    </div>
                </div>
            </div>
        </nav>
    );
}