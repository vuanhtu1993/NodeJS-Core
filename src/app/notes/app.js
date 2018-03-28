console.log('Start note app');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const argv = yargs.argv;
let command = process.argv[2];

console.log("Command", command);
console.log("Yargs", argv);

if (command === "add") {
    notes.addNote(argv.title, argv.kind);
}
if (command === "list") {
    notes.listNote();
}
if (command === "read") {
    notes.readNote(argv.title);
}
if (command === "remove") {
    notes.removeNote(argv.title);
}
