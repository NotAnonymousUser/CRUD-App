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
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <>
      <h1>SQL Query Data</h1>
      <p>Row Data Recieved :{query.length}</p>

      {query.map((result) => (
        <div key={result[0]}>
          <table className="table table-hover">
            <thead>
              <tr>
                <td>Id</td>
                <td>Date</td>
                <td>Customer ID</td>
                <td>Amount</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{result.OID}</td>
                <td>{result.DATE}</td>
                <td>{result.CUSTOMER_ID}</td>
                <td>{result.AMOUNT}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </>
  );
}

export default App;
