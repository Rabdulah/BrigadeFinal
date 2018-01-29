var express = require('express');
var router = express.Router();
var AskAPhysio = require('../models/AskAPhysio');

router.route('/')
    .post( function (request, response) {
        var ask = new AskAPhysio.Model(request.body.ask);
        ask.save(function (error) {
            if (error) response.send(error);
            response.json({ask: ask});
        });
    })
    .get( function (request, response) {
        AskAPhysio.Model.find(function (error, asks) {
            if (error) response.send(error);
            response.json({ask: asks});
        });
    });

router.route('/:askAPhysio_id')
    .get( function (request, response) {
        AskAPhysio.Model.findById(request.params.askAPhysio_id, function (error, ask) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({ask: ask});
            }
        });
    })
    .put( function (request, response) {
        AskAPhysio.Model.findById(request.params.askAPhysio_id, function (error, ask) {
            if (error) {
                response.send({error: error});
            }
            else {

                // update each attribute
                ask.firstName = request.body.ask.time;
                ask.lastName = request.body.ask.lastName;
                ask.email = request.body.ask.email;
                ask.comment = request.body.ask.comment;
                ask.patient = request.body.ask.patient;
  
                
                //SHOULD WE ADD FORM HERE?                
                ask.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({ask: ask});
                    }
                });
            }
        });
    })
    .delete( function (request, response) {
        AskAPhysio.Model.findByIdAndRemove(request.params.askAPhysio_id,
            function (error, deleted) {
                if (!error) {
                    response.json({ask: deleted});
                }
            }
        );
    });
    
    

module.exports = router;
