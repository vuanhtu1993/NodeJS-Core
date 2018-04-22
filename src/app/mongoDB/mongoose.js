const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8888;

// bodyParser middleware
// create application/json parser
// let jsonParser = bodyParser.json();
app.use(bodyParser.json());

// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({extended: false});
const mongoose = require('mongoose');
mongoose.connect("mongodb://test:test@ds151169.mlab.com:51169/fresher");

// Add headers
app.use(function (req, res, next) {

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
	console.log('Connect Mlab DB successfully');
});
// Init schema
let Schema = mongoose.Schema;

let phoneScheme = new Schema({
	phoneName: String,
	price: String,
	description: String,
	imgUrl: String
});

let Phone = mongoose.model("Cellphone", phoneScheme);

// API
app.get('/phones', function (req, res) {
	Phone.find()
		.then((data) => res.send(data))
		.catch((err) => res.send(err))
});

app.get('/phone/:id', function (req, res) {
	const id = req.params.id;
	Phone.findOne({
		_id: id
	})
		.then((data) => res.send(data))
		.catch((err) => res.send(err))
});

app.post('/phones', function (req, res) {
	const {phoneName, price, description, imgUrl} = req.body;
	let newPhone = new Phone({
		phoneName,
		price,
		description,
		imgUrl
	});
	newPhone.save()
		.then((data) => res.send(data))
		.catch((err) => res.send(err))
});

app.put('/phone/:id', function (req, res) {
	const _id = {"_id": req.params.id};
	const {phoneName, price, description, imgUrl} = req.body;
	Phone.update({_id}, {
		phoneName,
		price,
		description,
		imgUrl,
	})
		.then((data) => res.send(data)) // here return the item before update
		.catch((err) => res.send(err))
});

app.delete('/phone/:id', function (req, res) {
	const _id = req.params.id;
	Phone.deleteOne({_id})
		.then((data) => res.send(data))
		.catch((err) => res.send(err))
});
// Promise
const findOneItem = (_id) => {

};

app.listen(port, function () {
	console.log(`Server using MongoDB is running on port${port}`)
});