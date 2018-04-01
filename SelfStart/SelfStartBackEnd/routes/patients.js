var express = require('express');
var router = express.Router();
var Patients = require('../models/PatientProfiles');
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
const config = require('../config/database');
const jwt = require('jsonwebtoken');

router.route('/')
    .post( function (request, response) {
        var patient = new Patients.Model(request.body.patient);

        Patients.getUserByEmail(patient.email, (err, client) =>{
            if(client) {
                response.json({success: false, msg: 'User already registered'});
            }
        });

        Patients.addClient(patient, (err, patient) => {
            console.log("ASDJKkajsdkjsajkd");
            if(err) {
                response.json({success: false, msg: 'Failed to register client'});
            } else{
                console.log("ewae");
                Patients.sendEmail(patient);
                response.json({patient: patient});
            }
        });

        // patient.save(function (error) {
        //     if (error) response.send(error);
        //     response.json({patient: patient});
        // });

    })
    .get( function (request, response) {
        let {limit, offset, sort, dir, queryPath, regex} = request.query;
        if(!limit) {
            Patients.Model.find(function (error, patients) {
                if (error) response.send(error);
                response.json({patient: patients});
            });
        }
        else {
            //  let users = schema.users.all().models;
            //  let users = Users.Model;

            offset = Number(offset || 0);
            limit = Number(limit || 10);
            dir = dir || 'asc';
            sort = sort || 'id';

            let query = {};
            if (regex !== '')
                query[queryPath] = new RegExp(regex, "i");

            var sortOrder = sort;
            if (sortOrder) {
                if (dir !== 'asc') {
                    sortOrder = '-' + sort;
                }
            }

            let options = {
                sort: sortOrder,
                lean: true,
                offset: offset,
                limit: limit
            };

            Patients.Model.paginate(query, options, function (error, patients) {
                if (error) response.send(error);
                response.json({patient: patients.docs});
            });
        }
    });

// router.route('/Authenticate')
//     .post( function (request, response) {
//         const email = request.body.email;
//         const password = request.body.password;

//         Patients.getUserByEmail(email, (err, client) => {
//             if(err) throw err;

//             if(!client){
//                 return response.json({success: false, msg: 'User not found'});
//             }

//             Patients.comparePassword(password, client.account.encryptedPassword, (err, isMatch) => {
//                 if(err) throw err;

//                 if(isMatch){
//                     const token = jwt.sign({data:client}, config.secret, {
//                         expiresIn: 36000 //10 hours
//                     });

//                     response.json({
//                         success: true,
//                         token: 'JWT ' + token,
//                         client: client
//                     });

//                 } else{
//                     return response.json({success: false, msg: 'Wrong Password'});
//                 }


//             });
//         });
//     });

// router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res,) => {
//     res.json({client: req.user});
// })

// router.route('/:email')
//
//     .get( function (request, response) {
//
//         Patients.getUserByEmail(request.params.email, function (error, patient) {
//             if (error) {
//                 response.send({error: error});
//             }
//             else {
//                 response.json({success: true, patient: patient});
//             }
//         });
//     });

router.route('/:patient_id')

    .get( function (request, response) {

        Patients.Model.findById(request.params.patient_id, function (error, patient) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({patient: patient});
            }
        });
    })
    .put( function (request, response) {
        Patients.Model.findById(request.params.patient_id, function (error, patient) {
            if (error) {
                response.send({error: error});
            }
            else {

                // update each attribute
                patient.ID = request.body.patient.ID;
                patient.familyName = request.body.patient.familyName;
                patient.givenName = request.body.patient.givenName;
                patient.email = request.body.patient.email;
                patient.dateOfBirth = request.body.patient.dateOfBirth;
                patient.phoneNumber = request.body.patient.phoneNumber;
                patient.healthCardNumber = request.body.patient.healthCardNumber;
                patient.gender = request.body.patient.gender;
                patient.country = request.body.patient.country;
                patient.province = request.body.patient.province;
                patient.city = request.body.patient.city;
                patient.apartment = request.body.patient.apartment;
                patient.streetNumber = request.body.patient.streetNumber;
                patient.postalCode = request.body.patient.postalCode;
                patient.appointments = request.body.patient.appointments;
                patient.rehablink = request.body.patient.rehablink;
                patient.introTest = request.body.patient.introTest;
                patient.answer = request.body.patient.answer;
                // patient.account = request.body.patient.account;

                patient.account = request.body.patient.account;

                // patient.payments = request.body.patient.payments;
                // patient.appointments = request.body.patient.appointments;
                // patient.plan = request.body.patient.plan;


                patient.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({patient: patient});
                    }
                });
            }
        });
    })
    .delete( function (request, response) {
        Patients.Model.findByIdAndRemove(request.params.patient_id,
            function (error, deleted) {
                if (!error) {
                    response.json({patient: deleted});
                }
            }
        );
    });

module.exports = router;