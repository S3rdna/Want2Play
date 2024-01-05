import express from 'express'
import sqlite3 from 'sqlite3'


const app = express()

const db = new sqlite3.Database('./src/db/data2.sqlite', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});


app.get("/", (req, res) => {
    res.send("hello world");
});

app.get("/test", (req, res) => {

    db.run("CREATE TABLE IF NOT EXISTS gameList ( name TEXT PRIMARY KEY, data TEXT)")
    res.send("Done");
})

app.get("/test2", (req, res) => {

    db.run("INSERT INTO gameList (name) VALUES('Andres Aguilar')")
    res.send("Done2");
})

app.get("/test3", (req, res) => {

    db.run("INSERT INTO gameList (name , data) VALUES('Andres Aguilarapsoijd' ,  '{test:3}')")
    res.send("Done2");
})

app.get("/req", (req, res) => {
    res.send(req.baseUrl)

})

app.listen(8080);
