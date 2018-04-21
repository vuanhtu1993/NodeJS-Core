const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 6789;

// bodyParser middleware
// create application/json parser
// let jsonParser = bodyParser.json();
app.use(bodyParser.json());

// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({extended: false});
const mongoose = require('mongoose');
mongoose.connect("mongodb://test:test@ds151169.mlab.com:51169/fresher");

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
	console.log('Connect Mlab DB successfully');
});
// Init schema
let Schema = mongoose.Schema;

let personScheme = new Schema({
	firstName: String,
	lastName: String,
	address: String,
});

let Person = mongoose.model("Person", personScheme);

// API
app.get('/users', function (req, res) {
	Person.find()
		.then((data) => res.send(data))
		.catch((err) => res.send(err))
});

app.get('/user/:id', function (req, res) {
	const id = req.params.id;
	Person.findOne({
		_id: id
	})
		.then((data) => res.send(data))
		.catch((err) => res.send(err))
});

app.post('/users', function (req, res) {
	const {firstName, lastName, address} = req.body;
	let newPerson = new Person({
		firstName,
		lastName,
		address,
	});
	newPerson.save()
		.then((data) => res.send(data))
		.catch((err) => res.send(err))
});

app.put('/user/:id', function (req, res) {
	const _id = {"_id": req.params.id};
	const {firstName, lastName, address} = req.body;
	Person.update({_id}, {
		firstName,
		lastName,
		address,
	})
		.then((data) => res.send(data)) // here return the item before update
		.catch((err) => res.send(err))
});

app.delete('/user/:id', function (req, res) {
	const _id = req.params.id;
	Person.deleteOne({_id})
		.then((data) => res.send(data))
		.catch((err) => res.send(err))
});
// Promise
const findOneItem = (_id) => {

};

app.listen(port, function () {
	console.log(`Server using MongoDB is running on port${port}`)
});