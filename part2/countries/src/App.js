import {useState, useEffect} from 'react'
import axios from 'axios'


const JustOneCountry = ({country}) => {

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <h3>languages</h3>
      <ul>
        {Object.keys(country.languages).map(key => <li key={key}>{country.languages[key]}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.name.common} />
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const hook = () => {
    axios.get("https://restcountries.com/v3.1/all").then( response => {
      setCountries(response.data)
    })
  }
  useEffect(hook, [])

  let filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  

  return (
    <div>
      <div>find countries: <input value={filter} onChange={(e) => setFilter(e.target.value)} /></div>
      {filteredCountries.length === 1 ? <JustOneCountry country={filteredCountries[0]} /> : (filteredCountries.length <= 10 ? filteredCountries.map(country => <div key={country.name.common}>{country.name.common} <button onClick={() => setFilter(country.name.common)}>show</button></div> ) : "Too many matches, specify another filter")}
    </div>
  )
}

export default App