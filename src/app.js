const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()

// Define Paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

// Setup habdlebars engine and view location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name: 'Manish Mishra'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Manish Mishra'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'Do you want some help from our organosation',
        title:'Help',
        name:'Manish Mishra'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude, longitude, location}={})=>{
        if(error){
          return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
          if(error){
            return res.send({error})
          }
          res.send({
            location,
            forecast:forecastData,
            address:req.query.address
        })
        })
      })
    
})

app.get('/products',((req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
}))

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Manish Mishra',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Manish Mishra',
        errorMessage:'Page not found'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})
