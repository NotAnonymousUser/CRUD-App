import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateForm() {
  const [ID, setID] = useState("");
  const [date, setDate] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [amount, setAmount] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/create", {
        ID,
        date,
        customerID,
        amount,
      });

      console.log(response.data);

      // Redirect to the home page after successful creation
      navigate("/home");
    } catch (error) {
      console.error(error);
      alert("An error occurred while creating the data.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full px-8 py-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-white mb-6 text-center ">
          Create New Data
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="ID"
              className="block text-gray-400 text-sm font-semibold mb-2"
            >
              ID
            </label>
            <input
              type="number"
              id="id"
              name="id"
              className="w-full px-3 py-2 text-white bg-gray-700 rounded"
              value={ID}
              onChange={(e) => setID(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-gray-400 text-sm font-semibold mb-2"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="w-full px-3 py-2 text-white bg-gray-700 rounded"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="customerID"
              className="block text-gray-400 text-sm font-semibold mb-2"
            >
              Customer ID
            </label>
            <input
              type="number"
              id="customerID"
              name="customerID"
              className="w-full px-3 py-2 text-white bg-gray-700 rounded"
              value={customerID}
              onChange={(e) => setCustomerID(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-gray-400 text-sm font-semibold mb-2"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              className="w-full px-3 py-2 text-white bg-gray-700 rounded"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 "
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateForm;
