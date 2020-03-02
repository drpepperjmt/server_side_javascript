var OrientDB = require('orientjs')

var server = OrientDB({
    host: 'localhost',
    port: 2424,
    username: 'root',
    password: 'ehfkdpahd1'
})

var db = server.use('o2')
/*
db.record.get('#33:0').then((record) => {
    console.log('Loaded data: ', record.title)
})
*/

// CREATE
/*
var sql = 'SELECT FROM topic'
db.query(sql).then((results) => {
    console.log(results)
})
*/

/*
var sql = 'SELECT FROM topic WHERE @rid=:rid'
var param = {
    params: {
        rid: '#34:0'
    }
}
db.query(sql, param).then((results) => {
    console.log(results)
})
*/

// INSERT
/*
var sql = 'INSERT INTO topic (title, description) VALUES(:title, :desc)'
var param = {
    params: {
        title: 'Express',
        desc: 'Express is framework for web'
    }
}
db.query(sql, param).then((results) => {
    console.log(results)
})
*/

// UPDATE
/*
var sql = 'UPDATE topic SET title=:title WHERE @rid=:rid'
db.query(sql, {params:{title: 'Expressjs', rid: '#35:0'}}).then((results) => {
    console.log(results)
})
*/

// DELETE
/*
var sql = 'DELETE FROM topic WHERE @rid=:rid'
db.query(sql, {params: {rid: '#35:0'}}).then((results) => {
    console.log(results)
})
*/