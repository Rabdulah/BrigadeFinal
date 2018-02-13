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
            // var tName, tDescription = "";

            console.log(this.get('fName'));

            // let tName = this.get('fName');
            // let tDescription = this.get('fDescription');

            let newForm = this.get('DS').createRecord('form', {
                name: this.get('fName'),
                description: this.get('fDescription')
            });
            console.log(this.get('fDescription'));

            newForm.save().then(function() {
               return true;
            });
            this.set('isEditing', false);
            window.location.reload();
          }
    }
});
