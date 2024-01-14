import express from 'express'
import sqlite3 from 'sqlite3'


const app = express()

const db = new sqlite3.Database('./src/db/data2.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

// init table 
db.run("CREATE TABLE IF NOT EXISTS gameList ( name TEXT PRIMARY KEY, data TEXT)")

app.use(express.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Replace with the origin you want to allow
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", (req, res) => {
    res.send("hello world");
});

app.post("/testpost", (req, res) => {

    const data = req.body
    db.run('INSERT INTO gameList (name) VALUES (?)', [data['name']], (err) => {
        if (err) {
            res.status(400).json({ error: err.message })
            return
        }
        res.send(data['name'])
    })
})

app.get("/test", (req, res) => {
    res.send("testings")
})

app.get("/test2", (req, res) => {

    db.run("INSERT INTO gameList (name) VALUES('Andres Aguilar')")
    res.send("Done2");
})

app.get("/test3", (req, res) => {

    db.run("INSERT INTO gameList (name , data) VALUES('Andres A' ,  '{test:45}')")
    res.send("Done2");
})


app.listen(8080);
