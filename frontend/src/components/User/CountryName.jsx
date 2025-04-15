import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Countryname() {
    const location = useLocation();
    const { country } = location.state || {}; // Retrieve the passed country data

    console.log("The country: ", country)
    if (!country) {
        return <p>No country data available</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">{country.name.common}</h1>
            <div className='grid grid-cols-2'>
                <>
                    <img src={country.flags.png} alt={country.flags.alt} className='w-96 h-52'/>
                </>
                <div className='my-auto'>
                    <p><strong>Official Name:</strong> {country.name.official}</p>
                    <p><strong>Region:</strong> {country.region}</p>
                    <p><strong>Subregion:</strong> {country.subregion}</p>
                    <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                    <p><strong>Continent:</strong> {country.continents?.join(', ')}</p>
                    <p><strong>Languages:</strong> {Object.values(country.languages).join(', ')}</p>
                    <p><strong>Capital:</strong> {country.capital?.join(', ')}</p>
                </div>
            </div>
            {/* Add more details as needed */}
            <div>
                <h2 className="text-xl font-bold mt-4">Additional Information</h2>
                <p><strong>Area:</strong> {country.area} km²</p>
                <p><strong>Borders:</strong> {country.borders ? country.borders.join(', ') : 'No borders'}</p>
                <p><strong>Timezones:</strong> {country.timezones.join(', ')}</p>
                <p><strong>Currency:</strong> {Object.values(country.currencies).map(currency => `${currency.name} (${currency.symbol})`).join(', ')}</p>
                <p><strong>Driving Side:</strong> {country.car.side}</p>
                <p><strong>Top-Level Domain:</strong> {country.tld?.join(', ')}</p>
                <p><strong>Independent:</strong> {country.independent ? 'Yes' : 'No'}</p>
                <p><strong>UN Member:</strong> {country.unMember ? 'Yes' : 'No'}</p>
                <p><strong>Calling Code:</strong> {country.idd?.root}{country.idd?.suffixes?.join(', ')}</p>
                <p><strong>Latitude and Longitude:</strong> {country.latlng?.join(', ')}</p>
                <p><strong>Alt Spellings:</strong> {country.altSpellings?.join(', ')}</p>
                <p><strong>Coat of Arms:</strong> <img src={country.coatOfArms?.png} alt="Coat of Arms" className="w-24 h-24 inline-block" /></p>
                <p><strong>Flag Emoji:</strong> {country.flag}</p>
                <p><strong>FIFA Code:</strong> {country.fifa}</p>
                <p><strong>Landlocked:</strong> {country.landlocked ? 'Yes' : 'No'}</p>
                <p><strong>Start of Week:</strong> {country.startOfWeek}</p>
                <p><strong>Postal Code Format:</strong> {country.postalCode?.format}</p>
                <p><strong>Postal Code Regex:</strong> {country.postalCode?.regex}</p>
                <p><strong>Google Maps:</strong> <a href={country.maps?.googleMaps} target="_blank" rel="noopener noreferrer">View on Google Maps</a></p>
                <p><strong>OpenStreetMap:</strong> <a href={country.maps?.openStreetMaps} target="_blank" rel="noopener noreferrer">View on OpenStreetMap</a></p>
                <p><strong>Gini Index:</strong> {country.gini ? `${Object.values(country.gini)[0]}%` : 'N/A'}</p>
            </div>
        </div>
    );
}