import React, { useEffect, useState } from 'react';
import FilterTab from './FilterTab';
import axios from 'axios';
import CountryCard from '../Specials/CountryCard';

export default function Independants() {
    const [independentCountries, setIndependentCountries] = useState([]);
    const [filteredData, setFilteredData] = useState([]); // Filtered countries based on regions
    const [sortedData, setSortedData] = useState([]); // Paginated data for the current page
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 30;

    useEffect(() => {
        const fetchIndependentCountries = async () => {
            try {
                const response = await axios.get("https://restcountries.com/v3.1/independent?status=true");
                const sorted = response.data.sort((a, b) => a.name.common.localeCompare(b.name.common));
                setIndependentCountries(sorted);
                setFilteredData(sorted); // Initially, show all independent countries
                setSortedData(sorted.slice(0, itemsPerPage)); // Display only the first page
            } catch (error) {
                console.error("Error fetching independent countries:", error);
            }
        };

        fetchIndependentCountries();
    }, []);

    const handleRegionChange = (selectedRegions) => {
        if (selectedRegions.length === 0) {
            setFilteredData(independentCountries); // If no regions are selected, show all independent countries
        } else {
            const filtered = independentCountries.filter(country =>
                selectedRegions.some(region => country.continents.includes(region))
            );
            setFilteredData(filtered);
        }
        setCurrentPage(1); // Reset to the first page
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setSortedData(filteredData.slice(startIndex, endIndex));
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    useEffect(() => {
        // Update sorted data whenever filtered data or current page changes
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setSortedData(filteredData.slice(startIndex, endIndex));
    }, [filteredData, currentPage]);

    return (
        <>
            <div className='text-center'>
            <h2 className='mt-5 text-3xl font-semibold underline underline-offset-2 text-indigo-900'>Independant Countries</h2>
            <p className='text-indigo-400'>This will show all the countries wich are Independant</p>
            </div>
            <div className='flex justify-between gap-x-5 pt-10 px-28'>
                <div className='w-1/4'>
                    <FilterTab onRegionChange={handleRegionChange} />
                </div>

                <div className='w-3/4'>
                    <div className='grid grid-cols-3 gap-4'>
                    {sortedData.map((country, index) => (
                        <CountryCard
                            key={index}
                            commonName={country.name.common}
                            officialName={country.name.official}
                            flagUrl={country.flags.png}
                            countryData={country}
                        />
                    ))}
                    </div>
                    <div className='flex justify-center my-5'>
                        {currentPage > 1 && (
                            <button
                                className='px-3 py-1 mx-1 rounded bg-indigo-200 hover:bg-indigo-300 text-indigo-800 border border-indigo-400'
                                onClick={handlePreviousPage}
                            >
                                Back
                            </button>
                        )}
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                className={`px-3 py-1 mx-1 border border-gray-400 rounded ${currentPage === index + 1 ? 'bg-indigo-700 text-white' : 'bg-white text-black'
                                    }`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                        {currentPage < totalPages && (
                            <button
                                className='px-3 py-1 mx-1 rounded bg-indigo-200 hover:bg-indigo-300 text-indigo-800 border border-indigo-400'
                                onClick={handleNextPage}
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}