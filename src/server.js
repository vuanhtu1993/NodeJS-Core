import express from 'express';
import http from 'http';
import ejs from 'ejs';
const app = express();

app.set('view engine', 'ejs');

const port = process.env.port || 8000;
const server = http.Server(app);

// Router
app.get('/', function (req, res) {
	res.render('index');
});
server.listen(port, function (err) {
	if (err) throw err;
	console.log('Server running on port '+ port);
});