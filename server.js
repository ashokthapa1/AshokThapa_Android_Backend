const express = require("express")
const app = express()
const handlers = require("./handlers")
const cors = require("cors")

//body parser stuffs
const bodyParser = require('body-parser')
// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//use cors
app.use(cors());

// API users
app.get("/api/users",handlers.getUser)
app.get("/api/users/:username",handlers.getSingleUser)
app.post("/api/users",handlers.addUser)

//Authenticate users
app.post("/api/auth/users/",handlers.authUser)
app.post("/api/auth/users/get/",handlers.getAuthuser)

// search
app.get("/api/search/hospital/:hospitalName",handlers.getHospitalByName);
app.get("/api/search/location/:location",handlers.getHospitalByLocation);
app.get("/api/search/disease/:diseaseName",handlers.getHospitalByDiseaseName);
app.get("/api/search/nears/:hospitalName",handlers.getNears);
app.get("/api/single/hospital/:id",handlers.getHospitalById);
app.get("/api/single/hospital/",handlers.getSingleHospitalByName);

//view hospital
app.get("/api/view_hospital",handlers.getView_hospital);
app.post("/api/view_hospital",handlers.addView_hospital);

// recommendation
app.get("/api/recommend/mostviewed/",handlers.getMostViewedHospital)

// hospital
app.post("/api/hospital/",handlers.addHospital);
app.delete("/api/hospital/:id",handlers.deleteHospital);
app.put("/api/hospital/:id",handlers.updateHospital);

// start server
const port = 3000;
app.listen(port,()=>{
    console.log("Server listening on "+port);
})