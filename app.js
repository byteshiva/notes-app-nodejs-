const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');

const notesUtilities = require('./notes.js');

// Add
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        description: {
            describe: 'Note body',
            demandOption: false,
            type: 'string'
        }
    },
    handler: function(argv){
        // console.log('Add a new note', argv);
        // console.log(chalk.green.bold(`Title = ${argv.title}`));
        // console.log(chalk.blue(`Description = ${argv.description}`));
        notesUtilities.addNote(argv.title, argv.description);
    }
});

// delete
yargs.command({
    command: 'remove',
    describe: 'Delete a note',
    builder: {
        title: {
            describe: 'note to remove title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        // console.log('Delete a note');
        notesUtilities.removeNote(argv.title);
    }
});

// List
yargs.command({
    command: 'list',
    describe: 'List notes',
    handler: function(argv) {
        // console.log('Listing all notes');
        notes = notesUtilities.loadNotes();
        console.log('NOTES');
        notes.map((note, i) => {
            console.log(`Note ${i+1} : Title = ${note.title},  Content = ${note.body}`);
        });
    }
});

// Find
yargs.command({
    command: 'find',
    describe: 'Find a note',
    builder: {
        title: {
            describe: 'note to remove title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        // console.log('Find a note');
        notesUtilities.findNode(argv.title)
    }
});

debugger;
yargs.parse();
// console.log(yargs.argv);