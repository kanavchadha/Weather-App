const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const geocode = require('./utils/geocode');
const port=process.env.PORT || 3000;

app.use(express.static("public")); // use for changing the server view 
app.set("view engine","hbs");  
// var newPath = path.join(__dirname,'../templates'); // if we want to change the name of views directory
// app.set('views',newPath)      // or we want to change the path of it.
const partialsPath = path.join(__dirname,'views/partials');
hbs.registerPartials(partialsPath); // if we are not using default directories for eg. , as above if we are using other name instead of views or it's not in the root directory of a project. 
// then we have to use this method for changing the partials path.

app.get("/",(req,res)=>{
    res.render("index",{Location: "Jalandhar",weather: "sunny"});
})
app.get("/about",(req,res)=>{
    res.render("about");
})
app.get("/weather",(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error: 'You must Provide a address!'
        });
    }
    geocode.geoCode(req.query.address,(err,{latitude,longitude,location} = {}) => { // object destruction (of data obj) and also providing the default values.
        if(location === undefined)
        {
            console.log("Please give correct Location..");
            res.send({error: 'Please give correct Location..'});
            return;
        }
        if(err!=null){
            console.log(err);
            res.send({err});
            return;
        }  // or we can use else statement
            geocode.forecast(latitude,longitude,(err,forecastData)=>{
                if(err!=null){
                    res.send({err});
                    return;
                }
                console.log(forecastData);      
                res.send({
                    address: req.query.address,
                    forecast: forecastData,
                    Location: location
                });
            })
    });
    
    
});

// app.get("/about",(req,res)=>{
//     res.send([{          // sending JSON data
//             name: "Kanav",
//             age: "18"
//             },
//         {
//             Hobby: "Listening Music",
//             Location: "Jalandhar"
//         }
//     ]);
// })

app.get("/*",(req,res)=>{
    res.render("error");
})
app.listen(port,()=>{console.log("Server has Started.");});
// for restarting server for specified files but the package must not be a global package.