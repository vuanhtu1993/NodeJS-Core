const fs = require('fs');

let addNote = (title, kind) => {
    console.log("add new notes", title, kind);
    fs.appendFile('notes.txt', [title, kind]);
};
let listNote = () => {
    console.log("Get list notes");
};
let readNote = (title) => {
    console.log("Read note", title);
};
let removeNote = (title) => {
    console.log("Remove notes", title);
};

module.exports = {
    addNote,
    listNote,
    readNote,
    removeNote,
};