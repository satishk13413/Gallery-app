import React, { useState } from "react";
import "./styles.css";
import Gallery from "./Gallery.js";
import axios from "axios";

const apiKey = "636e1481b4f3c446d26b8eb6ebfe7127";
console.log(apiKey);
function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const changeHandler = (e) => {
    setSearch(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(search);
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${search}&per_page=24&format=json&nojsoncallback=1`
      )
      .then((response) => setData(response.data.photos.photo));
  };

  return (
    <div className="App">
      <h1>Gallery App</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="search images"
          onChange={changeHandler}
          value={search}
        />{" "}
        <br /> <br />
        <input type="submit" name="Search" />
      </form>
      <br />
      <br />
      {data.length >= 1 ? <Gallery data={data} /> : <h4>Data not found</h4>}
    </div>
  );
}
export default App;
