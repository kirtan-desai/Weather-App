const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Defining paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewDirPath = path.join(__dirname, '../templates/views')
const partialDirPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewDirPath)
hbs.registerPartials(partialDirPath)

//Setup static directory to serve static webpages
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Kirtan Desai"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Kirtan Desai" 
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "“The universe is a cruel, uncaring void. The key to being happy isn’t the search for meaning; it’s just to keep yourself busy with unimportant nonsense, and eventually, you’ll be dead.” - Mr. Peanutbutter",
        title: "Help",
        name: "Kirtan Desai",
    })
})

app.get('/weather', (req, res) => {                 // API
    if(!req.query.address){
        return res.send({
            error: "Error! Please provide address."
        })
    }
    
    geocode(req.query.address, (error, data) => {
        if(error){
            return res.send({error})
        }
    
        forecast(data.longitude, data.latitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
    
            res.send({
                temperature: forecastData,
                location: data.location
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: "Error 404",
        name: "Kirtan Desai",
        message: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        message: 'Page not found.',
        title: "Error 404",
        name: "Kirtan Desai",
    })
})


app.listen(3000, () => {
    console.log('Server is up and running!')
})