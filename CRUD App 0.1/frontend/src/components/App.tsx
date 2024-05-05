import { useEffect, useState } from "react";
import axios from "axios";

// const createServer = axios.create({
//   baseURL: "http://localhost:3500",
// });

function App() {
  const [query, showQuery] = useState([]);
  const [update, updateQuery] = useState([]);

  //the following was used earlier when the page was refreshed to get the data automatically

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/api/sql")
  //     .then((response) => {
  //       showQuery(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // });

  const runQuery = () => {
    query.map((result, index) => {
      console.log(Object.keys(result));
      console.log(Object.values(result));
      console.log(result);
      console.log(result.OID);
      console.log(result.DATE);
      console.log(result.CUSTOMER_ID);
      console.log(result.AMOUNT);
    });
  };

  const fetchDataSelect = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/updt");
      showQuery(response.data);
      runQuery();
    } catch (error) {
      console.error(error);
    }
  };
  const fetchDataUpdate = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/updt");
      showQuery(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchDataDelete = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/updt");
      showQuery(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    window.history.pushState("", "", "/");
    window.location.reload();
  };

  //button related functions are below :

  const getDataClick = async () => {
    await fetchDataSelect();
  };
  const editDataClick = async () => {
    await fetchDataUpdate();
  };
  const deleteDataClick = async () => {
    await fetchDataDelete();
  };

  return (
    <>
      <div className="bg-gray-900 text-white p-4 ">
        <h2 className="text-2xl font-bold mb-2 text-center ">
          Welcome to Admin Homepage
        </h2>
        <h6 className="text-base hidden ">Row Data Received: {query.length}</h6>
        <button
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm font-mono"
          onClick={getDataClick}
        >
          Get Data
        </button>
        <button
          className="float-right bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm font-mono"
          onClick={handleLogout}
        >
          Logout
        </button>
        {/* <div className="mt-4">
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
        </div> */}
      </div>
      <div className="bg-gray-800 p-4 font-mono ">
        <table className="w-full">
          <thead>
            <tr>
              <td className="text-left text-gray-400">Sr.No </td>
              <td className="text-left text-gray-400">ID </td>
              <td className="text-left text-gray-400">Date </td>
              <td className="text-left text-gray-400"> Customer ID</td>
              <td className="text-left text-gray-400">Amount </td>
              <td className="text-left text-gray-400 float-right ">Actions </td>
            </tr>
          </thead>
          <tbody>
            {query.map((result, index) => (
              <tr key={index} className="border-t border-gray-700 text-white">
                <td className="py-2">{index + 1}</td>
                <td className="py-2">{result.OID}</td>
                <td className="py-2">{result.DATE}</td>
                <td className="py-2">{result.CUSTOMER_ID}</td>
                <td className="py-2">{result.AMOUNT}</td>
                <td>
                  <button
                    className="mt-1.5 float-right bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm font-mono"
                    onClick={() => deleteDataClick()}
                  >
                    Delete
                  </button>
                  <button
                    className="mt-1.5 float-right bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm font-mono"
                    onClick={() => editDataClick()}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
