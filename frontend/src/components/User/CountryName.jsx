import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SiOpenstreetmap } from "react-icons/si";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Countryname() {
    const { name: code } = useParams(); // Get the country code from the URL
    const [countryData, setCountryData] = useState(null);

    useEffect(() => {
        const fetchCountryData = async () => {
            try {
                const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch country data');
                }
                const [data] = await response.json();
                setCountryData(data);
            } catch (error) {
                console.error('Error fetching country data:', error);
            }
        };

        fetchCountryData();
    }, [code]);

    if (!countryData) {
        return <p className="text-center text-gray-500 mt-10">Loading country data...</p>;
    }
    
    const InfoCard = ({ title, children }) => (
        <div className="bg-white rounded-2xl border-2 border-gray-300 p-6 space-y-2">
            <h3 className="text-xl font-semibold text-indigo-800 mb-2">{title}</h3>
            <div className="text-gray-700 text-sm">{children}</div>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row gap-6 items-center">
                <img
                    src={countryData.flags.png}
                    alt={countryData.flags.alt || `${countryData.name.common} flag`}
                    className="w-full md:w-1/2 rounded-xl"
                />
                <div className="text-center md:text-left space-y-2">
                    <h1 className="text-4xl font-bold text-gray-900">{countryData.name.common}</h1>
                    <p className="text-gray-600"><strong>Official Name:</strong> {countryData.name.official}</p>
                </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoCard title="General Info">
                    <p><strong>Capital:</strong> {countryData.capital?.join(', ') || 'N/A'}</p>
                    <p><strong>Population:</strong> {countryData.population.toLocaleString()}</p>
                    <p><strong>Languages:</strong> {countryData.languages ? Object.values(countryData.languages).join(', ') : 'N/A'}</p>
                    <p><strong>Region:</strong> {countryData.region}</p>
                    <p><strong>Subregion:</strong> {countryData.subregion}</p>
                    <p><strong>Continent:</strong> {countryData.continents?.join(', ')}</p>
                </InfoCard>

                <InfoCard title="Geography">
                    <p><strong>Area:</strong> {countryData.area.toLocaleString()} km²</p>
                    <p><strong>Borders:</strong> {countryData.borders ? countryData.borders.join(', ') : 'None'}</p>
                    <p><strong>Timezones:</strong> {countryData.timezones?.join(', ')}</p>
                    <p><strong>Latitude/Longitude:</strong> {countryData.latlng?.join(', ')}</p>
                    <p><strong>Landlocked:</strong> {countryData.landlocked ? 'Yes' : 'No'}</p>
                    <p><strong>Start of Week:</strong> {countryData.startOfWeek}</p>
                </InfoCard>

                <InfoCard title="Government & Codes">
                    <p><strong>UN Member:</strong> {countryData.unMember ? 'Yes' : 'No'}</p>
                    <p><strong>Independent:</strong> {countryData.independent ? 'Yes' : 'No'}</p>
                    <p><strong>Top-Level Domain:</strong> {countryData.tld?.join(', ')}</p>
                    <p><strong>Calling Code:</strong> {countryData.idd?.root}{countryData.idd?.suffixes?.join(', ')}</p>
                    <p><strong>FIFA Code:</strong> {countryData.fifa || 'N/A'}</p>
                    <p><strong>Driving Side:</strong> {countryData.car?.side || 'N/A'}</p>
                    <p><strong>Gini Index:</strong> {countryData.gini ? `${Object.values(countryData.gini)[0]}%` : 'N/A'}</p>
                    <p><strong>Postal Format:</strong> {countryData.postalCode?.format || 'N/A'}</p>
                </InfoCard>

                <InfoCard title="Maps & Links">
                    <p>
                        <strong>Google Maps:</strong>{' '}
                        <a href={countryData.maps?.googleMaps} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline inline-flex gap-x-1">
                            View <FaMapMarkerAlt />
                        </a>
                    </p>
                    <p>
                        <strong>OpenStreetMap:</strong>{' '}
                        <a href={countryData.maps?.openStreetMaps} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline inline-flex gap-x-1">
                            View <SiOpenstreetmap className='bg-re-600 mt-[1px]' />
                        </a>
                    </p>
                    <p><strong>Alt Spellings:</strong> {countryData.altSpellings?.join(', ')}</p>

                    <div className="flex items-center gap-6 mt-1">
                        {countryData.coatOfArms?.png && (
                            <div className="text-center">
                                <img src={countryData.coatOfArms.png} alt="Coat of Arms" className="w-20 h-20 object-contain mx-auto" />
                                <p className="text-xs text-gray-500">Coat of Arms</p>
                            </div>
                        )}
                        {countryData.flag && (
                            <div className="text-center">
                                <p className="text-4xl">{countryData.flag}</p>
                                <p className="text-xs text-gray-500">Flag Emoji</p>
                            </div>
                        )}
                    </div>
                </InfoCard>
            </div>


        </div>
    );
}
