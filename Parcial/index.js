const express = require('express');
const pug = require('pug');
const data = require('./conex');
const fs = require('fs');

var app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

data.datos();
let fetchNotes = () => {
  try{
    let noteString = fs.readFileSync("notes-data.json");
    return JSON.parse(noteString);
  }catch(error){
    return [];
  }
}

let cade = fetchNotes();

app.get('/', (req, res) => {
  let cade2 = cade.address[0].facultades[0].FC[0].alumnos;
  console.log(cade2);
  res.send(JSON.stringify(cade2));
});

app.get('/encriptado', (req, res) => {
  res.render('index.pug', {
    pageTitle: 'Programacion de aplicaciones en redes',
    title: 'Acerca de Node.js',
    text1: encrypt(texto1),
    text2: encrypt(texto2),
    currentYear: new Date().getFullYear()
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});