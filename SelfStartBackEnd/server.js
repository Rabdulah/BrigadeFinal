// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var mongoose = require('mongoose');
var express = require('express'); // call express
var bodyParser = require('body-parser');
var app = express(); // define our app using express
var port = 8082;        // set our port

// the following 2 middleware convert the URL reqand res to json format
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

// configure the server for developer pursposes (remove when published)
app.use(function (request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', 'http://brigade-youda97.c9users.io:8080');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header('Access-Control-Allow-Methods', 'POST, PATCH, GET, PUT, DELETE, OPTIONS');
    next();
});

//IMPORT OUR ROUTES ---------------------------------
var patients = require('./routes/patients'); 
var cities = require('./routes/cities');
var appointments = require('./routes/appointments');
var genders = require('./routes/genders');
var maritalStatuses = require('./routes/maritalStatuses');

// REGISTER OUR ROUTES -------------------------------
app.use('/patients', patients);
app.use('/cities', cities);
app.use('/appointments', appointments);
app.use('/genders', genders);
app.use('/maritalStatuses', maritalStatuses);


//connect to mongoDB
mongoose.connect('mongodb://localhost/selfStart', { useMongoClient: true });

// START THE SERVER
// =============================================================================
app.listen(port, function() {
    console.log('Magic happens on port ' + port);
});
