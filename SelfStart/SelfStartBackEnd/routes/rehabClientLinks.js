var express = require('express');
var router = express.Router();
var RehabLinker = require('../models/RehabClientLink');

router.route('/')
    .post( function (request, response) {
        var rehabLinker = new RehabLinker.Model(request.body.rehabLinker);
        rehabLinker.save(function (error) {
            if (error) response.send(error);
            response.json({rehabLinker: rehabLinker});
        });
    })
    .get( function (request, response) {
        RehabLinker.Model.find(function (error, rehabLinkers) {
            if (error) {
                response.send(error);
            } else {
            response.json({rehabLinker: rehabLinkers});
            }
        });
    });
    
router.route('/:rehabilitation_id')
    .get( function (request, response) {
        RehabLinker.Model.findById(request.params.rehabLinkers_id, function (error, rehabLinkers) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({rehabLinker: rehabLinkers});
            }
        });
    })
   
    .put( function (request, response) {
        RehabLinker.Model.findById(request.params.exer_id, function (error, rehabLinker) {
            if (error) {
                response.send({error: error});
            }
            else {

                // update each attribute
                rehabLinker.RehabilitationPlan = request.body.rehabLinker.RehabilitationPlan;
                rehabLinker.Patient = request.body.rehabLinker.Patient;
                rehabLinker.terminated = request.body.rehabLinker.terminated;

                rehabLinker.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({rehabLinker: rehabLinker});
                    }
                });
            }
        });
    })
    
    // .delete( function (request, response) {
    //     RehabLinker.Model.findByIdAndRemove(request.params.rehabLinkers_id,
    //         function (error, deleted) {
    //             if (!error) {
    //                 response.json({rehabLinker: deleted});
    //             }
    //         }
    //     );
    // });

module.exports = router;