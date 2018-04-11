const express = require('express');
const app = express();
const port = 3400;
const mongoose = require('mongoose');

mongoose.connect("mongodb://test:test@cluster0-shard-00-00-bwpse.mongodb.net:27017,cluster0-shard-00-01-bwpse.mongodb.net:27017,cluster0-shard-00-02-bwpse.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin");

let Schema = mongoose.Schema;
let personScheme = new Schema({
    firstName: String,
    lastName: String,
    address: String,
});
let Person = mongoose.model("Person", personScheme);
let newPerson = Person({firstName:"Anh Tus", lastName:"Vu", address:"Hanoi"});
newPerson.save(function (err) {
    if (err) throw err;
    console.log('New person saved !')
});
app.get('/',function (req, res) {
    res.send('welcome to mongodb server');
    Person.find({}, function (err, users) {
        if (err) throw err;
        console.log(users);
    })
});

app.listen(port, function () {
    console.log('sql server running')
});