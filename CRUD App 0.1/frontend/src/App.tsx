import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [query, showQuery] = useState([]);

  useEffect((): any => {
    axios
      .get("/api/sql")
      .then((res: any) => {
        showQuery(res.query);
        console.log(res.query);
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  });

  return (
    <>
      <h1>SQL Query Data</h1>
      <p>Query Data :{query.length}</p>
      <p>{query}</p>

      {query.map((result, index) => {
        <div key={result}></div>;
      })}
    </>
  );
}

export default App;
