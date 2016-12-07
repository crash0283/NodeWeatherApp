const yargs = require('yargs');
const axios = require('axios');

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

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

    
axios.get(geocodeUrl).then((response)=>{
    if(response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address!');
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    
    var weatherUrl = `https://api.darksky.net/forecast/b4cdb6ff68b9f700f81aa02081d09502/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response)=>{
    var currentTemp = Math.round(response.data.currently.temperature);
    var actualTemp = Math.round(response.data.currently.apparentTemperature);
    var overview = response.data.currently.summary;
    
    console.log(`Current Temp: ${currentTemp}F`);
    console.log(`Feels Like: ${actualTemp}F`);
    console.log(`Overview: ${overview}`);
}).catch((error) => {
    if(error.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers!');
    } else {
        console.log(error.message);
    }
})