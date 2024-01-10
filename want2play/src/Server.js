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

app.get("/", (req, res) => {
    res.send("hello world");
});

app.post("/test", (req, res) => {

    const { data } = 'testing'
    db.run('INSERT INTO gameList (name) VALUES (?)', [data], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message })
            return
        }
        res.send({ items: rows })
    })
    res.send("Done");
})

app.get("/test2", (req, res) => {

    db.run("INSERT INTO gameList (name) VALUES('Andres Aguilar')")
    res.send("Done2");
})

app.get("/test3", (req, res) => {

    db.run("INSERT INTO gameList (name , data) VALUES('Andres A' ,  '{test:45}')")
    res.send("Done2");
})

app.get("/req", (req, res) => {
    res.send(req.baseUrl)

})

app.listen(8080);
