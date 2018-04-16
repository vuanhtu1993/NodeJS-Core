const express = require('express');
const app = express();
const port = 3200;
const mysql = require('mysql');

app.use('/', function(req, res, next) {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'test',
        password: 'test',
        database: 'addressbook'
    });
    con.query('SELECT * FROM addressbook', function(rows) {
        if (err) throw err;
        console.log(rows);
    });
    next();
});

app.get('/', function(req, res) {
    res.send('welcome to mysql server');
});

app.listen(port, function() {
    console.log('sql server running');
});
