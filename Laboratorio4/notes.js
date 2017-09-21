//console.log("Iniciando notes modules");

const fs = require('fs');

let fetchNotes = () => {
	try{
		let noteString = fs.readFileSync("notes-data.json");
		return JSON.parse(noteString);
	}catch(error){
		return [];
	}
}

let saveNotes = (notes) => {
	fs.writeFileSync('notes-data.json',JSON.stringify(notes))
};

let addNote = (title,body) => {
	//console.log("añadiendo nota: " + title +body);

	let notes = fetchNotes();
	//console.log(notes);
	let note = {
		title : title,
		body : body
	};

	let duplicatesNotes = notes.filter((n) => n.title === title );

	if(duplicatesNotes.length === 0){
		notes.push(note);
		saveNotes(notes);
	}

};

let getAll =() =>{
	return fetchNotes();
};

let getNote = (title) =>{

	let notes = fetchNotes();

	let filteredNote = notes.filter(n => n.title === title);
	return filteredNote[0];
};

let logNote =(note) =>{
	console.log("\n------------------------");
	console.log(`Title: ${note.title}`);
	console.log(`Body: ${note.body}`);
}

let notesDelete =()=>{
	saveNotes();
}

let notesRemove =(title)=>{
	let notes = fetchNotes();

	let filteredNote = notes.filter(n => n.title === title);
	let posi = notes.findIndex(n => n.title === title);
	
	if(posi != -1){
		notes.splice(posi,1);
		saveNotes(notes);
	}else{
		console.log("Note not found");
	}
	
}

module.exports = {
	addNote,
	getAll,
	getNote,
	logNote,
	notesDelete,
	notesRemove
};