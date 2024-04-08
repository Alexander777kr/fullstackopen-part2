import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Notification from './components/Notification';
import CountryDescription from './components/CountryDescription';
import CountriesDescription from './components/CountriesDescription';
import Weather from './components/Weather';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name';
const api_key = import.meta.env.VITE_WEATHER_KEY;

const App = () => {
  const [inputCountry, setInputCountry] = useState('');
  const [country, setCountry] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [weather, setWeather] = useState(null);
  const timeoutID = useRef(null);

  useEffect(() => {
    setWeather(null);
    if (country == null || Array.isArray(country)) {
      return;
    }
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&units=metric&appid=${api_key}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [country]);

  useEffect(() => {
    if (timeoutID.current !== null) {
      clearTimeout(timeoutID.current);
    }
    setNotificationMessage(null);
    if (inputCountry === '') {
      setCountry(null);
      return;
    }
    axios
      .get(`${baseUrl}/${inputCountry}`)
      .then((response) => {
        setCountry(response.data);
      })
      .catch((error) => {
        setNotificationMessage(error.response.data.error);
        timeoutID.current = setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      });
    return () => {
      clearTimeout(timeoutID.current);
    };
  }, [inputCountry]);

  const changeInputCountry = (e) => {
    setInputCountry(e.target.value);
  };

  return (
    <>
      <Notification message={notificationMessage} />
      <form>
        <label>find countries </label>
        <input value={inputCountry} onChange={changeInputCountry} />
        {country === null ? (
          <p>Please input a country</p>
        ) : Array.isArray(country) ? (
          <CountriesDescription
            countries={country}
            setCountry={setInputCountry}
          />
        ) : (
          <CountryDescription country={country} />
        )}
        {weather && country && (
          <Weather capital={country.capital} countryWeather={weather} />
        )}
      </form>
    </>
  );
};

export default App;
