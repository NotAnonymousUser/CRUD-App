import mssql from "mssql";
import express from "express";
import cors from "cors";
import bodyparser from "body-parser";
const app = express();
const port = 3000;
app.use(express.json());
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
//DB Connection settings
const pool = new mssql.ConnectionPool(config);
const connection = await pool.connect();
console.log(`Connected to ${config.database} SQL Database`);
// async function ConnectToDb() {
//   try {
//   } catch (err) {
//     console.error("Error:", err);
//   }
//   ConnectToDb();
// Function to fetch and send data
async function selectDataAndSend() {
    try {
        const selectresult = await connection
            .request()
            .query(`select * from orders`);
        app.get("/api/sql", (req, res) => {
            res.send(selectresult.recordset);
        });
    }
    catch (error) {
        console.error();
    }
}
async function updateDataAndSend() {
    try {
        app.put("/api/updt", async (req, res) => {
            const updtresult = await connection
                .request()
                .query(`UPDATE ORDERS SET AMOUNT = ${req.body.updatedItem.AMOUNT}  WHERE OID = ${req.body.updatedItem.OID} `);
            console.log(req.body);
            console.log(`data updated`);
            res.send(updtresult.recordset);
        });
        const selectresult1 = await connection
            .request()
            .query("select * from orders");
        app.get("/api/updt", (req, res) => {
            console.log(req.body);
            res.send(selectresult1.recordset);
        });
    }
    catch (error) {
        console.error();
    }
}
async function deleteDataAndSend() {
    try {
        app.delete("/api/updt", async (req, res) => {
            const delresult = await connection
                .request()
                .query(`DELETE FROM ORDERS WHERE CUSTOMER_ID = ${req.body.id}`);
            res.send(updtresult.recordset);
            console.log(`complete data of ID number ${req.body.id} is deleted`);
        });
        const updtresult = await connection.request().query("select * from orders");
        app.get("/api/edit", (req, res) => {
            console.log(req.body);
            console.log(updtresult.recordset);
            res.send(updtresult.recordset);
        });
        const selectresult1 = await connection
            .request()
            .query("select * from orders");
        app.get("/api/updt", (req, res) => {
            console.log(req.body);
            res.send(selectresult1.recordset);
        });
    }
    catch (error) {
        console.error();
    }
}
// Call selectDataAndSend initially and schedule it every second
await selectDataAndSend();
setInterval(async () => {
    try {
        selectDataAndSend();
    }
    catch (error) {
        console.error("error fetching data", error);
    }
}, 10000);
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
app.post("/api/create", async (req, res) => {
    try {
        const newrecord = await connection.request().query(`INSERT INTO ORDERS(OID, DATE, CUSTOMER_ID, AMOUNT)
VALUES ('${req.body.ID}', '${req.body.date}' , '${req.body.customerID}' , '${req.body.amount}');`);
        console.log(req.body);
        console.log(`new entry entered`);
        res.send(newrecord.recordset);
        return res.json;
    }
    catch (error) {
        console.error();
    }
});
app.post("/api/update", async (req, res) => {
    try {
        await updateDataAndSend();
        const updtresult = await connection
            .request()
            .query(`UPDATE ORDERS SET AMOUNT = ${req.body.AMOUNT}  WHERE OID = ${req.body.OID} `);
        console.log(req.body);
        console.log(`data updated`);
        res.send(updtresult.recordset);
        return res.json;
    }
    catch (error) {
        console.error();
    }
});
app.post("/api/delete", async (req, res) => {
    try {
        await updateDataAndSend();
        res.send(`<h1>this is running<h1>`);
        console.log(`delete button is pressed and working`);
        return res.json;
    }
    catch (error) {
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
