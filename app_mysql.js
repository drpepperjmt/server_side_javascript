const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
var mysql      = require('mysql');
var conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'ehfkdpahd1',
    database : 'o2'
});
conn.connect()

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

const port = 3000

app.set('views', './views_mysql')
app.set('view engine', 'jade')
app.locals.pretty = true

app.get('/topic/add', (req, res) => {
    conn.query('SELECT id, title FROM topic', (err, topics, fields) => {
        if (err) {
            console.log(err)
        }
        else {
            res.render('add', {topics: topics})
        }
    })
})
app.get('/topic/:id/edit', (req, res) => {
    conn.query('SELECT id, title FROM topic', (err, topics, fields) => {
        if (err) {
            console.log(err)
        }
        else {
            var id = req.params.id
            conn.query('SELECT * FROM topic WHERE id=?', [id], (err, topic, fields) => {
                res.render('edit', {topics: topics, topic: topic[0]})
            })
        }
    })
})
app.get('/topic/:id/delete', (req, res) => {
    conn.query('SELECT id, title FROM topic', (err, topics, fields) => {
        if (err) {
            console.log(err)
        }
        else {
            var id = req.params.id
            conn.query('SELECT id, title FROM topic WHERE id=?', [id], (err, topic, fields) => {
                res.render('delete', {topics: topics, topic: topic[0]})
            })
        }
    })
})
app.get(['/topic', '/topic/:id'], (req, res) => {
    var sql = 'SELECT id, title FROM topic'
    
    conn.query(sql, (err, topics, fields) => {
        var id = req.params.id
        if (err) {
            console.log(err)
        }
        else if (id) {
            conn.query('SELECT * FROM topic WHERE id=?', [id], (err, topic, fileds) => {
                if (err) {
                    console.log(err)
                }
                else {
                    res.render('view', {topics: topics, topic: topic[0]})
                }
            })
        }
        else {
            res.render('view', {topics: topics})
        }
    })
})
app.post('/topic', (req, res) => {
    var title = req.body.title
    var description = req.body.description
    var author = req.body.author

    conn.query('INSERT INTO topic (title, description, author) VALUES(?, ?, ?)', [title, description, author], (err, topics, fields) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/topic/'+topics.insertId)
        }
    })
})
app.post('/topic/:id/edit', (req, res) => {
    var title = req.body.title
    var description = req.body.description
    var author = req.body.author
    var id = req.params.id

    conn.query('UPDATE topic SET title=?, description=?, author=? WHERE id=?', [title, description, author, id], (err, topic, fields) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/topic/'+id)
        }
    })
})
app.post('/topic/:id/delete', (req, res) => {
    var id = req.params.id
    conn.query('DELETE FROM topic WHERE id=?', [id], (err, topic, fields) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/topic/')
        }        
    })
})

app.listen(port, (req, res) => {
    console.log('Connected, 3000 port!')
})
