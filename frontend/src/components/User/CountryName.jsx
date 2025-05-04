import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SiOpenstreetmap } from "react-icons/si";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function CountryName() {
    const [countryData, setCountryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { name } = useParams();

    useEffect(() => {
        const fetchCountryData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://restcountries.com/v3.1/alpha/${name}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch country data');
                }
                const data = await response.json();
                setCountryData(data);
            } catch (error) {
                console.error('Error fetching country data:', error);
                setError('Failed to fetch country data');
            } finally {
                setLoading(false);
            }
        };

        fetchCountryData();
    }, [name]);

    if (loading) {
        return <p className="text-center text-gray-500 mt-10">Loading country data...</p>;
    }

    if (error) {
        return <p className="text-center text-red-600 mt-10">{error}</p>;
    }
    
    const InfoCard = ({ title, children }) => (
        <div className="bg-white rounded-2xl border-2 border-gray-300 p-6 space-y-2">
            <h3 className="text-xl font-semibold text-indigo-800 mb-2">{title}</h3>
            <div className="text-gray-700 text-sm">{children}</div>
        </div>
    );

    const country = countryData[0]; // Access the first element of the array

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row gap-6 items-center">
                <img
                    src={country.flags.png}
                    alt={country.flags.alt || `${country.name.common} flag`}
                    className="w-full md:w-1/2 rounded-xl"
                />
                <div className="text-center md:text-left space-y-2">
                    <h1 className="text-4xl font-bold text-gray-900">{country.name.common}</h1>
                    <p className="text-gray-600"><strong>Official Name:</strong> {country.name.official}</p>
                </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoCard title="General Info">
                    <p><strong>Capital:</strong> {country.capital?.join(', ') || 'N/A'}</p>
                    <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                    <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
                    <p><strong>Region:</strong> {country.region}</p>
                    <p><strong>Subregion:</strong> {country.subregion}</p>
                    <p><strong>Continent:</strong> {country.continents?.join(', ')}</p>
                </InfoCard>

                <InfoCard title="Geography">
                    <p><strong>Area:</strong> {country.area.toLocaleString()} km²</p>
                    <p><strong>Borders:</strong> {country.borders ? country.borders.join(', ') : 'None'}</p>
                    <p><strong>Timezones:</strong> {country.timezones?.join(', ')}</p>
                    <p><strong>Latitude/Longitude:</strong> {country.latlng?.join(', ')}</p>
                    <p><strong>Landlocked:</strong> {country.landlocked ? 'Yes' : 'No'}</p>
                    <p><strong>Start of Week:</strong> {country.startOfWeek}</p>
                </InfoCard>

                <InfoCard title="Government & Codes">
                    <p><strong>UN Member:</strong> {country.unMember ? 'Yes' : 'No'}</p>
                    <p><strong>Independent:</strong> {country.independent ? 'Yes' : 'No'}</p>
                    <p><strong>Top-Level Domain:</strong> {country.tld?.join(', ')}</p>
                    <p><strong>Calling Code:</strong> {country.idd?.root}{country.idd?.suffixes?.join(', ')}</p>
                    <p><strong>FIFA Code:</strong> {country.fifa || 'N/A'}</p>
                    <p><strong>Driving Side:</strong> {country.car?.side || 'N/A'}</p>
                    <p><strong>Gini Index:</strong> {country.gini ? `${Object.values(country.gini)[0]}%` : 'N/A'}</p>
                    <p><strong>Postal Format:</strong> {country.postalCode?.format || 'N/A'}</p>
                </InfoCard>

                <InfoCard title="Maps & Links">
                    <p>
                        <strong>Google Maps:</strong>{' '}
                        <a href={country.maps?.googleMaps} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline inline-flex gap-x-1">
                            View <FaMapMarkerAlt />
                        </a>
                    </p>
                    <p>
                        <strong>OpenStreetMap:</strong>{' '}
                        <a href={country.maps?.openStreetMaps} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline inline-flex gap-x-1">
                            View <SiOpenstreetmap className='bg-re-600 mt-[1px]' />
                        </a>
                    </p>
                    <p><strong>Alt Spellings:</strong> {country.altSpellings?.join(', ')}</p>

                    <div className="flex items-center gap-6 mt-1">
                        {country.coatOfArms?.png && (
                            <div className="text-center">
                                <img src={country.coatOfArms.png} alt="Coat of Arms" className="w-20 h-20 object-contain mx-auto" />
                                <p className="text-xs text-gray-500">Coat of Arms</p>
                            </div>
                        )}
                        {country.flag && (
                            <div className="text-center">
                                <p className="text-4xl">{country.flag}</p>
                                <p className="text-xs text-gray-500">Flag Emoji</p>
                            </div>
                        )}
                    </div>
                </InfoCard>
            </div>


        </div>
    );
}
