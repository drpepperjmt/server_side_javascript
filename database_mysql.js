var mysql      = require('mysql');
var conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'ehfkdpahd1',
    database : 'o2'
});

conn.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
// });
  
// connection.end();

/*
var sql = 'SELECT * FROM topic';
conn.query(sql, (err, results, fields) => {
    if (err) {
        console.log(err);
    }
    else {
        for (var i = 0; i < results.length; i++) {
            console.log(results[i].id)
        }
    }
});
*/

var sql = 'DELETE FROM topic WHERE id=?';
var params = [1];
conn.query(sql, params, (err, rows, fields) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(rows);
    }
})

conn.end()