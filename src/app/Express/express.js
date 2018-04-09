const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodeParser = bodyParser.urlencoded({ extended: false });

const port = 3000;
// routing
app.use('/assets', express.static('../../public'));
app.get('/', (req, res) => {
    res.send(`
   <html>
    <head>
        <link rel="stylesheet" href="assets/style.css">
    </head> 
    <body>
        <h1>Hello world</h1>   
        <h4>url encode</h4>
        <form action="/login" method="post">
            user: <input type="text" id="user" name="user"><br>
            password: <input type="text" id="password" name="password">
            <button type="submit">submit</button>
        </form>
    </body>
   <html>
   `);
});
app.get('/api', (req, res) => {
    res.json({name: "Anh Tus", age: "26", carrier: "Web developer"});
});
app.get('/person/:id', (req, res) => {
    console.log(req.query);
    res.send(`
      <html>
    <head>
        <link rel="stylesheet" href="/assets/style.css">
    </head> 
    <body>
        <h4> Person: ${req.params.id}</h4> 
        <h4> Query string: ${req.query}</h4> 
    </body>
   <html>
        
    `)
});
// body parser
app.post('/login', urlencodeParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);
    res.send(`${req.body.user} access url login`);
});

app.post('/person', jsonParser, (req, res) => {
    if (!req.body) return res.sendStatus(400)
    // create user in req.body
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});