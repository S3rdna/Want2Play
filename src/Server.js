import express from 'express'
import http from 'http'
import sqlite3 from 'sqlite3'
import cors from 'cors'
import fs from 'fs'
import { Server } from 'socket.io'
import { writeFile } from 'fs/promises'


const app = express()
const server = http.createServer(app)

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
        res.header("Access-Control-Allow-Origin", ["http://localhost:5173", "http://localhost:8080"]); // replace with the origin you want to allow
        res.header("Access-Control-Allow-Headers", "origin, x-requested-with, content-type, accept, authorization");
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        res.status(200);
    }
    next();
});

// TESTING AREA ****************************************************************************
app.get("/", (req, res) => {
    res.send("hello world");
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
    db.run(tablesql1)
    db.run(tablesql2)
    res.send('dropped and reset')
})

app.get("/read", (req, res) => {
    const sql = 'SELECT * FROM sessions'
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows)
    });
})


// END OF TESTING *********************************************************************

// helper function for /whoRu
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

// request to add room to db
app.post("/whoRu", (req, res) => {
    const room = req.body['room'];
    const date = new Date();

    //if db doesn't have session then add it
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

server.listen(8080);


//starting socketio implementation
const io = new Server(server, {
    cors: {
        origin: server,
        methods: ["GET", "POST"]
    },
})


io.on('connection', async (socket) => {
    const user_room = socket.request._query['roomID']
    const user_name = socket.request._query['name']
    console.log('user (', user_name, ') connected to room:', user_room);

    //update request on join AKA user sync up
    updateReq(socket, user_room)

    socket.on('item_added', (data) => {
        addItem(data['roomID'], data['user'], data['new_item'])
        updateReq(socket, user_room)
        console.log('item added', data)
    })

    socket.on('item_deleted', (data) => {
        deleteItem(data['roomID'], data['user'], data['deleted_item'])
        updateReq(socket, user_room)
        console.log('item deleted', data)
    })

    socket.on('update_lists', (data) => {
        console.log('update list', data)
    })
})

async function updateReq(socket, user_room) {
    try {
        console.log('requesting update...')
        const data = await getData(user_room)
        socket.emit('update_request', {
            data: data
        })
    } catch (error) {
        console.log('err in request', error)
    }
}

async function addItem(roomID, user, item) {
    db.run('INSERT INTO User_Data (roomID,user,list_item) VALUES (?,?,?)', [roomID, user, item], (err) => {
        if (err) { console.log('add item err:', err) }
        else {
            console.log('item added to db', { roomID: roomID, user: user, newitem: item })
        }
    })
}

async function deleteItem(roomID, user, item) {
    console.log('inside delete item', roomID, user, item)
    db.run('DELETE FROM User_Data WHERE roomID= ? AND user= ? AND list_item= ?', [roomID, user, item], (err) => {
        if (err) { console.log('add item err:', err) }
        else {
            console.log('item removed from db', { roomID: roomID, user: user, deleted_item: item })
        }
    })
}

function getData(room) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM User_Data WHERE roomID="${room}"`, (err, rows) => {
            if (err) {
                console.log(err)
                reject('error'); // Rejects the promise in case of error
            } else {
                resolve(rows); // Resolves the promise with the result
            }
        });
    });
}
