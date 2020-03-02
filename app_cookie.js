const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const port = 3000;

app.use(cookieParser('key'));

var products = {
    1: {title: 'The history of web 1'},
    2: {title: 'The next web'}
}

app.get('/products', (req, res) => {
    var output = ''
    for (var name in products) {
        output += `
            <li>
                <a href="/cart/${name}">${products[name].title}</a>
            </li>
        `
    }
    res.send(`
        <h1>Products</h1>
        <ul>${output}</ul>
        <a href="/cart/">Cart</a>
    `)
})
/*
var cart = {
    1: 2    //product id: quantity
    2: 1
}
*/
app.get('/cart/:id', (req, res) => {
    var id = req.params.id
    if (req.cookies.cart) {
        var cart = req.cookies.cart
    }
    else {
        var cart = {}
    }

    if (!cart[id]) {
        cart[id] = 0
    }
    cart[id] = parseInt(cart[id]) + 1
    res.cookie('cart', cart)
    res.redirect('/cart/')
})
app.get('/cart/', (req, res) => {
    var cart = req.cookies.cart
    if (!cart) {
        res.send('Cart is empty!')
    }
    else {
        var output = ''
        for (var id in cart) {
            output += `
                <li>${products[id].title} (${cart[id]})</li>
            `
        }

        console.log(products[id])
        console.log(cart[id])
        res.send(`
            <h1>Cart</h1>
            <ul>${output}</ul>
            <a href="/products/">Products List</a>    
        `)
    }    
})

app.get('/count', (req, res) => {
    if (req.signedCookies.count) {
        var count = parseInt(req.signedCookies.count)
    }
    else {
        var count = 0
    }

    count = count + 1
    res.cookie('count', count, {signed: true})
    res.send('count : '+req.signedCookies.count);
})

app.listen(port, (req, res) => {
    console.log('Connected 3000 port!');
});

