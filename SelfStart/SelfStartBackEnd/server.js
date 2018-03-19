// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var mongoose = require('mongoose');
var express = require('express'); // call express
var bodyParser = require('body-parser');
var app = express(); // define our app using express
var port = 8082;        // set our port
var router = express.Router(); // get an instance of the express Router

//Get Instances of a few models for the purpose of the route
var Administrators = require('./models/Administrators');
var Patients = require('./models/PatientProfiles');
var Physiotherapest = require('./models/Physiotherapests.js');

//Geting Instances of values for Authentication Purposes
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
const config = require('./config/database');
const jwt = require('jsonwebtoken');

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

//Registering routes
app.use('/', router);

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
require('./config/passportAdmin')(passport);
require('./config/passportPhysio')(passport);

//IMPORT OUR ROUTES ---------------------------------
var photos = require('./routes/images'); 
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
var rehabClientLink = require('./routes/rehabClientLinks');

// REGISTER OUR ROUTES -------------------------------
app.use('/images', photos);
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
app.use('/rehabClientLink', rehabClientLink);

//Routes for our API
router.route('/authenticate')
    .post(function (request, response, next) {
        // response.write("false");

        console.log("sdsd");
        
        // response.json({success: false, msg: 'User not found'});

        const email = request.body.email;
        const password = request.body.password;

        Administrators.getUserByEmail(email, (err, admin) => {
            if(err) throw err;

            if(admin){
                Administrators.comparePassword(password, admin.account.encryptedPassword, (err, isMatch) => {
                    if(err) throw err;
    
                    if(isMatch){
                        const token = jwt.sign({data:admin}, config.secret, { 
                            expiresIn: 36000 //10 hours
                        });

                        response.json({ 
                            success: true,
                            token: 'JWT ' + token,
                            user: admin
                        });
                        // return response.send();
    
                    } else{ 
                        response.json({success: false, msg: 'Wrong Password'});
                        // return response.send();
                    }
                });
            } 
        });
        // return response.send();
        

        Patients.getUserByEmail(email, (err, client) => {
            if(err) throw err;
            
            if(client){
                Patients.comparePassword(password, client.account.encryptedPassword, (err, isMatch) => {
                        if(err) throw err;
    
                        if(isMatch){
                            const token = jwt.sign({data:client}, config.secret, { 
                                expiresIn: 36000 //10 hours
                            });
                            
                            response.json({ 
                                success: true,
                                token: 'JWT ' + token,
                                user: client
                            });
                                console.log("asdjkasdjkaksdjasd");
                        } else{ 
                            response.json({success: false, msg: 'Wrong Password'});
                            return response.send();
                        }
                    });
                } 
            });
        
            // return response.send();

        Physiotherapest.getUserByEmail(email, (err, physio) => {
                if(err) throw err;

                if(physio){
                    Physiotherapest.comparePassword(password, physio.account.encryptedPassword, (err, isMatch) => {
                        if(err) throw err;
    
                        if(isMatch){
                            const token = jwt.sign({data:physio}, config.secret, { 
                                expiresIn: 36000 //10 hours
                            });
    
                            response.json({ 
                                success: true,
                                token: 'JWT ' + token,
                                user: physio
                            });
                            return response.send();
    
                        } else{ 
                            response.json({success: false, msg: 'Wrong Password'});
                            return response.send();
                        }
                    });
                } 
            });
});


//connect to mongoDB
mongoose.connect('mongodb://localhost/selfStart', { useMongoClient: true });

// START THE SERVER
// =============================================================================
app.listen(port, function() {
    console.log('Magic happens on port ' + port);
});
