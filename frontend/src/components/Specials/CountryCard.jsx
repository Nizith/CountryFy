import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CountryCard({ commonName, officialName, flagUrl, countryData }) {
    const navigate = useNavigate();

    const handleViewMore = () => {
        navigate(`/country-code/${countryData.cca3}`);
    };

    return (
        <motion.div
            className='bg-white p-4 border-2 border-gray-300 rounded-lg hover:bg-indigo-50 hover:border-indigo-500 cursor-pointer'
            onClick={handleViewMore}
            initial={{ y: 0, scale: 1 }} // Initial position and scale
            animate={{ y: 0, scale: 1 }} // Default position and scale when not hovered
            whileHover={{
                scale: [1, 1.06, 1.03, 1.05], // Keyframes for scaling
                transition: {
                    duration: 0.45, // Total duration of the animation
                    ease: "easeOut", // Smooth ease-out effect
                },
            }}
        >
            <h2 className='text-xl font-bold'>{commonName}</h2>
            <p className='text-gray-700 text-sm'>{officialName}</p>
            <img src={flagUrl} alt={`${commonName} flag`} className='w-full h-32 object-cover mt-2 border border-gray-300 rounded-md' />
        </motion.div>
    );
}