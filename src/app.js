const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
    //Define Paths
const publicDirectorytoPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectorytoPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: "Hezron"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Hezron"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        name: "Hezron",
        text: "This is some helpful text"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: "No address entered"
        })

    } else {
        geoCode(req.query.address, (error, { longitude, latitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            } else {
                forecast(longitude, latitude, (error, forecastData) => {
                    if (error) {
                        return res.send({ error })
                    }
                    res.send({
                        loc: location,
                        forc: forecastData
                    })

                })
            }
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })

    } else {
        res.send({
            products: []
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Article not found',
        name: "Hezron"
    })

})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: '404 Page not found',
        name: "Hezron"
    })

})


app.listen(port, () => {
    console.log('Server is up on PORT' + port)
})