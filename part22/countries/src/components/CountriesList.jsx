const CountriesList = ( {countryList, handleShow} ) => {
    return (
        <div>
            {countryList.map((country) => 
            <p key={country.name.common}>
                {country.name.common}
                <button onClick={handleShow} name={country.name.common}>Show</button>
            </p>
            )}
        </div>
    )
}

export default CountriesList;