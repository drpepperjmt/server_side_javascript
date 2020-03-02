const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const multer = require('multer') // v1.0.5
const upload = multer() // for parsing multipart/form-data

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencodedapp.locals.pretty = true

app.set('view engine', 'jade')
app.set('views', './views')
const port = 3000

app.use(express.static('public'))

app.get('/form', (req, res) => {
    res.render('form')
})
app.get('/form_receiver', (req, res) => {
    var title = req.query.title
    var description = req.query.description
    res.send(title+', '+description)
})
app.post('/form_receiver', upload.array(), (req, res, next) => {
    console.log(req.body)
    var title = req.body.title
    var description = req.body.description
    res.send(title+', '+description)
    // var title = req.body.title
    // var description = req.body.description
    // res.send(title+', '+description)
})
app.get('/topic', (req, res) => {
    var topics = [
        'Javascript is...',
        'Nodejs is...',
        'Express is...'
    ]
    var output = `
        <a href="/topic?id=0">Javascript</a><br>
        <a href="/topic?id=1">Nodejs</a><br>
        <a href="/topic?id=2">Express</a><br><br>
        <h1>${topics[req.query.id]}</h1><br>
        <h1>${req.query.id}</h1>

    `
    res.send(output)
})
app.get('/topic2/:id', (req, res) => {
    var topics2 = [
        'JavaScript2 is...',
        'Nodejs2 is...',
        'Express2 is...'
    ]

    var output = `
        <a href="/topic2/0">JavaScript2</a><br>
        <a href="/topic2/1">Nodejs2</a><br>
        <a href="/topic2/2">Express2</a><br><br>
        <h1>${topics2[req.params.id]}</h1>
    `
    res.send(output)
})
app.get('/topic2/:id/:mode', (req, res) => {
    res.send(req.params.id + ',' + req.params.mode)
})

app.get('/template', (req, res) => {
    res.render('temp', {time: Date(), _title: 'Jade'})
})
app.get('/', (req, res) => res.send('Hello World!'))
app.get('/route', (req, res) => res.send('Hello route, <img src = "/modem.png">'))
app.get('/login', (req, res) => res.send('<h1>login please</h1>'))
app.get('/dynamic', (req, res) => {
    var lis = ''
    for (var i = 0; i < 5; i++) {
        lis += '<li>coding</li>'
    }
    var time = Date()
    var output = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        Hello, Dynamic!
        <ul>
            ${lis}
        </ul>
        ${time}
    </body>
    </html>`
    res.send(output)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))