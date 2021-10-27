import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Countries from './components/Countries';

const App = () => {
  const [term, setTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  console.log(term)
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
      })

  }, []);

  const handleFilterInput = (event) => {
    const value = event.target.value.toLowerCase();
    setTerm(value);
    setFilteredCountries(countries.filter((country) => country.name.common.toLowerCase().includes(value)));
  }


  return (
    <div>
      <Filter term={term} onChange={handleFilterInput} />

      <Countries filteredCountries={filteredCountries} setTerm={setTerm} setFilteredCountries={setFilteredCountries}/>

    </div>
  );
}

export default App;
