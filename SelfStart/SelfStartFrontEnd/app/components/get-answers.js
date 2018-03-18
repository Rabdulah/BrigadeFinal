import Component from '@ember/component';

export default Component.extend({
    SAanswer:"",
    rateValue: 0,
    TFtrue: 0,
    TFfalse: 0,
    mcop1: 0,
    mcop2: 0,
    mcop3: 0,
    mcop4: 0,
    mcop5: 0,
    mcop6: 0,

    actions: {
        ratingSave() {

        },

        TFtrue() {

        },

        TFfalse() {

        },

        saSave() {
        this.get('assessment').get('answers').indexOf(this.get('qNumber')) = SAanswer; 
          

        },

        mcop1Save() {

        },

        mcop2Save() {

        },

        mcop3Save() {

        },

        mcop4Save() {

        },

        mcop5Save() {

        },

        mcop6Save() {

        },
    },

});
