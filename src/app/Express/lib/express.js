'use strict';

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodeParser = bodyParser.urlencoded({ extended: false });

var port = 3000;
// routing
app.use('/assets', express.static('../../public'));
app.get('/', function (req, res) {
    res.send('\n   <html>\n    <head>\n        <link rel="stylesheet" href="assets/style.css">\n        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script>\n    </head> \n    <body>\n        <h1>Hello world</h1>   \n        <h4>url encode</h4>\n        <form action="/login" method="post">\n            user: <input type="text" id="user" name="user"><br>\n            password: <input type="text" id="password" name="password">\n            <button type="submit">submit</button>\n        </form>\n        <script type="text/javascript">\n              $.ajax({\n                type:"POST",\n                url:"http://localhost:3000/person",\n                data: JSON.stringify({name:"Anh Tus", age:"26"}),\n                dataType: "json",\n                contentType: "application/json"\n                })   \n        </script>\n    </body>\n   <html>\n   ');
});
app.get('/api', function (req, res) {
    res.json({ name: "Anh Tus", age: "26", carrier: "Web developer" });
});
app.get('/person/:id', function (req, res) {
    console.log(req.query);
    res.send('\n      <html>\n    <head>\n        <link rel="stylesheet" href="/assets/style.css">\n    </head> \n    <body>\n        <h4> Person: ' + req.params.id + '</h4> \n        <h4> Query string: ' + req.query + '</h4> \n    </body>\n   <html>\n        \n    ');
});
// body parser
app.post('/login', urlencodeParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    res.send(req.body.user + ' access url login');
    console.log(req.body);
});

app.post('/person', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
});

app.listen(port, function () {
    console.log('Server running on port: ' + port);
});