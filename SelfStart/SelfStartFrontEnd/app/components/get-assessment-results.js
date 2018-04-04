import Component from '@ember/component';

export default Component.extend({

    DS: Ember.inject.service('store'),
    ID: "5ac54ced216555175846b082",
    open:false,
    notOpen:true,

    assessmentModel: Ember.computed(function(){
        var id = this.get("rehab")[this.get("count")].get("assessment-test").get("id");
        return this.get('DS').find('assessment-test', this.get('id'));
    }),

    actions:{
        Open(){
            this.set("open", true);
            this.set("notOpen",false);
        }
    }
});
