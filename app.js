const request = require('request');
const yargs = require('yargs');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help','h')
    .argv;
    
var address = argv.a;

request({
    url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
    json: true
},(error,response,body) => {
    
    if(error) {
        console.log('Cannot connect to Google servers!');
       
    } else if(body.status === 'ZERO_RESULTS') {
        console.log('Unable to find that address!');
    }
    else {
        console.log(`Address: ${body.results[0].formatted_address}`);
        console.log(`Lat: ${body.results[0].geometry.location.lat}`);
        console.log(`Long: ${body.results[0].geometry.location.lng}`);
    }
});