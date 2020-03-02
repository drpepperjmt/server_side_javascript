const express = require('express')
const bodyParser = require('body-parser')
var OrientDB = require('orientjs')

var server = OrientDB({
    host: 'localhost',
    port: 2424,
    username: 'root',
    password: 'ehfkdpahd1'
})
var db = server.use('o2')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

const port = 3000

app.set('views', './views_orientdb')
app.set('view engine', 'jade')
app.locals.pretty = true

app.get('/topic/add', (req, res) => {
    var sql = 'SELECT FROM topic'
    db.query(sql).then((topics) => {
        res.render('add', {topics: topics})
    })
})
app.post('/topic', (req, res) => {
    var title = req.body.title
    var desc = req.body.description
    var auth = req.body.author
    var sql = 'INSERT INTO topic (title, description, author) VALUES(:title, :desc, :auth)'
    db.query(sql, {
        params: {
            title: title, 
            desc: desc, 
            auth: auth
        }
    }).then((result) => {
        res.redirect('/topic/'+encodeURIComponent(result[0]['@rid']))
    })
})
app.get('/topic/:id/edit', (req, res) => {
    var id = req.params.id
    var sql = 'SELECT FROM topic'
    db.query(sql).then((topics) => {
        var sql = 'SELECT FROM topic WHERE @rid=:rid'
        db.query(sql, {params: {rid: id}}).then((topic) => {
            res.render('edit', {topics: topics, topic: topic[0]})
        })
    })
})
app.post('/topic/:id/edit', (req, res) => {
    var id = req.params.id
    var title = req.body.title
    var desc = req.body.description
    var auth = req.body.author
    var sql = 'UPDATE topic SET title=:title, description=:desc, author=:auth WHERE @rid=:rid'
    db.query(sql, {
        params: {
            title: title,
            desc: desc,
            auth: auth,
            rid: id
        }
    }).then((results) => {
        res.redirect('/topic/'+encodeURIComponent(id))
    })
})
app.get('/topic/:id/delete', (req, res) => {
    var id = req.params.id
    var sql = 'SELECT FROM topic'
    db.query(sql).then((topics) => {
        var sql = 'SELECT FROM topic WHERE @rid=:rid'
        db.query(sql, {params: {rid: id}}).then((topic) => {
            res.render('delete', {topics: topics, topic: topic[0]})
        })
    })
})
app.post('/topic/:id/delete', (req, res) => {
    var id = req.params.id
    var sql = 'DELETE FROM topic WHERE @rid=:rid'
    db.query(sql, {
        params: {
            rid: id
        }
    }).then((results) => {
        res.redirect('/topic')
    })
})
app.get(['/topic', '/topic/:id'], (req, res) => {
    var sql = 'SELECT FROM topic'
    
    db.query(sql).then((topics) => {
        var id = req.params.id
        if (id) {
            var sql = 'SELECT FROM topic WHERE @rid=:rid'
            db.query(sql, {params: {rid: id}}).then((topic) => {
                res.render('view', {topics: topics, topic: topic[0]})
            })
        }
        else {
            res.render('view', {topics: topics})
        }
    })
})

app.listen(port, (req, res) => {
    console.log('Connected, 3000 port!')
})
