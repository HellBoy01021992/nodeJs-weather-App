const path      = require('path')
const express   = require('express')
const hbs       = require('hbs')
const geocode   = require('./utils/geocode')
const forecast  = require('./utils/forecast')

const app  = express()
const port = process.env.PORT || 3000
//Setup paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Sreemona Das'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title:'About',
        name: 'Sreemone Das'
    })

})

app.get('/help', (req, res) => {
    res.render('help',{
        message: 'This is the Help Page',
        title: 'Help',
        name : 'Sreemona Das'
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address)
    {
        return res.send({
            error : "Please add an address for forecast"
        })
    }
    geocode(req.query.address,(error, {latitude, longitude, location}={})=>{
        if(error)
        {
            return res.send({ error : error })
        }

        forecast(latitude, longitude,(error,forecastData)=>{
            if(error)
            {
                return res.send({ error : error })
            }
            
            res.send ({
                forecast : forecastData.forecast,
                icon     : forecastData.icon,
                location : location,
                address  : req.query.address
            });
        })
    })
})

app.get('/product',(req, res)=>{
    if(!req.query.search)
    {
        res.send({
        error:"You must enter search term"
        })    
    }
    else
    {
        console.log(req.query.search)
        res.send ({
        products:[]
        });
    }
    
})

app.get('help/*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Sreemona Das",
        error: "Help article not found!"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Sreemona Das",
        error: "PAGE NOT FOUND"
    })
})

app.listen(port, ()=>{
    console.log ('Server is up')
})

