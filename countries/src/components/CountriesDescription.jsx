import { v4 as uuidv4 } from 'uuid';

const CountriesDescription = ({ counties, setCountry }) => {
  return (
    <div>
      {counties.map((country) => {
        if (country?.name?.common) {
          return (
            <p key={uuidv4()}>
              {country.name.common}
              <button onClick={() => setCountry(country.name.common)}>
                show
              </button>
            </p>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default CountriesDescription;
