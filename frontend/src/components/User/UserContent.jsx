import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import FilterTab from './FilterTab';
import Footer from './Footer';

export default function UserContent() {
    const [data, setData] = useState([]); // All countries data
    const [filteredData, setFilteredData] = useState([]); // Filtered countries based on regions
    const [sortedData, setSortedData] = useState([]); // Sorted and paginated data
    const [sortOrder, setSortOrder] = useState("a-z");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 30;

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get("https://restcountries.com/v3.1/all");
                const sorted = response.data.sort((a, b) => a.name.common.localeCompare(b.name.common));
                setData(sorted);
                setFilteredData(sorted); // Initially, show all countries
                setSortedData(sorted.slice(0, itemsPerPage)); // Display only the first 30 countries
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };

        fetchCountries();
    }, []);

    const handleRegionChange = (selectedRegions) => {
        if (selectedRegions.length === 0) {
            setFilteredData(data); // If no regions are selected, show all countries
        } else {
            const filtered = data.filter(country =>
                selectedRegions.some(region => country.continents.includes(region))
            );
            setFilteredData(filtered);
        }
        setCurrentPage(1); // Reset to the first page
    };

    const handleSortChange = (e) => {
        const order = e.target.value;
        setSortOrder(order);

        let sorted = [...filteredData];
        if (order === "a-z") {
            sorted.sort((a, b) => a.name.common.localeCompare(b.name.common));
        } else if (order === "z-a") {
            sorted.sort((a, b) => b.name.common.localeCompare(a.name.common));
        }

        setFilteredData(sorted);
        setCurrentPage(1); // Reset to the first page
        setSortedData(sorted.slice(0, itemsPerPage)); // Update to show only the first 30 countries
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
            <div className='flex justify-between gap-x-5 pt-10'>
                <div className='w-1/4'>
                    <FilterTab onRegionChange={handleRegionChange} />
                </div>
                <div className='w-3/4'>
                    <div className='flex justify-between mb-5'>
                        <p>Showing {itemsPerPage} results on page {currentPage} of {totalPages}</p>
                        <div>
                            <select
                                className='w-full border border-gray-300 rounded ps-3 pe-20 py-1'
                                value={sortOrder}
                                onChange={handleSortChange}
                            >
                                <option value="a-z">Sorted from A-Z</option>
                                <option value="z-a">Sorted from Z-A</option>
                            </select>
                        </div>
                    </div>
                    <div className='grid grid-cols-3 gap-4'>
                        {sortedData.map((country, index) => (
                            <div key={index} className='bg-white p-4 rounded shadow-md'>
                                <h2 className='text-xl font-bold'>{country.name.common}</h2>
                                <p className='text-gray-700'>{country.name.official}</p>
                                <img src={country.flags.png} alt="" className='w-32 h-32 object-cover mt-2' />
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-center mt-5'>
                        {currentPage > 1 && (
                            <button
                                className='px-3 py-1 mx-1 border rounded bg-blue-500 text-white'
                                onClick={handlePreviousPage}
                            >
                                Back
                            </button>
                        )}
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                className={`px-3 py-1 mx-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-black'
                                    }`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                        {currentPage < totalPages && (
                            <button
                                className='px-3 py-1 mx-1 border rounded bg-blue-500 text-white'
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