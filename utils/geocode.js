const request = require("request"); // use for making http request

// encodingURIComponent = (add) => {
    
//     return
// }

const geoCode = (add,callback) => {
    const geourl="https://api.mapbox.com/geocoding/v5/mapbox.places/"+add+".json?access_token=pk.eyJ1Ijoia2FuYXYyMDIwIiwiYSI6ImNrOWlxMmdiNDA4YWIzbW5vYm0xZHlyajUifQ.8jGw2QNLZJOyZtfM5rm6ag"
    request({ url: geourl, json: true },(err,res)=>{
        if(err){
            callback("Something went wrong :(  check your Internet Connection. ");
        } else if(res.body.message){
            callback("ERROR! : " + res.body.message,undefined);
        } else if(res.body.features.length === 0){
            callback("ERROR! : Invalid Location",undefined);
        } else{
            callback(null,{ latitude: res.body.features[0].center[0] ,
                            longitude: res.body.features[0].center[1],
                            location: res.body.features[0].place_name
            });
        }
    })  
}

const forecast = (lat,long,callback) => {
const url="http://api.weatherstack.com/current?access_key=fa2a448fd3d984a349383e811a03cd27&query="+ long + "," + lat +"&units=m";
 request({ url: url, json: true },(err,res)=>{
    // const data = JSON.parse(res.body); // with 'json: true' we don't have to parse the json data.  
   if(err){
       callback("Something went wrong :( ",undefined);
   } else if(res.body.error){
        callback("ERROR! "+res.body.error.info,undefined);
   } else{
    callback(null,res.body.current.weather_descriptions[0] + ". current Temprature in " + res.body.location.region + " is: " +res.body.current.temperature+ " degree celcius"+" and Feels Like : "+ res.body.current.feelslike+" degree celcius" );
   }
})
}
module.exports = {
    geoCode: geoCode,
    forecast: forecast
}