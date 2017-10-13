let request = require('request');
const fs = require('fs');

let alumnos=JSON.parse('[]');

function datos(){

	var geocodeAddress = (gg) => {
		return new Promise((resolve,reject) => {
			request({
				url: `https://mighty-harbor-50073.herokuapp.com/api`,
				json: true
			},(error,response,body) => {
				if(error){
					reject('Unable to connect to servers');
				}else if(body.status === 'ZERO_RESULTS'){
					reject('Unable to find that address');
				}else {
					resolve(
						{
							address: body,
						}
					);
				}
			});
		});
	};

	return geocodeAddress('alv').then((location) => {
		alumnos = location;
		let saveNotes = (notes) => {
			fs.writeFileSync('notes-data.json',JSON.stringify(notes))
		};

		saveNotes(alumnos);

		return location;
	}, (errorMessage) => {
		console.log(errorMessage);
	});
};

	

module.exports={
	datos,
	alumnos
};