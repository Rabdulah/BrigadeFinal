var express = require('express');
var router = express.Router();
var Patients = require('../models/PatientProfiles');

router.route('/')
    .post( function (request, response) {
        var patient = new Patients.Model(request.body.patient);
        patient.save(function (error) {
            if (error) response.send(error);
            response.json({patient: patient});
        });
    })
    .get( function (request, response) {
        Patients.Model.find(function (error, patients) {
            if (error) response.send(error);
            response.json({patient: patients});
        });
    });

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
                patient.occupation = request.body.patient.occupation;
                patient.maritalStatus = request.body.patient.maritalStatus;
                patient.gender = request.body.patient.gender;
                patient.country = request.body.patient.country;
                patient.province = request.body.patient.province;
                patient.city = request.body.patient.city;
                patient.apartment = request.body.patient.apartment;
                patient.streetNumber = request.body.patient.streetNumber;
                patient.postalCode = request.body.patient.postalCode;
                patient.answer = request.body.patient.answer;
                // patient.account = request.body.patient.account;
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