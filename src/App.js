import { useEffect, useState } from "react";
// import "./App.css";
import "./styles.css";

function App() {
  const [countries, setCountries] = useState([]);

  const getCountriesData = async () => {
    try {
      const data = await fetch("https://restcountries.com/v3.1/all");
      const res = await data.json();
      // console.log(res);
      setCountries(res);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getCountriesData();
  }, []);


  const [search, setSearch] = useState("");

  return (
    <div>
      <div className="searchContainer">
        <input
          type="text"
          className="searchField"
          placeholder="search country name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>


      <div className="containerStyle">
        {countries
          .filter((item) => {
            return search.toLowerCase() === ""
              ? item
              : item.name.common.toLowerCase().includes(search);
          })
          .map((country) => (
            <div key={country.cca3} className="countryCard">
              <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                className="imageStyle"
              />
              <h2>{country.name.common}</h2>
            </div>
          ))}
      </div>


    </div>
  );
}

export default App;
