const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');


const jwt = require('jsonwebtoken');
const { config } = require('./config');
const { userTable } = require('./model/user');

const port = process.env.PORT || 8080;
mongoose.connect(config.database, (err) => {
	if (err) {
		console.log('Error initializing connection to MongoDB');
		return;
	} else {
		console.log('Connect to mongoDB successfully');
	}
});
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// =======================
// routes ================
// =======================
// basic route
app.get('/', function(req, res) {
	res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);