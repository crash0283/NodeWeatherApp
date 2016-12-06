//API Key: b4cdb6ff68b9f700f81aa02081d09502

const request = require('request');

var getWeather = (lat,lng,callback) => {
        request({
        url: `https://api.darksky.net/forecast/b4cdb6ff68b9f700f81aa02081d09502/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if(!error && response.statusCode === 200){
            callback(undefined,{
                currentTemp: Math.round(body.currently.temperature),
                apparentTemp: Math.round(body.currently.apparentTemperature),
                summary: body.currently.summary
            });

        } else {
            callback('Unable to fetch weather!');
        }
    });
}



module.exports = {
    getWeather
};