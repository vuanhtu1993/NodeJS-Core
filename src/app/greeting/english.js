var data = require('./greeting.json');

var greeting = function () {
    console.log(data.eng);
};

module.exports = greeting;