const chalk = require('chalk');
const fs = require('fs');

// const notes = "Your notes";

const getNotes = () => {
    return notes;
};

const addNote = (title, body) => {
    // console.log(chalk.red (title, body));
    
    // LOAD notes from file
    const notes = loadNotes();

    // NO DUPLICATES

    // Create a new array of duplicates
    const duplicateNotes = notes.filter((note)=>{
        return (note.title === title && note.body === body) // if TRUE...add to new array
    });

    // If no duplicates then add to array
    if (duplicateNotes.length === 0 ) {
        notes.push({
            title: title,
            body: body
        });
    } else {
        console.log(chalk.red('This is a duplicate note'));
    }

    // WRITE TO FILE
    saveNotes(notes);

};

const removeNote  = (title) => {

    const notes = loadNotes();

    const newNotes = notes.filter((note)=> {
        return (note.title !== title); // FALSE... new array = remove item
    });


    if (newNotes.length < notes.length) {
        console.log(chalk.blue(JSON.stringify(newNotes)));
        saveNotes(newNotes);
    } else {
        console.log(chalk.red('Note doesnt exist!'));
        console.log(chalk.blue(JSON.stringify(newNotes))); // stringify a JSON object to see in console
    }

}

const findNode = (title) => {
    const notes = loadNotes();
    notes.find((note) => {
        if (note.title === title) {
            console.log(chalk.green(` body = ${note.body}`));
        }
        // else if (note.title !== title) return console.log(chalk.red(` Note not found`));
    })
}

////////////////
// UTILITIES   
////////////////

// READ JSON from file 
const loadNotes = () => {
    // add an array if there's no note (NUX)
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        const data = JSON.parse(dataJson);  
        return data
    } catch (e) {
        return []
    }
 
}

// WRITE JSON to file 
const saveNotes = (notes) => {

    // write to object
    const newData = JSON.stringify(notes);
        
    // store as json - write
    fs.writeFileSync('notes.json', newData);
}


module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    loadNotes: loadNotes,
    findNode: findNode
}