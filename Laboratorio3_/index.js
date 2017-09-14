const http = require('http');
const fs = require('fs');
const nots = require('./notes');
const checks = require('./verif_notes');
const delet = require('./delete_note');
const average = require('./average_notes');

const hostname = '127.0.0.1';
const port = 3000;

let chk = checks.check(nots.note);
let prome = 0.00;
if(chk!=1){
	let indexDelete = delet.deleteNote(nots.note);
	console.log(indexDelete);
	prome = average.average(nots.note, indexDelete);
}
console.log(prome);

const server = http.createServer((req, res) => {
	res.statusCode = 200;//ok
	res.writeHead(200,{"Content-Type":"text/html"});//
	fs.readFile('./index.html', (error,content)=>{
		res.write(content);
		res.write('<div class="col-xs-8" id="nAlum"><label>'+nots.note[0].name+'</label></div><div class="col-xs-4" ><label>Promedio:</label></div>');
		res.write('<div class="col-xs-8" id="Promedio"><label>' + prome + '</label></div>');
		res.write('<div class="col-xs-12" id="Promedio"><label>Notas:</label></div>');
		res.write('<div class="col-xs-1 col-xs-offset-1" ><label>' + nots.note[0].note1 + ',</label></div>');
		res.write('<div class="col-xs-1 " ><label>' + nots.note[0].note2 + ',</label></div>');
		res.write('<div class="col-xs-1 " ><label>' + nots.note[0].note3 + ',</label></div>');
		res.write('<div class="col-xs-1 " ><label>' + nots.note[0].note4 + '</label></div>');
		res.write('</div></body></html>');
		res.end();
	});
});

server.listen(port, hostname, ()=>{
	console.log("server corriendo en: \n" + `https://${hostname}:${port}`);
});