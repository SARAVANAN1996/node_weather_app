const path = require('path')
const geocode = require('./utils/weather')
const express = require('express')
const hbs = require('hbs')

const app = express()
//Define path for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')
//Set handlebar engine and view location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)
//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) =>{
    res.render('index',{
        page : 'Welcome',
        name : 'Saravanan'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        page: 'About',
        name: 'Saravanan'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        page: 'Help',
        name: 'Saravanan'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.location){
        return res.send({
            error: 'Please provide location'
        })
    }

    geocode.current_weather(req.query.location,(error,{city,temperature,icon,description}) =>{
        res.send({
            temperature,
            location : city,
            icon,
            description
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        page: '404',
        title: 'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        page: '404',
        title: 'Page not Found'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})