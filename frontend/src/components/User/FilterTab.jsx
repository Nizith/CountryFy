import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function FilterTab({ onRegionChange }) {
    const [data, setData] = useState([]);
    const [selectedRegions, setSelectedRegions] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get("https://restcountries.com/v3.1/all");
                const countries = response.data;
                // Extract and deduplicate region names
                const regions = [...new Set(countries.flatMap(country => country.continents))];
                setData(regions);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };
        fetchCountries();
    }, []);

    const toggleRegionSelection = (region) => {
        const isSelected = selectedRegions.includes(region);
        let updatedRegions;
        
        if (isSelected) {
            // Remove region from selection
            updatedRegions = selectedRegions.filter(r => r !== region);
        } else {
            // Add region to selection
            updatedRegions = [...selectedRegions, region];
        }
        
        setSelectedRegions(updatedRegions);
        onRegionChange(updatedRegions); // Notify parent
    };

    return (
        <div className="bg-white w-full py-4 px-6 rounded-lg border-2 border-gray-300 text-gray-800">
            <div className="flex justify-between items-center gap-2">
                {data.map((region, index) => {
                    const isSelected = selectedRegions.includes(region);
                    
                    return (
                        <div 
                            key={index}
                            className={`
                                cursor-pointer rounded-full px-10 py-1 transition-all
                                ${isSelected 
                                    ? 'bg-indigo-800 text-indigo-200 font-medium' 
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                }
                            `}
                            onClick={() => toggleRegionSelection(region)}
                        >
                            <div className={`${isSelected ? 'inline-flex pt-1' : ''}`}>
                                <span>{region}</span>
                                {isSelected && (
                                    <span className="ml-2 text-xl text-indigo-200">×</span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}