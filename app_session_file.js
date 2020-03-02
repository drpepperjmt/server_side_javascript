const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const md5 = require('md5')
var FileStore = require('session-file-store')(session)
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  secret: '1234qwerasdfzxcv',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}))

app.get('/auth/logout', (req, res) => {
    delete req.session.displayName
    res.redirect('/welcome')
})
app.get('/welcome', (req, res) => {
    if (req.session.displayName) {
        res.send(`
            <h1>Hello, ${req.session.displayName}</h1>
            <a href='/auth/logout'>Logout</a>
        `)
    }
    else {
        res.send(`
            <h1>Welcome</h1>
            <a href='/auth/login'>Login</a>    
        `)
    }
})
app.post('/auth/login', (req, res) => {
    var salt = '!@#$%^&*()'
    var user = {
        username: 'egoing',
        password: md5('111'),
        displayName: 'Egoing'
    }
    var uname = req.body.username
    var pwd = md5(req.body.password)

    if (uname == user.username && pwd == user.password) {
        req.session.displayName = user.displayName
        res.redirect('/welcome')
    }
    else {
        res.send('Who are you? <a href="/auth/login">Login</a>')
    }
})
app.get('/auth/login', (req, res) => {
    var output = `
        <h1>Login</h1>
        <form action="/auth/login" method="post">
            <p>
                <input type="text" name="username" placeholder="username">
            </p>
            <p>
                <input type="text" name="password" placeholder="password">
            </p>
            <p>
                <input type="submit">
            </p>
        </form>
    `

    res.send(output)
})

app.get('/count', (req, res) => {
    if (req.session.count) {
        req.session.count++
    }
    else {
        req.session.count = 1
    }

    res.send('count : '+req.session.count)
})
app.get('/tmp', (req, res) => {
    res.send('result : '+req.session.count)
})

app.listen(3003, (req, res) => {
    console.log('port 3003 is running!')
})