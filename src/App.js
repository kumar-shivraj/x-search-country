import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);

  const getCountriesData = async () => {
    try {
      const data = await fetch("https://restcountries.com/v3.1/all");
      const res = await data.json();
      console.log(res);
      setCountries(res);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getCountriesData();
  }, []);

  const imageStyle = {
    width: "100px",
    height: "100px",
  };
  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const cardStyle = {
    width: "200px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    margin: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const searchContainer={
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 0'
  }

  const searchField={
    width: '40%',
    padding: '10px'
  }

  const [search, setSearch]=useState('');


  return (
    <div>
      <div style={searchContainer}>
        <input type="text" style={searchField} placeholder="search country name" value={search} onChange={(e)=>setSearch(e.target.value)} />
      </div>
      <div style={containerStyle}>
        {countries.filter((item)=>{
          return search.toLowerCase()===''
            ? item 
            : item.name.common.toLowerCase().includes(search)
        }).map((country) => (
          <div key={country.cca3} style={cardStyle}>
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              style={imageStyle}
            />
            <h2>{country.name.common}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
