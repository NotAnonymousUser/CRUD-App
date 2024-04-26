import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [query, showQuery] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/sql")
      .then((response) => {
        showQuery(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <>
      <h2>SQL Query Data</h2>
      <h6>Row Data Recieved :{query.length}</h6>
      <div>
        <form action="/query" method="get" name="SQL">
          <label htmlFor="query">Write your SQL Query here:</label>
          <br />
          <input type="text" />
          <input type="submit" value="Run" />
        </form>
      </div>
      <br />
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <td>ID</td>
              <td>Date</td>
              <td>Customer ID</td>
              <td>Amount</td>
            </tr>
          </thead>
          <tbody>
            {query.map((result) => (
              <>
                <div key={result[0]}></div>
                <tr>
                  <td>{result.OID}</td>
                  <td>{result.DATE}</td>
                  <td>{result.CUSTOMER_ID}</td>
                  <td>{result.AMOUNT}</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
