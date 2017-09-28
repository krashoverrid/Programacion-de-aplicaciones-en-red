const request = require('request');
const yargs = require('yargs');
let localice = require('./googleapi');

console.log("Inicializando....");


const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Direccion a obtener data',
      string: true
    }
  })
  .help()
  .alias('help','h')
  .argv;

localice.localiza(argv.address);


/*

https://maps.googleapis.com/maps/api/geocode/json?address=?

forecast.io
https://api.darksky.net/forecast/492cd195f9feb3291218bb1976592cd8/37.8267,-122.4233
*/