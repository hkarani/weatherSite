const request = require('request')

const forecast = (latt, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e06913be6e610bb4c47ed846a648a5ca&query=' + encodeURIComponent(long) + ',' + encodeURIComponent(latt) + '&units=f'
    request({ url, json: true }, (error, { body } = {}) => {

        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                weather: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }
    })
}


module.exports = forecast;