import mssql from "mssql";
import express from "express";
import cors from "cors";
const app = express();
const port = 3000;
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
const iD = "";
const date = "";
const customer = "";
const amount = "";
const selectcommand = "select * from orders";
let updateCommand = `UPDATE ORDERS SET AMOUNT = ${amount} WHERE CUSTOMER_ID = ${customer}`;
// async function connection() {}
async function Query() {
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
            const updtresult = await connection.request().query();
            app.put("/api/updt", (req, res) => {
                res.send(updtresult.recordset);
            });
            const selectresult1 = await connection
                .request()
                .query("select * from orders");
            app.get("/api/updt", (req, res) => {
                res.send(selectresult1.recordset);
            });
        }
        async function deleteDataAndSend() {
            const delresult = await connection
                .request()
                .query("DELETE FROM ORDERS WHERE AMOUNT = 1057");
            app.delete("/api/updt", (req, res) => {
                res.send(updtresult.recordset);
                console.log(`data deleted`);
            });
            const updtresult = await connection
                .request()
                .query("select * from orders");
            app.get("/api/edit", (req, res) => {
                console.log(updtresult.recordset);
                res.send(updtresult.recordset);
            });
            const selectresult1 = await connection
                .request()
                .query("select * from orders");
            app.get("/api/updt", (req, res) => {
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
        app.post("/api/edit", (req, res) => {
            res.send(`<h1>this is running<h1>`);
        });
        app.listen(port, () => {
            console.log(`\nVisit http://localhost:${port} in your browser.`);
        });
        // app.listen(5173, () => {
        //   console.log(`\nVisit http://localhost:5173 in your browser.`);
        // });
    }
    catch (err) {
        console.error("Error:", err);
    }
}
Query();
