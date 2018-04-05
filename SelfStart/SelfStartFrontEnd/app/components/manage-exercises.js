import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  tableView: false,
  cardView: true,
  play: false,
  DS: inject('store'),

  actions: {
    tableView: function() {
      console.log("sdsdf");
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
    },

    play: function(Exercise){
      console.log("askjdajsd");
      this.set("play", true);
      Exercise.set("play", true);
      // exercise.get("play")
      // console.log(document.getElementById(index));

    },

    pause: function(Exercise) {
      console.log("leave");
      // this.set("play", false);
      Exercise.set("play", false);
      // this.get('DS').findRecord('exercise' , Exercise.get('ID')).then((rec)=>{
      //     rec.set('play', false);
      // });
    }
  }

});
