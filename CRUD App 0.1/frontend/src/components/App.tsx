import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [query, showQuery] = useState([]);
  const [update, updateQuery] = useState([]);
  const [del, delData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);

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

  useEffect(() => {
    fetchDataSelect();
  }, []);

  const fetchDataSelect = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/sql");

      showQuery(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDataUpdate = async (
    // item: { OID: any; DATE: any; CUSTOMER_ID: any; AMOUNT: any } | undefined
    updatedItem:
      | { OID: any; DATE: any; CUSTOMER_ID: any; AMOUNT: any }
      | undefined
  ) => {
    try {
      // if (item?.OID > 0) {
      // const data = {
      //   id: item?.OID,
      //   date: item?.DATE,
      //   customer: item?.CUSTOMER_ID,
      //   amount: item?.AMOUNT,
      // };
      // }
      const response = await axios.post(
        "http://localhost:3000/api/update",
        updatedItem
      );
      updateQuery(response.data);
      setEditingRow(null);
      console.log(update);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (index: any) => {
    setEditingRow(index);
  };

  const handleSave = (updatedItem: any) => {
    fetchDataUpdate(updatedItem);
  };

  const fetchDataDelete = async (
    item: { OID: any; DATE: any; CUSTOMER_ID: any; AMOUNT: any } | undefined
  ) => {
    try {
      const data = {
        id: item?.OID,
        date: item?.DATE,
        customer: item?.CUSTOMER_ID,
        amount: item?.AMOUNT,
      };
      // const response = await axios.delete("http://localhost:3000/api/delete", {
      //   data,
      // });
      // showQuery(response.data);

      // Filter out the selected row from the query state
      const filteredQuery = query.filter((row) => row.OID !== item?.OID);

      // Update the state with the filtered data
      showQuery(filteredQuery);


// FOR DEBUGGING OR CHECKING IF DELETE IS WORKING OR NOT

      // if (item) {
      //   console.log(filteredQuery);
      //   console.log(`row data deleted`);
      // }

      const deleteData = await axios.delete("http://localhost:3000/api/delete", {
        data
      });

      delData(deleteData.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    window.history.pushState("", "", "/");
    window.location.reload();
  };
  const handleCreateForm = async () => {
    window.history.pushState("", "", "/new");
    window.location.reload();
  };

  //button related functions are below :

  const getDataClick = async () => {
    await fetchDataSelect();
  };
  // const editDataClick = async (
  //   item: { OID: any; DATE: any; CUSTOMER_ID: any; AMOUNT: any } | undefined
  // ) => {
  //   await fetchDataUpdate(item);
  // };
  const deleteDataClick = async (
    item: { OID: any; DATE: any; CUSTOMER_ID: any; AMOUNT: any } | undefined
  ) => {
    await fetchDataDelete(item);
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
        <button
          className="text-center bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm font-mono"
          onClick={handleCreateForm}
        >
          New
        </button>
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
            {query &&
              query.map &&
              query.map((item, index) => (
                <tr key={index} className="border-t border-gray-700 text-white">
                  <td className="py-2">{index + 1}</td>
                  <td className="py-2">{item.OID}</td>
                  <td className="py-2">{item.DATE}</td>
                  <td className="py-2">{item.CUSTOMER_ID}</td>
                  <td className="py-2">
                    {editingRow === index ? (
                      <input
                        className="text-black"
                        type="text"
                        value={item.AMOUNT}
                        onChange={(e) => {
                          const updatedItem = {
                            ...item,
                            AMOUNT: e.target.value,
                          };
                          showQuery((prevQuery) => {
                            const updatedQuery = [...prevQuery];
                            updatedQuery[index] = updatedItem;
                            // console.log(updateQuery);
                            console.log(updatedItem);
                            return updatedQuery;
                          });
                        }}
                      />
                    ) : (
                      item.AMOUNT
                    )}
                  </td>
                  <td>
                    {editingRow === index ? (
                      <button
                        onClick={() => handleSave(item)}
                        className="mt-1.5 float-right bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-sm font-mono"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(index)}
                        className="mt-1.5 float-right bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm font-mono"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      className="mt-1.5 float-right bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm font-mono"
                      onClick={() => deleteDataClick(item)}
                    >
                      Delete
                    </button>
                    {/* <button
                      className="mt-1.5 float-right bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm font-mono"
                      onClick={() => editDataClick(item)}
                    >
                      Edit
                    </button> */}
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
