import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
    DS: inject('store'),

    isEditing: false,

    actions: {
        addForm (){
            this.set('isEditing', true);
        },
      
        cancel: function () {
            this.set('isEditing', false);
        },

        submit: function () {
  
            let self = this;
    console.log(this.get('DS'));
            let assesmentTest = this.get('DS').createRecord('assesmentTest', {
                name: self.get('name'),
                description: self.get('description'),
                // author: self.get('fAuthor')
            });
      
            assesmentTest.save().then(function() {
              this.set('isEditing', false);
              return true;
            });
          }
    }
});
