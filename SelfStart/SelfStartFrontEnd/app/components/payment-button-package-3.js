import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  client: null,
  DS: inject('store'),
  auth: inject('auth'),

  init() {
    this._super(...arguments);
    let self = this;
    let eemail = localStorage.getItem('sas-session-id');
    eemail = this.get('auth').decrypt(eemail);
    this.get('DS').queryRecord('patient', {filter: {'email' : eemail}}).then(function (obj) {
      self.set('client', obj);
      console.log(self.get('client'));
    });

  },

  didRender : function() {
    let self = this;
    this._super(...arguments);
    paypal.Button.render({
      env: 'sandbox', // sandbox | production
// PayPal Client IDs - replace with your own
      client: {
        sandbox: 'AbdHTHtFqF1NS-TGHJYjER6WD91YBa-6784rZAGmZZMb7iUbS9UJbYDkrqdKBUWsk8rTKeiJM7NwjKax',
        production: ''
      },
// Show the buyer a 'Pay Now' button in the checkout flow
      commit: true,
// payment() is called when the button is clicked
      payment: function(data, actions) {
        var price = 550;
// Make a call to the REST api to create the payment
        return actions.payment.create({
          payment: {
            transactions: [{ amount: { total: price, currency: 'CAD' }}]
          }
        });
      },
// onAuthorize() is called when the buyer approves the payment
      onAuthorize: function(data, actions) {
// Make a call to the REST api to execute the payment
        return actions.payment.execute().then(function(transaction) {
          var trans = JSON.stringify(transaction);

          var index = trans.lastIndexOf('create_time":"');
          var date = trans.substring(index + 14,index + 34);

          index = trans.lastIndexOf('{"total":"');
          var total = trans.substring(index + 10,index + 16);

          var finalTransaction = []//Ember.createObject({"Package 3", date, total});
          finalTransaction["package"] = "Package 3";
          finalTransaction["date"] = date;
          finalTransaction["amount"] = total;

          self.get('DS').findRecord('patient', self.get('client').get('id')).then((cli) => {
            let length = cli.get('transactions').length;
            var temp = cli.get('transactions');
            temp.pushObject(finalTransaction);
            cli.set('transactions', temp);
            cli.save().then( obj => {
              self.get('DS').findRecord('patient', self.get('client').get('id')).then((cli) => { 
                let item = cli.get('transactions')[length];
                Ember.set(item, 'package', "Package 3");
                Ember.set(item, 'date', date);
                Ember.set(item, 'amount', total);
                cli.save();
              })
            })
          })
        });
      }
    }, '#paypal-button-container-package-3');
  }
});
