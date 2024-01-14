import sqlite3 from "sqlite3";
import express from "express";
const app = express();
const port = 8080;

// Create a new database instance
const db = new sqlite3.Database('./db/data.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQLite database.');
});


// Endpoint to create a sample table
app.get('/test', (req, res) => {
    db.run(`CREATE TABLE SampleTable (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    number INTEGER
  )`, [], (err) => {
        if (err) {
            res.status(500).send('Error creating table: ' + err.message);
        } else {
            res.send('Table created');
        }
    });
});

// Endpoint to insert a random number
app.get('/insert', (req, res) => {
    const randomNum = Math.floor(Math.random() * 100);
    db.run(`INSERT INTO SampleTable (number) VALUES (?)`, [randomNum], function(err) {
        if (err) {
            res.status(500).send('Error inserting data: ' + err.message);
        } else {
            res.send(`A row has been inserted with rowid ${this.lastID}`);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
