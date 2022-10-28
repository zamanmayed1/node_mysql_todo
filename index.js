// Create a node project with npm init --y
// npm i express cors mysql
// configure index.js in package.json
// Make A boyler plate
// Connect With mysql Database Table

const express = require('express');
const app = express();
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(cors())
app.use(express())
const jsonParser = bodyParser.json()


const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "todos"
})

app.get('/', (req, res) => {
    res.send('Server Make Succses')
})
// get All Todos
app.get('/alltodos', (req, res) => {
    db.query("SELECT * FROM todos", (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result.reverse())
        }
    }
    )
})
// Add a Todo
app.post('/addtodo', jsonParser, (req, res) => {
    let title = req.body.title
    let prioty = req.body.prioty
    let status = req.body.status
    db.query(
        "INSERT INTO todos (title , prioty , status) VALUES (?, ? ,?)", [title, prioty, status], (err, result) => {
            if (err) {
                res.send(err);
            }
            else {
                res.send(result)
            }
        }
    )
})
// Update a Todo
// app.put('/update/id', jsonParser, (req, res) => {
//     let id = req.body.id;
//     let title = req.body.title;
//     let prioty = req.body.prioty;
//     let status = req.body.status;
//     db.query(
//         // "UPDATE todos SET status=? WHERE id =? ", [status, id], (err, result) => {
//         "UPDATE todos SET title=?,prioty=?,status=? WHERE id =?", [title, prioty, status, id], (err, result) => {
//             if (err) {
//                 res.send(err);
//             }
//             else {
//                 res.send(result)
//             }
//         }
//     )


// })

// Delete a Todo
app.delete('/delete/:id', (req, res) => {
    let id = req.params.id;
    db.query(
        "DELETE FROM todos WHERE id=? ", id, (err, result) => {
            if (err) {
                res.send(err);
            }
            else {
                res.send(result)
            }
        }
    )


})

app.listen(5000, () => {
    console.log("server is Running");
})