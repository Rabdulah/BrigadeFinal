var express = require('express');
var router = express.Router();
var Countries = require('../models/Countries');

router.route('/')
    .post( function (request, response) {
        var country = new Countries.Model(request.body.country);
        country.save(function (error) {
            if (error) response.send(error);
            response.json({country: country});
        });
    })
    .get( function (request, response) {
        Countries.Model.find(function (error, countries) {
            if (error) response.send(error);
            response.json({country: countries});
        });
    });

router.route('/:country_id')
    .get( function (request, response) {
        Countries.Model.findById(request.params.country_id, function (error, country) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({country: country});
            }
        });
    })
    .put( function (request, response) {
        Countries.Model.findById(request.params.country_id, function (error, country) {
            if (error) {
                response.send({error: error});
            }
            else {

                // update each attribute
                country.name = request.body.country.name;
                country.provinces = request.body.country.provinces;
                      
                country.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({country: country});
                    }
                });
            }
        });
    })
    .delete( function (request, response) {
        Countries.Model.findByIdAndRemove(request.params.country_id,
            function (error, deleted) {
                if (!error) {
                    response.json({country: deleted});
                }
            }
        );
    });
    
module.exports = router;