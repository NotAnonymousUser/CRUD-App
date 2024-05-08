import mssql from "mssql";
import express from "express";
import cors from "cors";
import bodyparser from "body-parser";

const app = express();
const port = 3000;

app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(bodyparser.json());
app.use(cors());

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

const id = "155";
const date = "";
const customer = "1";
const amount = "3000";

const selectcommand = "select * from orders";
let updateCommand = `UPDATE ORDERS SET AMOUNT = ${amount} WHERE CUSTOMER_ID = ${customer}`;
let updateCommand1 = `UPDATE ORDERS SET OID = ${id} WHERE AMOUNT = ${amount}`;
let deleteCommand = `DELETE FROM ORDERS WHERE AMOUNT = ${amount} `;

// async function connection() {}

async function ConnectToDb() {
  try {
    const pool = new mssql.ConnectionPool(config);
    const connection = await pool.connect();

    console.log(`Connected to ${config.database} SQL Database`);

    // Function to fetch and send data
    async function selectDataAndSend() {
      const selectresult = await connection.request().query(`${selectcommand}`);
      app.get("/api/sql", (req, res) => {
        res.send(selectresult.recordset);
      });
    }

    async function updateDataAndSend() {
      app.put("/api/updt", async (req, res) => {
        const updtresult = await connection
          .request()
          .query(
            `UPDATE ORDERS SET AMOUNT = ${req.body.updatedItem.AMOUNT}  WHERE OID = ${req.body.updatedItem.OID} `
          );
        console.log(req.body);
        console.log(`data updated`);

        res.send(updtresult.recordset);
      });

      const selectresult1 = await connection.request().query(selectcommand);
      app.get("/api/updt", (req, res) => {
        console.log(req.body);
        res.send(selectresult1.recordset);
      });
    }
    async function deleteDataAndSend() {
      app.delete("/api/updt", async (req, res) => {
        const delresult = await connection
          .request()
          .query(`DELETE FROM ORDERS WHERE CUSTOMER_ID = ${req.body.id}`);
        res.send(updtresult.recordset);
        console.log(`complete data of ID number ${req.body.id} is deleted`);
      });

      const updtresult = await connection.request().query(selectcommand);
      app.get("/api/edit", (req, res) => {
        console.log(req.body);
        console.log(updtresult.recordset);
        res.send(updtresult.recordset);
      });

      const selectresult1 = await connection.request().query(selectcommand);
      app.get("/api/updt", (req, res) => {
        console.log(req.body);
        res.send(selectresult1.recordset);
      });
    }

    // Call selectDataAndSend initially and schedule it every second

    await selectDataAndSend();
    setInterval(selectDataAndSend, 1000);

    await updateDataAndSend();
    setInterval(updateDataAndSend, 1000);

    await deleteDataAndSend();
    setInterval(deleteDataAndSend, 1000);

    app.get("/", (req, res) => {
      res.send(`<h1>welcome to node js crude app backend server<h1>`);
    });

    // app.post("/api/edit", async (req, res) => {
    //   selectDataAndSend();
    //   console.log(req.body);

    //   res.send(`/api/edit is running`);
    // });

    app.post("/api/update", async (req, res) => {
      try {
        await updateDataAndSend();
        const updtresult = await connection
          .request()
          .query(
            `UPDATE ORDERS SET AMOUNT = ${req.body.AMOUNT}  WHERE OID = ${req.body.OID} `
          );
        console.log(req.body);
        console.log(`data updated`);
        res.send(updtresult.recordset);
        return res.json;
      } catch (error) {
        console.error();
      }
    });

    app.post("/api/delete", async (req, res) => {
      try {
        await updateDataAndSend();
        res.send(`<h1>this is running<h1>`);
        console.log(`delete button is pressed and working`);
        return res.json;
      } catch (error) {
        console.error();
      }
    });

    // app.post("/api/delete", (req, res) => {
    //   res.send(`<h1>this is running<h1>`);
    // });

    app.listen(port, () => {
      console.log(`\nVisit http://localhost:${port} in your browser.`);
    });

    // app.listen(5173, () => {
    //   console.log(`\nVisit http://localhost:5173 in your browser.`);
    // });
  } catch (err) {
    console.error("Error:", err);
  }
}

ConnectToDb();
