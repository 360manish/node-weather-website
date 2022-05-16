const request=require('request')
const forecast=(latitude,longitude,callback)=>{

    const url='http://api.weatherstack.com/current?access_key=6ce5ad83aeda6a6e34da071d60fefdb1&query='+latitude+','+longitude+'&units=f'
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback("Unable to connect to weather service",undefined)
        }else if(body.error){
            callback("Unable to find location",undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0]+". It is currently "+body.current.temperature+" out. It feels like "+body.current.feelslike+" out. Humidity is "+body.current.humidity+". Is currently day :- "+body.current.is_day)
        }
    })
}

module.exports=forecast

