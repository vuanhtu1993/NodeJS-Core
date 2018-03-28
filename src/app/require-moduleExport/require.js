const fs = require('fs');
let file = require('./export'); // file in here to storage module.exports of exports file
console.log('require file here');
console.log(file);
// fs.appendFile('  fsFile.txt', `storage sth in here ${file.person}`);