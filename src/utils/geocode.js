const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?limit=1&access_token=pk.eyJ1Ijoia2lydGFuZGVzYWkiLCJhIjoiY2tkdWM5eXRyMDRwYTJ0b3M2anM3cW92ZCJ9.tiDDMeDqJ9MABsdvdnXKnw'

    request({url, json:true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather app',undefined)
        } else if(body.features.length===0){
            callback('Unable to find location. Try another search', undefined)
        } else{
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode