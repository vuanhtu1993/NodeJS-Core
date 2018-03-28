var data = require('./greeting.json');

var greeting = function () {
  console.log(data.fran);
};

module.exports = greeting;