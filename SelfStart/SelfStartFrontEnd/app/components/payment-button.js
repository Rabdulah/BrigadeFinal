import Component from '@ember/component';

export default Component.extend({
  didRender : function() {
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
        var test = 150;
// Make a call to the REST api to create the payment
        return actions.payment.create({
          payment: {
            transactions: [{ amount: { total: test, currency: 'CAD' }}]
          }
        });
      },
// onAuthorize() is called when the buyer approves the payment
      onAuthorize: function(data, actions) {
// Make a call to the REST api to execute the payment
        return actions.payment.execute().then(function(transaction) {
          window.alert(JSON.stringify(transaction));
        });
      }
    }, '#paypal-button-container');
  }
});
