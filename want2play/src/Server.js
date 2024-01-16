import express from 'express'
import sqlite3 from 'sqlite3'
import cors from 'cors'
import fs from 'fs'


const app = express()

const db = new sqlite3.Database('./src/db/want2play.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

// init table 
//db.run('DROP TABLE sessions')
const tablesql1 = `
CREATE TABLE IF NOT EXISTS  Sessions (
    roomID TEXT,
    created DATETIME,
    PRIMARY KEY(roomID)
);
`
const tablesql2 = `
CREATE TABLE IF NOT EXISTS User_Data (
    roomID TEXT,
    user TEXT,
    list_item TEXT,
    PRIMARY KEY(roomID,user,list_item),
    FOREIGN KEY(roomID) REFERENCES Sessions(roomID) ON DELETE CASCADE
);
`

db.run(tablesql1)
db.run(tablesql2)

app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // replace with the origin you want to allow
        res.header("Access-Control-Allow-Headers", "origin, x-requested-with, content-type, accept, authorization");
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        res.status(200);
    }
    next();
});

app.get("/", (req, res) => {
    res.send("hello world");

    console.log('test', hasSession('4MgoMd'))
});

app.get("/testpost", (req, res) => {

    db.run('INSERT INTO Sessions (roomID,created) VALUES (?,?)', ['4MgoMd', new Date().toISOString()], (err) => {
        if (err) {
            console.log(err)
            return
        }
        console.log('success')
    })

    db.run('INSERT INTO User_Data (roomID,user,list_item) VALUES (?,?,?)', ['4MgoMd', "{testuser:'shiterino'}", "shite"], (err) => {
        if (err) {
            console.log(err)
            return
        }
        console.log('success')
    })

    db.run('INSERT INTO User_Data (roomID,user,list_item) VALUES (?,?,?)', ['4MgoMd', "{testuser:'shiterino'}", "lethal co"], (err) => {
        if (err) {
            console.log(err)
            return
        }
        console.log('success')
    })

    db.run('INSERT INTO Sessions (roomID,created) VALUES (?,?)', ['aaabbb', new Date().toISOString()], (err) => {
        if (err) {
            console.log(err)
            return
        }
        console.log('success')
    })
    res.send('done')
})


app.get("/drop", (req, res) => {
    const drop = 'DROP TABLE Sessions;'
    const drop2 = 'DROP TABLE User_Data;'
    db.run(drop)
    db.run(drop2)
    res.send('dropped')
})

app.get("/read", (req, res) => {
    const sql = 'SELECT * FROM sessions'
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row.name);
        });
        console.log(rows)
        res.send('done')
    });

})

function hasSession(room) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM sessions', (err, rows) => {
            if (err) {
                reject(err); // Rejects the promise in case of error
            } else {
                let sessionFound = false;
                for (const row of rows) {
                    if (room == row['roomID']) {
                        sessionFound = true;
                        break; // Exit the loop if the session is found
                    }
                }
                resolve(sessionFound); // Resolves the promise with the result
            }
        });
    });
}

app.post("/whoRu", (req, res) => {
    const room = req.body['room'];
    const date = new Date();

    hasSession(room).then(flag => {
        if (flag) {
            console.log('session Exists')
            res.status(200).send('Session Already Exists');
        } else {
            db.run('INSERT INTO Sessions (roomID,created) VALUES (?,?)', [room, date.toISOString()], (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error while inserting session');
                } else {
                    console.log('success');
                    res.status(200).send('Session created');
                }
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).send('Database error');
    });
});

app.listen(8080);
