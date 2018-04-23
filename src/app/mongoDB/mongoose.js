const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8888;

// bodyParser middleware
// create application/json parser
// let jsonParser = bodyParser.json();
app.use(bodyParser.json());

// create application/x-www-form-urlencoded parser

app.use(bodyParser.urlencoded({ extended: false }));
const mongoose = require('mongoose');

mongoose.connect('mongodb://test:test@ds151169.mlab.com:51169/fresher');

// Add headers
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type',
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Connect Mlab DB successfully');
});
// Init schema
const Schema = mongoose.Schema;

const phoneScheme = new Schema({
  phoneName: String,
  price: String,
  description: String,
  imgUrl: String
});

const Phone = mongoose.model('Cellphone', phoneScheme);

// API
app.get('/phones', (req, res) => {
  Phone.find()
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

app.get('/phone/:id', (req, res) => {
  const { id } = req.params;
  Phone.findOne({
    _id: id
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

app.post('/phones', (req, res) => {
  const { phoneName, price, description, imgUrl } = req.body;
  const newPhone = new Phone({
    phoneName,
    price,
    description,
    imgUrl
  });
  newPhone
    .save()
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

app.put('/phone/:id', (req, res) => {
  const { id } = req.params;
  const { phoneName, price, description, imgUrl } = req.body;
  Phone.update(
    { _id: id },
    {
      phoneName,
      price,
      description,
      imgUrl
    }
  )
    .then(data => res.send(data)) // here return the item before update
    .catch(err => res.send(err));
});

app.delete('/phone/:id', (req, res) => {
  const { id } = req.params;
  Phone.deleteOne({ _id: id })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

app.listen(port, () => {
  console.log(`Server using MongoDB is running on port${port}`);
});
