const express = require('express')
const path = require("path")
const app = express()
const hbs = require('hbs');
const { off } = require('process');
const forecast = require('./forecast')
const geocode = require('./geocode')
const { error } = require('console');

const port = process.env.PORT || 3000


// define path
const publicDirectory = path.join(__dirname,'../public');
const viewspath = path.join(__dirname , '../template/views' )
const partialsPath = path.join(__dirname , '../template/partials' )

// set hbs 
app.set('view engine' , "hbs")
app.set('views' , viewspath)
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(publicDirectory))
app.get('' , (req , res) => {
    res.render('index' , {
        title : "weather app" , 

    })
})
app.get('/about' , (req , res) => {
    res.render('about' , {

    })
})
app.get('/help' , (req ,res) =>{
    res.render('help' , {
        helpText:"helping test"

    })
})

app.get('/weather' , (req , res) => {
    if (!req.query.address) {
      return  res.send(
            {
                error : " there's problem we can't find your location please put your information correctly"
            }
        )
    }else{
        geocode(req.query.address , (error , {latitude  , longitude , location} = {}) => {
            if (error) {
                return res.send({error : "please put your information correctly"})
            } else{
                forecast(latitude, longitude ,(error , forecastData) => {
                    if (error) {
                        return res.send({error})
                    } else{
                        res.send({
                            forecast : forecastData,
                            location ,
                            address : req.query.address
                        })
                    }
                   
                })
            }
            
            
        })
    }
    
   
})



app.get('/products' , (req ,res ) => {
    if (!req.query.search) {
       return res.send(
           {
               error:"error"
           }
       )
    }else{
        console.log(req.query.search);
        res.send({
            products:[]
         
        })
    }
   
})

app.get('*' , (req ,res ) => {
    res.send('my 404 page')
})

app.listen(port , () => {
    console.log(port + " started");
})