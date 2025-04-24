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

    const handleCheckboxChange = (region) => {
        const updatedRegions = selectedRegions.includes(region)
            ? selectedRegions.filter(r => r !== region)
            : [...selectedRegions, region];

        setSelectedRegions(updatedRegions);
        onRegionChange(updatedRegions); // Notify parent about the change
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-gray-300 text-gray-800">
            <h2 className="text-xl font-semibold mb-6">Filter by</h2>

            {/* Category Filter */}
            <div className="mb-4">
                <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">Region</span>
                </div>
                <div className="mt-3 space-y-2">
                    {data.map((region, index) => (
                        <div key={index}>
                            <label className="inline-flex">
                                <input
                                    type="checkbox"
                                    className="mr-2 text-indigo-600"
                                    checked={selectedRegions.includes(region)}
                                    onChange={() => handleCheckboxChange(region)}
                                />
                                <p className={selectedRegions.includes(region) ? "text-indigo-600" : ""}>{region}</p>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}