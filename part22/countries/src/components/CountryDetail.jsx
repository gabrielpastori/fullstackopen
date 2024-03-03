const CountryDetail = ({ country }) => {
    return (
        <>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital[0]}</p>
            <p>Area {country.area}</p>
            <h3>languages:</h3>
            <ul>
                {
                    Object.entries(country.languages).map(([k, v]) => 
                        <li key={k}>{v}</li>
                    )
                }
            </ul>
            <img src={country.flags.png}/>
        </>
    )

}

export default CountryDetail;