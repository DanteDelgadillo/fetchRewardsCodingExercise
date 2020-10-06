import React, { useState, useEffect } from 'react';
import axios from "axios"
import Pagination from "./Pagination";
import './App.css';

function App() {
  const [data, setData] = useState([])

  //   ******** pagination   *********
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage] = useState(25)


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

  // // get current post paginate
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = sortArray.slice(indexOfFirstPost, indexOfLastPost);

  // change page
  const paginate = pageNumer => {
    setCurrentPage(pageNumer)
  }


  return (

    <div className="tableDiv">
      <table className="table">
        <tbody>
          <tr>
            <th>ListId</th>
            <th>Name</th>
          </tr>
          {/* map data */}
          {currentPost.map((item, i) => (
            <tr key={i}>
              <td>{item.listId}</td>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr></hr>
      <Pagination
        postPerPage={postPerPage}
        totalPost={sortArray.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;