import mssql from "mssql";
// import inquirer from "inquirer";
import chalk from "chalk";
import { createSpinner } from "nanospinner";
import express from "express";
import cors from "cors";

const app = express();
const port = 3000;
app.use(cors());

// const sqlQuery = await inquirer.prompt({
//   name: "user",
//   type: "input",
//   message: chalk.yellow("Enter your SQL Query"),
//   prefix: "",
// });

const config = {
  user: "sa",
  password: "Abacus@1",
  server: "PK-KHI-MME-022",
  database: "PracticeDB",
  // port: 1433,
  options: { encrypt: false },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 15000,
  },
};

// async function connectAndQuery() {
//   try {
//     const pool = await mssql.connect(config);

//     const result = await pool.request().query("select * from orders");

//     console.log(`Connected to ${config.database} SQL Database`);

//     console.log("Query results:", result.recordset);

//     app.get("/", (req, res) => {
//       res.send(`<h1>welcome to node js crude app backend server<h1>`);
//     });

//     app.get("/api/sql", (req, res) => {
//       res.send(result.recordset);
//     });

//     app.listen(port, () => {
//       console.log(`\nVisit http://localhost:${port} in your browser.`);
//     });

//   } catch (err) {
//     console.error(chalk.red("Error:", err));
//   }
// }

// connectAndQuery();



async function connectAndQuery() {
  try {
    const pool = await mssql.connect(config);

    console.log(`Connected to ${config.database} SQL Database`);

    // Function to fetch and send data
    async function fetchDataAndSend() {
      const result = await pool.request().query("select * from orders");
      app.get("/api/sql", (req, res) => {
        res.send(result.recordset);
      });
    }

    // Call fetchDataAndSend initially and schedule it every second
    await fetchDataAndSend();
    setInterval(fetchDataAndSend, 1000);

    app.get("/", (req, res) => {
      res.send(`<h1>welcome to node js crude app backend server<h1>`);
    });

    app.listen(port, () => {
      console.log(`\nVisit http://localhost:${port} in your browser.`);
    });
  } catch (err) {
    console.error(chalk.red("Error:", err));
  }
}

connectAndQuery();
