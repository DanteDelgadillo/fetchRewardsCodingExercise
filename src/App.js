import React, { useState, useEffect } from 'react';
import axios from "axios"
import './App.css';

function App() {
  const [data, setData] = useState([])


  // Fetching data from https://fetch-hiring.s3.amazonaws.com/hiring.json
  useEffect(() => {
    async function fetchData() {
      // ****** ened up using  https://cors-anywhere.herokuapp.com to bypass cors *******
      const request = await axios.get("https://cors-anywhere.herokuapp.com/https://fetch-hiring.s3.amazonaws.com/hiring.json");
      setData(request.data)
      return request.data
    }
    fetchData()
  }, [])

  // ************* filted data here ***********
  const newArray = data.filter(item => item.name !== "");
  const secondArray = newArray.filter(items => items.name !== null);
  const sortArray = secondArray.sort(function (a, b) { return a.listId - b.listId });
  return (

    <div className="tableDiv">
      <table className="table">
        <tbody>
          <tr>
            <th>ListId</th>
            <th>Name</th>
          </tr>
          {/* map data */}
          {sortArray.map((item, i) => (
            <tr key={i}>
              <td>{item.listId}</td>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;