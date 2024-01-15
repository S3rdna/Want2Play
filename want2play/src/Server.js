import express from 'express'
import sqlite3 from 'sqlite3'


const app = express()

const db = new sqlite3.Database('./src/db/want2play.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

// init table 
//db.run('DROP TABLE sessions')
const tablesql = `CREATE TABLE IF NOT EXISTS sessions 
( room TEXT PRIMARY KEY,
    createDate DATETIME NOT NULL,
    user TEXT
)`
db.run(tablesql)

app.use(express.json())
app.use((req, res, next) => {
    res.header("access-control-allow-origin", "http://localhost:5173"); // replace with the origin you want to allow
    res.header("access-control-allow-headers", "origin, x-requested-with, content-type, accept, authorization");
    if (req.method === 'OPTIONS') {
        res.header('access-control-allow-methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.get("/", (req, res) => {
    res.send("hello world");

    console.log('test', hasSession('4MgoMd'))
});

app.post("/testpost", (req, res) => {

    const data = req.body
    //TODO FIX
    db.run('INSERT INTO gameList (name,data) VALUES (?)', [data['name'], { 'testpost': 2394723987 }], (err) => {
        if (err) {
            res.status(400).json({ error: err.message })
            return
        }
        res.send(data['name'])
    })
})


app.get("/reset", (req, res) => {
    const sql = 'DROP TABLE sessions'
    db.all(sql, [], (err) => {
        if (err) {
            throw err;
        }
        console.log('shit reset ')
        res.send('shit reset')
    });

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

app.post("/whoRu", (req, res) => {


    const room = req.body['room']

    //does room exist?
    //  yes - does user exist?
    //      yes - take to their list 
    //      no - new list
    //  no -  new user; new list

    const date = new Date();
    const createDate = date.toISOString();

    const name = req.body['name']
    const password = req.body['password']
    const user = { name: name, password: password }

    console.log(hasSession(room, user))

    //    const sql = `INSERT INTO sessions (room,createDate,user) VALUES (?,?,?)`
    //    db.run(sql, [room, createDate, JSON.stringify(user)], (err) => {
    //        if (err) {
    //            res.status(400).json({ error: err.message })
    //            return
    //        }
    //    })
    console.log(room, createDate, user)
})



function hasSession(room = null, user = null) {
    db.all('SELECT * FROM sessions', (err, rows) => {
        rows.forEach((row) => {
            try {

                const data = (row)
                if (room != data['room']) { console.log('not in this hoe2'); return 0 }

                const name = JSON.parse(row['user'])['name']
                const pass = JSON.parse(row['user'])['password']
                console.log('usercheck:', user, { name: name, password: pass })
                if (JSON.stringify(user) != JSON.stringify({ name: name, password: pass })) { console.log('no user in sight') }


                console.log(data)
                console.log('name:', name, ', pass:', pass)


            } catch (error) {
                console.log('no session')
                return 0
            }
        })
        return 0
    })
}

app.listen(8080);
