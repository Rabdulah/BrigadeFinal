import Component from '@ember/component';

export default Component.extend({
    
    actions: {
        submit: function() {
            console.log(this.get('UName'));
            
        }
    }
});
