import Component from '@ember/component';

export default Component.extend({

    DS: Ember.inject.service('store'),
    ID: "5abfeb9cda17a420b84b2591",
    open:false,
    notOpen:true,

    assessmentModel: Ember.computed(function(){
     //   var id = this.get("patient").get("rehabclientlink")[this.get("element")].get("assessment-test").get("id");
        return this.get('DS').find('assessment-test', this.get('ID'));
    }),

    actions:{
        Open(){
            this.set("open", true);
            this.set("notOpen",false);
        }
    }
});
