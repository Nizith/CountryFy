import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import axios from 'axios';
import FilterTab from './FilterTab';
import Footer from './Footer';

export default function UserContent() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get("https://restcountries.com/v3.1/region/africa");
                console.log("Fetched Data:", response.data); // Logs only the required fields

                setData(response.data)
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };

        fetchCountries();
    }, []);

    return (
        <>
            <div>
                <NavBar />
            </div>
            <div className='flex justify-between gap-x-5 px-28 bg-gray-50 p-4 pt-10'>
                <div className='w-1/4'>
                    <FilterTab />
                </div>
                <div className='w-3/4'>
                    <div className='flex justify-between mb-5'>
                        <p>Showing all the 5 results</p>
                        <div>
                            <select className='w-full border border-gray-300 rounded ps-3 pe-20 py-1'>
                                <option value="">Sort By</option>
                                <option value="asia">Asia</option>
                                <option value="europe">Europe</option>
                                <option value="africa">Africa</option>
                            </select>
                        </div>
                    </div>
                    <div className='grid grid-cols-3 gap-4'>
                        {data.map((country, index) => (
                            <div key={index} className='bg-white p-4 rounded shadow-md'>
                                <h2 className='text-xl font-bold'>{country.name.common}</h2>
                                <p className='text-gray-700'>{country.name.official}</p>
                                <img src={country.flags.png} alt="" className='w-32 h-32 object-cover mt-2' />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}
