const Weather = ({ capital, countryWeather }) => {
  if (countryWeather === null) {
    return;
  }
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>Temperature {countryWeather.main.temp} Celcius</p>
      {countryWeather?.weather[0]?.icon && (
        <img
          src={`https://openweathermap.org/img/wn/${countryWeather.weather[0].icon}@2x.png`}
          alt="Weather icon"
        />
      )}
      <p>Wind: {countryWeather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
