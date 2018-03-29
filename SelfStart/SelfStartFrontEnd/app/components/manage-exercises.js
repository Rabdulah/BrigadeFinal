import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  tableView: false,
  cardView: true,

  actions: {
    tableView: function() {
      if(this.tableView) {
        this.set("tableView", false);
        this.set("cardView", true);
      } else {
        this.set("tableView", true);
        this.set("cardView", false);
      }
    },

    cardView: function() {
      console.log("sdsdf");
      if(this.cardView) {
        this.set("tableView", true);
        this.set("cardView", false);
      } else {
        this.set("tableView", false);
        this.set("cardView", true);
      }
    }
}

});