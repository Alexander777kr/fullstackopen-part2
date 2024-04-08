import { v4 as uuidv4 } from 'uuid';

const CountryDescription = ({ country }) => {
  return (
    <div>
      <h1>{country?.name?.common || 'No name'}</h1>
      <p>Capital: {country?.capital[0] || 'No capital'}</p>
      <p>Area: {country?.area || 'unknown'}</p>
      <h2>Languages</h2>
      <ul>
        {typeof country?.languages === 'object' ? (
          Object.values(country.languages).map((country) => {
            return <li key={uuidv4()}>{country}</li>;
          })
        ) : (
          <li>unknown</li>
        )}
      </ul>
      {country?.flags?.png && (
        <img src={country.flags.png} alt="Flag country" />
      )}
    </div>
  );
};

export default CountryDescription;
