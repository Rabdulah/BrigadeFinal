import DS from 'ember-data';
import { empty } from '@ember/object/computed';

export default DS.Model.extend({
    form: DS.belongsTo("form"),
    questions: DS.hasMany('question'),
    answers: DS.hasMany('answer'),
    rehabPlan: DS.belongsTo('rehabilitationplan')
});

//SEND FORM BUTTON
// create record assessmenttest
// questions = form.questions
// answers empty
// patient = thispatient

//Client fills out form and answers are loaded into test array
