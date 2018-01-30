var express = require('express');
var router = express.Router();
var Forms = require('../models/Forms');

router.route('/')
        .post(function (request, response) {
            var form = new Forms.Model(request.body.form);
            form.save(function (error) {
                if (error) response.send(error);
                response.json({form: form});
            });
        })
        
        .get(function (request, response) {
            Forms.Model.find(function (error, forms) {
                if (error) response.send(error);
                response.json({form: forms});
            });
        });

router.route('/:form_id')
        .get(function (request, response) {
            Forms.Model.findById(request.params.form_id, function (error, form) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({form: form});
                }
            });
        })
        
        .put(function (request, response) {
            Forms.Model.findById(request.params.form_id, function (error, form) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    
                    // update each attribute
                    form.name = request.body.form.name;
                    form.description = request.body.form.description;
                    form.author = request.body.form.author;
                    form.question = request.body.form.question;
                    form.assessmentTest = request.body.form.assessmentTest;
                    
                    form.save(function (error) {
                        if (error) {
                            response.send({error: error});
                        }
                        else {
                            response.json({form: form});
                        }
                    });
                }
            });
        })
        
        .delete(function (request, response) {
            Forms.Model.findByIdAndRemove(request.params.form_id, function (error, deleted) {
                if (!error) {
                    response.json({form: deleted});
                }
            });
        });
        
module.exports = router;
