const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c75d1632936e8fcc8749a1258e6a3f69&query=' + 
                encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=f'
    request({url, json:true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service', undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. ` +
                    `It is currently ${body.current.temperature} degrees outside. ` +
                    `It feels like ${body.current.feelslike} degrees.`)
        }
    })
}

module.exports = forecast