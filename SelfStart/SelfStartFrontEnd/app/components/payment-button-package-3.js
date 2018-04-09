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

          var finalTransaction = ["Package 3", date, total];

          //Still need thisClient
          thisClient.transactions.pushObject(finalTransaction);
        });
      }
    }, '#paypal-button-container-package-3');
  }
});
