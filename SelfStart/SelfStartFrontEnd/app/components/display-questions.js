import Component from '@ember/component';

export default Component.extend({
    DS: Ember.inject.service('store'),
    questionNumber: 54,


    formModel: Ember.computed(function(){
        return this.get('DS').find('form', this.get('id'));
    }),

    actions:{
        Submit(){

            var question = this.get('aa');
            console.log(question);

            // let arr = [];
            // let form = this.get('DS').find('form', this.get('id')).then((frm) =>{
            //     frm.get('questions').forEach(function(element) {
            //         arr.pushObject(element.get('questionText'));
            //     });
            // });
            // console.log(arr);
            // arr.forEach(function(q) {
            //     console.log("dvsd");
            // });
            //  console.log(arr.objectAt(1));
            
           // let answer = this.get('DS').createRecord('answer', {
          //      answer: "d",
               // patient:this.get(''),
               // question: element,
              //  form: frm,
          //    });
        
            //  answer.save().then(() =>{});
        
        }
    }

});