import { useState, useEffect } from "react";
import useNavigate from "react-router-dom";

function Login() {
  const initialValues = {
    username: "",
    password: "",
  };
  const [values, setValues] = useState(initialValues);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // let username = "admin";
    // let password = "123";

    if (values.username == "" || values.password == "") {
      alert("please enter both username and password");
    } else if (values.username !== "admin" && values.password !== "123") {
      alert("The username or password is not correct");
    } else if (values.username == "admin" && values.password == "123") {
      alert("You are now logged in");
      setIsLoggedIn(true);
      console.log(isLoggedIn);

      
      // const navigate = useNavigate();

      // useEffect(() => {
      //   // Your condition here

      //   if (isLoggedIn) {
      //     // Change the URL based on the condition
      //     navigate("/home");
      //   }
      // }, [navigate]);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="max-w-md w-full px-8 py-6 bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-white mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-400 text-sm font-semibold mb-2"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="w-full px-3 py-2 text-white bg-gray-700 rounded"
                placeholder="Enter your username"
                value={values.username}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-400 text-sm font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 text-white bg-gray-700 rounded"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 "
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
