const request = require('request')

const current_weather = (address,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d368bee8a049affe25d9774c8fd7d915&query='+address
    request({url : url}, (error,response) =>{
        if(error)
        {
            callback('Unable to connect to the Internet',undefined)
            console.log("Unable to connect to the Internet")
        }else if(response.body.error)
        {
            callback('Unable to find location! Try another serach.',undefined)
        }
        else{
            console.log('Error',error)
            console.log('Response body',response.body)
            const obj = JSON.parse(response.body)
        //    console.log('Temperature : ' +obj.current.temperature)
        //    console.log('City : ' + obj.location.name )
            const data = {
                city : obj.location.name,
                temperature : obj.current.temperature,
                icon : obj.current.weather_icons[0],
                description : obj.current.weather_descriptions[0]
            }
            callback(undefined,data)
        }
    
    })
}

module.exports = {
    current_weather : current_weather
}
