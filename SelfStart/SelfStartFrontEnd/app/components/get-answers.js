import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({

  DS: inject('store'),
  SAanswer:"",
  rateValue: 0,
  mcop1: 0,
  mcop2: 0,
  mcop3: 0,
  mcop4: 0,
  mcop5: 0,
  mcop6: 0,

  init(){
    this._super(...arguments);
    console.get(this.get("assessment").get('answer').get('answer'));
  },

  actions: {
    ratingSave(rv) {

      this.set('rateValue', rv);

      var temp = [];
      this.get("assessment").get('answer').forEach(element => {
        temp.push(element.get('answer'));
      });

      temp[this.get("qNumber")] = this.get('rateValue');
      // this.get("assessment").get('answers').clear();

      for(var x = 0; x < temp.length; x++){

        this.get("assessment").get('answers').push(temp[x]);
      }

      console.log( this.get("assessment").get('answers'));

      this.get('DS').findRecord('assessment-test', this.assessid).then((rec) => {
        rec.save().then(()=>{
        });
      });
    },

    TFtrue() {
      var temp = [];
      this.get("assessment").get('answers').forEach(element => {
        temp.push(element);
      });
      temp[this.get("qNumber")] = "True";
      this.get("assessment").get('answers').clear();

      for(var x = 0; x < temp.length; x++){

        this.get("assessment").get('answers').push(temp[x]);
      }

      console.log( this.get("assessment").get('answers'));

      this.get('DS').findRecord('assessment-test', this.assessid).then((rec) => {
        rec.save().then(()=>{
        });
      });
    },

    TFfalse() {
      var temp = [];
      this.get("assessment").get('answers').forEach(element => {
        temp.push(element);
      });
      temp[this.get("qNumber")] = "False";
      this.get("assessment").get('answers').clear();

      for(var x = 0; x < temp.length; x++){

        this.get("assessment").get('answers').push(temp[x]);
      }

      console.log( this.get("assessment").get('answers'));

      this.get('DS').findRecord('assessment-test', this.assessid).then((rec) => {
        rec.save().then(()=>{
        });
      });
    },

    saSave() {

      var temp = [];
      this.get("assessment").get('answers').forEach(element => {
        temp.push(element);
      });
      temp[this.get("qNumber")] = this.get("SAanswer");
      this.get("assessment").get('answers').clear();

      for(var x = 0; x < temp.length; x++){

        this.get("assessment").get('answers').push(temp[x]);
      }

      console.log( this.get("assessment").get('answers'));

      this.get('DS').findRecord('assessment-test', this.assessid).then((rec) => {
        rec.save().then(()=>{
        });
      });

    },

    mcop1Save() {
      var temp = [];
      this.get("assessment").get('answers').forEach(element => {
        temp.push(element);
      });
      temp[this.get("qNumber")] = "0";
      this.get("assessment").get('answers').clear();

      for(var x = 0; x < temp.length; x++){

        this.get("assessment").get('answers').push(temp[x]);
      }

      console.log( this.get("assessment").get('answers'));

      this.get('DS').findRecord('assessment-test', this.assessid).then((rec) => {
        rec.save().then(()=>{
        });
      });
    },

    mcop2Save() {
      var temp = [];
      this.get("assessment").get('answers').forEach(element => {
        temp.push(element);
      });
      temp[this.get("qNumber")] = "1";
      this.get("assessment").get('answers').clear();

      for(var x = 0; x < temp.length; x++){

        this.get("assessment").get('answers').push(temp[x]);
      }

      console.log( this.get("assessment").get('answers'));

      this.get('DS').findRecord('assessment-test', this.assessid).then((rec) => {
        rec.save().then(()=>{
        });
      });
    },

    mcop3Save() {
      var temp = [];
      this.get("assessment").get('answers').forEach(element => {
        temp.push(element);
      });
      temp[this.get("qNumber")] = "2";
      this.get("assessment").get('answers').clear();

      for(var x = 0; x < temp.length; x++){

        this.get("assessment").get('answers').push(temp[x]);
      }

      console.log( this.get("assessment").get('answers'));

      this.get('DS').findRecord('assessment-test', this.assessid).then((rec) => {
        rec.save().then(()=>{
        });
      });
    },

    mcop4Save() {
      var temp = [];
      this.get("assessment").get('answers').forEach(element => {
        temp.push(element);
      });

      temp[this.get("qNumber")] = "3";
      this.get("assessment").get('answers').clear();

      for(var x = 0; x < temp.length; x++){

        this.get("assessment").get('answers').push(temp[x]);
      }

      console.log( this.get("assessment").get('answers'));

      this.get('DS').findRecord('assessment-test', this.assessid).then((rec) => {
        rec.save().then(()=>{
        });
      });
    },

    mcop5Save() {
      var temp = [];
      this.get("assessment").get('4').forEach(element => {
        temp.push(element);
      });

      temp[this.get("qNumber")] = "True";
      this.get("assessment").get('answers').clear();

      for(var x = 0; x < temp.length; x++){

        this.get("assessment").get('answers').push(temp[x]);
      }

      console.log( this.get("assessment").get('answers'));

      this.get('DS').findRecord('assessment-test', this.assessid).then((rec) => {
        rec.save().then(()=>{
        });
      });
    },

    mcop6Save() {
      var temp = [];
      this.get("assessment").get('answers').forEach(element => {
        temp.push(element);
      });

      temp[this.get("qNumber")] = "5";
      this.get("assessment").get('answers').clear();

      for(var x = 0; x < temp.length; x++){

        this.get("assessment").get('answers').push(temp[x]);
      }
      console.log( this.get("assessment").get('answers'));

      this.get('DS').findRecord('assessment-test', this.assessid).then((rec) => {
        rec.save().then(()=>{
        });
      });
    },
  },

});
