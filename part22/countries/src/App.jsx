import { useState, useEffect } from 'react'
import countryService from './services/country.js'
import CountriesList from './components/CountriesList.jsx'
import CountryDetail from './components/CountryDetail.jsx'
import Weather from './components/Weather.jsx'

function App() {
  const [countryName, setCountryName] = useState('')
  const [countryList, setCountryList] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  useEffect(() => {
    countryService
      .getAll()
      .then(countries => {
        setCountryList(countries)
      })
  }, [])

  const handleCountryChange = (event) => {
    const newCountryName = event.target.value.toLowerCase()
    setCountryName(newCountryName)
    const inputFilteredCountries = countryList.filter(country => 
      country.name.common.toLowerCase().startsWith(newCountryName))
    setFilteredCountries(inputFilteredCountries)
  }
  const handleShow = (event) => {
    const selectedCountry = event.target.name.toLowerCase()
    setCountryName(selectedCountry)
    const inputFilteredCountries = countryList.filter(country => 
      country.name.common.toLowerCase() === selectedCountry)
    setFilteredCountries(inputFilteredCountries)
  }
  console.log(countryList)
  return (
    <>
      <div>
        <label>find countries</label>
        <input onChange={handleCountryChange} value={countryName}></input>
      </div>
      <div>
        {
          filteredCountries.length > 10 
           ? <p>Too many matches, specify another filter</p>
           : filteredCountries.length === 1
              ? (
                <div>
                  <CountryDetail country={filteredCountries[0]}/>
                  <Weather country={filteredCountries[0]}/>
                </div>
              )
              : <CountriesList countryList={filteredCountries} handleShow={handleShow}/>
        }
      </div>
    </>
  )
}

export default App
