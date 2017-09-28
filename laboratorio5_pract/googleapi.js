const yargs = require('yargs');
let request = require('request');
let tempr = require('./temperute');

function localiza(nombre){

	var geocodeAddress = (address) => {
		return new Promise((resolve,reject) => {
			var encodedAddress = encodeURIComponent(address);
			request({
				url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
				json: true
			},(error,response,body) => {
				if(error){
					reject('Unable to connect to google servers');
				}else if(body.status === 'ZERO_RESULTS'){
					reject('Unable to find that address');
				}else if(body.status === 'OK'){
					resolve(
						{
							address: body.results[0].formatted_address,
							latitude: body.results[0].geometry.location.lat,
							longitude: body.results[0].geometry.location.lng
						}
					);
				}
			});
		});
	};

	geocodeAddress(nombre).then((location) => {
		console.log(JSON.stringify(location,undefined, 2));
		tempr.temper(location.latitude, location.longitude);
	}, (errorMessage) => {
		console.log(errorMessage);
	});
};


	

module.exports={
	localiza
};