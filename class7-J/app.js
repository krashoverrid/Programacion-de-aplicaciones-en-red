const seneca = require('seneca')();
const express = require('express')();
const web = require('seneca-web');
const cors = require('cors');

var Routes = [{
	prefix: '/my-api',
	pin: 'area:enlace,action:*',
	map: {bazinga: {GET: true}}
}];

express.use(cors());

var config = {
	routes: Routes,
	adapter: require('seneca-web-adapter-express'),
	context: express,
	options: {parseBody: true}
};

seneca.client()
	.use(web, config)
	.ready(() => {
	  	var server = seneca.export('web/context')()
	  	server.listen('3000', () => {
	    	console.log('server started on: http://localhost:3000/my-api/bazinga')
	  	})
	});

let item = 'Bazinga!';

let item2 = (items)=>{
	let inve = items.toUpperCase();
	let c = '';
	for(i=0; i<items.length;i++) c = c.concat(inve[items.length-i-1]);
	return c;
};

seneca.add({area: 'enlace', action: 'bazinga'}, function (args, done) {
	try {
		done(null, {bar: ''+item, bar: item2(item)});
	} catch (err) {
		done(err, null);
	}
});