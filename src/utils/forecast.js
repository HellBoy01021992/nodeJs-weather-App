const request = require('postman-request')

const forecast = (latitude, longitude, callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=3134d67e5dbec5c78c5682b6f84ae24e&query="+latitude+","+longitude;
    request({ url , json:true },(error, { body } ) =>{
            if(error)
            {
                callback('Unable to connect to weather services!', undefined)
            }
            else if(body.error)
            {
                callback('Invalid location data', undefined)   
            }
            else
            {
                const forecast = body.current.weather_descriptions[0]  
                const temperature = "It is curently "+ body.current.temperature +" degree outside. But it feels like "+ body.current.feelslike + " degrees."
                const humidity = "The humidity is "+body.current.humidity +"% ."
                callback(undefined, {
                    forecast: forecast,
                    temperature: temperature,
                    humidity: humidity,
                    icon : body.current.weather_icons[0]
                })
            }
            
})
}

module.exports = forecast