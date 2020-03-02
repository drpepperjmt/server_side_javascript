const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

const port = 3000

app.set('views', './views_file')
app.set('view engine', 'jade')
app.locals.pretty = true

app.get('/topic/new', (req, res) => {
    fs.readdir('data', (err, files) => {
        if (err) {
            console.log(err)
            res.status(500).send('Internal Server Error')
        }
        res.render('new', {topics: files})
    })
})
app.get(['/topic', '/topic/:id'], (req, res) => {
    var id = req.params.id
    
    fs.readdir('data', (err, files) => {
        if (err) {
            console.log(err)
            res.status(500).send('Internal Server Error')
        }
        // id값이 있을 때
        if (id) {
            fs.readFile('data/'+id, 'utf8', (err, data) => {
                if (err) {
                    console.log(err)
                    res.status(500).send('Internal Server Error')
                }
                console.log(data)
                res.render('view', {topics: files, title: id, description: data})
            })
        }
        else {
            res.render('view',  {topics: files, title: 'Welcome', description: 'Server'})
        }
    })    
})
app.post('/topic', (req, res) => {
    var title = req.body.title
    var description = req.body.description
    fs.writeFile('data/'+title, description, (err) => {
        if (err) {
            console.log(err)
            res.status(500).send('Internal Server Error')
        }
        res.redirect('/topic/'+title)
    })
    // res.send('hi post' + req.body.title)
})

app.listen(port, (req, res) => {
    console.log('Connected, 3000 port!')
})
