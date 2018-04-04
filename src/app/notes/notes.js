const fs = require('fs');

let addNote = (title, kind) => {
    console.log("add new notes", title, kind);
    let note = {
        title: title,
        kind: kind
    };
    let arrNote = fs.readFileSync('notes.txt');
    let nodes = JSON.parse(arrNote);

    nodes.push(note);
    fs.writeFileSync('notes.txt', JSON.stringify(nodes));
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