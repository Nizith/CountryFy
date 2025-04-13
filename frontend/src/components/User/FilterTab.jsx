import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";

export default function FilterTab() {
    const [openSection, setOpenSection] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get("https://restcountries.com/v3.1/all");
                const countries = response.data;

                // Extract and deduplicate region names
                const regions = [...new Set(countries.flatMap(country => country.continents))];
                console.log("Unique Regions:", regions); // Logs the unique region names

                setData(regions);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };

        fetchCountries();
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-gray-800">
            <h2 className="text-xl font-semibold mb-6">Filter by</h2>

            {/* Category Filter */}
            <div className="mb-4">
                <div
                    className="flex justify-between items-center border-b pb-2"
                    onClick={() => toggleSection('category')}
                >
                    <span className="font-medium">Region</span>
                </div>
                <div className="mt-3 space-y-2">
                    {data.map((region, index) => (
                        <div key={index} className=''>
                            <label className="block">
                                <input type="checkbox" className="mr-2" /> {region}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
