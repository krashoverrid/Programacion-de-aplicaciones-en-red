const yargs = require('yargs');
let request = require('request');

function temper(latitud, longitud){

	var tempAddress = (lat, long) => {
		return new Promise((resolve,reject) => {
			const API_KEY ="492cd195f9feb3291218bb1976592cd8";
			let URL_weather = "https://api.darksky.net/forecast/" + API_KEY + "/" + lat + "," + long;
			request({
			  url: URL_weather,
			  json: true
			}, function (err, res, body) {
				if(err){
					reject('Unable to connect to google servers');
				}else if(body){
					
					let c = (body.currently.temperature - 32)*5/9;
					console.log("La temperatura es: ", c);
					resolve(
						{
							t: " "+ c
						}
					);
				}
			});
		});
	};

	tempAddress(latitud, longitud).then((location) => {
		console.log(JSON.stringify(location,undefined, 2));
	}, (errorMessage) => {
		console.log(errorMessage);
	});

};


module.exports={
	temper
};