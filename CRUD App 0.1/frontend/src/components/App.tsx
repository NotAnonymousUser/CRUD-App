import { useEffect, useState } from "react";
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
      <div className="bg-gray-900 text-white p-4">
        <h2 className="text-2xl font-bold mb-2">SQL Query Data</h2>
        <h6>Row Data Received: {query.length}</h6>
        <div className="mt-4">
          <form action="/query" method="get" name="SQL" className="mb-4">
            <label htmlFor="query" className="block text-gray-400">
              Write your SQL Query here:
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-gray-800 text-white rounded"
            />
            <input
              type="submit"
              value="Run"
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            />
          </form>
        </div>
      </div>
      <div className="bg-gray-800 p-4 mt-4">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left text-gray-400">ID</th>
              <th className="text-left text-gray-400">Date</th>
              <th className="text-left text-gray-400">Customer ID</th>
              <th className="text-left text-gray-400">Amount</th>
            </tr>
          </thead>
          <tbody>
            {query.map((result) => (
              <tr
                key={result.OID}
                className="border-t border-gray-700 text-gray-400"
              >
                <td className="py-2">{result.OID}</td>
                <td className="py-2">{result.DATE}</td>
                <td className="py-2">{result.CUSTOMER_ID}</td>
                <td className="py-2">{result.AMOUNT}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
