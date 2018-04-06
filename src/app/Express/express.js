const express = require('express');
const app = express();
const port = 3000;

app.use('/assets', express.static('../../public'));
app.get('/', (req, res) => {
    res.send(`
   <html>
    <head>
        <link rel="stylesheet" href="assets/style.css">
    </head> 
    <body>
        <h1>Hello world</h1>   
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
        <h4> Query string: ${req.query.abc}</h4> 
    </body>
   <html>
        
    `)
});
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});