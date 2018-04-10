import Component from '@ember/component';
import $ from 'jquery';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  tagName:'',
  DS: inject('store'),
  auth: inject('auth'),
  show: false,

  init() {
    this._super(...arguments);
    if(localStorage.getItem('sas-session-id')) {
      var email = this.get('auth').decrypt(localStorage.getItem('sas-session-id'));
      console.log(email);
      var myStore = this.get('store');
      var self = this;
      this.get('DS').queryRecord('physiotherapest', {filter: {"email": email}}).then(function (physio) {
        if (physio) {
          self.set('show', true);
        }
      });
    }
  },

  didInsertElement() {
    this._super(...arguments);

    var Skype=new function(){var t=[],e=!1,n="https://swc.cdn.skype.com/contactme/v/1.0.0/skype-uri.min.js";this.ui=function(a){for(var c=document.getElementsByTagName("script"),i=c.length,r=!1;i--;)if(c[i].src===n){r=!0;break}if(!r){var s=document.getElementsByTagName("head")[0],u=document.createElement("script");u.setAttribute("type","text/javascript"),u.setAttribute("src",n),u.onload=function(){e=!0;for(var n=t.length;n--;)SkypeButton.ui(t[n])},s.appendChild(u)}e?SkypeButton.ui(a):t.push(a)}};

    Skype.ui({
      "name": "chat",
      "element": "SkypeButton_Call",
      //Must have live:
      "participants": ["live:ramzi_abdullahi"],
      "imageSize": 24,
      "imageColor": "black"
    });

    $('body')
      .visibility({
        offset: -10,
        observeChanges: false,
        once: false,
        continuous: false,
        onTopPassed: function () {
          requestAnimationFrame(function () {
            $('.following.bar')
              .addClass('light fixed')
              .find('.menu')
              .removeClass('inverted');
            $('.following .additional.item')
              .transition('scale in', 750);
            $('.selfStart')
              .attr("src",'/assets/images/marcotte-self-start-bodysmartFINAL.png');
          });
        },
        onTopPassedReverse: function () {
          requestAnimationFrame(function () {
            $('.following.bar')
              .removeClass('light fixed')
              .find('.menu')
              .addClass('inverted')
              .find('.additional.item')
              .transition('hide');
            $('.selfStart')
              .attr("src",'/assets/images/home/Header.png');
          });
        }
      })
    ;
  },

  actions: {

  },
});
