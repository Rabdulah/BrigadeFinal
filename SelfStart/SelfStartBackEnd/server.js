// server.js

// BASE SETUP
// =============================================================================
// test

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
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header('Access-Control-Allow-Methods', 'POST, PATCH, GET, PUT, DELETE, OPTIONS');
    next();
});

//IMPORT OUR ROUTES ---------------------------------
var images = require('./routes/images'); 
var patients = require('./routes/patients'); 
var cities = require('./routes/cities'); 
var assessments = require('./routes/assessments');
var forms = require('./routes/forms');
var appointments = require('./routes/appointments');
var askAPhysio = require('./routes/askAPhysio');
var excercise = require('./routes/excercise');
var provinces = require('./routes/provinces');
var recommendation = require('./routes/recommendation');
var rehabilitationplans = require('./routes/rehabilitationplans');
var countries = require('./routes/countries');
var questions = require('./routes/questions');
var administrators = require('./routes/administrators');
var physiotherapests = require('./routes/physiotherapests');
var treatments = require('./routes/treatments');
var genders = require('./routes/genders');
var maritalStatuses = require('./routes/maritalStatuses');


// REGISTER OUR ROUTES -------------------------------
app.use('/images', images);
app.use('/patients', patients);
app.use('/cities', cities);
app.use('/assessments', assessments);
app.use('/forms', forms);
app.use('/questions', questions);
app.use('/appointments', appointments);
app.use('/askAPhysio', askAPhysio);
app.use('/exercises', excercise);
app.use('/provinces', provinces);
app.use('/recommendation', recommendation);
app.use('/rehabilitationplans', rehabilitationplans);
app.use('/countries', countries);
app.use('/administrators', administrators);
app.use('/treatments', treatments);
app.use('/physiotherapests', physiotherapests);
app.use('/genders', genders);
app.use('/maritalStatuses', maritalStatuses);


//connect to mongoDB
mongoose.connect('mongodb://localhost/selfStart', { useMongoClient: true });

// START THE SERVER
// =============================================================================
app.listen(port, function() {
    console.log('Magic happens on port ' + port);
});
