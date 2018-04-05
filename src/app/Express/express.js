const express = require('express');
const app = express();
const port = 3000;

app.use('/assets', express.static('../../public'));
app.get('/', (request, response) => {
    console.log(__dirname + '../../public');
    response.send(`
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
app.get('/api', (request, response) => {
    response.json({name: "Anh Tus", age: "26", carrier: "Web developer"});
});
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});