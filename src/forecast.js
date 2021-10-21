
const request = require('request')

const forecast = ( latitude , longitude , callback) => {
    
    const url = "http://api.weatherstack.com/current?access_key=d029cd3da978dc0f236c46725086b7f6&query=" + latitude + ',' + longitude +"&units=m"
    request({url , json:true } , (error , {body}) => {
        if (error) {
            callback('please check your internet' , undefined)
        }else if (body.error) {
            callback("please put in your location")
        }else{
            callback(undefined , `weather:${body.current.weather_descriptions[0]} , currently:${body.current.temperature} , feels:${body.current.feelslike} ` )
        }
    })
  
}




module.exports = forecast