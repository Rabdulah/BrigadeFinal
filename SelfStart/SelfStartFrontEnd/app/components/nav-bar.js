import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({

  DS: inject('store'),

  model: null,
  loggedOut: !localStorage.getItem('loggedIn'),
  ajax: Ember.inject.service(),
  temp: false,

  authentication() {
    if(localStorage.getItem('temp')) {
      return this.get('ajax').request('http://localhost:8082/Authenticate', {
        method: 'POST',
        data: {
          email: this.get('Email'),
          password: this.get('PWord')
        },
        success: function(res) {
          localStorage.setItem('id_token', res.token);
          localStorage.setItem('user_level', res.user.account.accType);
          localStorage.setItem('_id', res.user._id);
          localStorage.setItem('loggedIn', true);
        }
      });
    } else {
      console.log("NOT AN ACC");
    }
  },


  didRender() {
    this._super(...arguments);

    var Skype=new function(){var t=[],e=!1,n="https://swc.cdn.skype.com/contactme/v/1.0.0/skype-uri.min.js";this.ui=function(a){for(var c=document.getElementsByTagName("script"),i=c.length,r=!1;i--;)if(c[i].src===n){r=!0;break}if(!r){var s=document.getElementsByTagName("head")[0],u=document.createElement("script");u.setAttribute("type","text/javascript"),u.setAttribute("src",n),u.onload=function(){e=!0;for(var n=t.length;n--;)SkypeButton.ui(t[n])},s.appendChild(u)}e?SkypeButton.ui(a):t.push(a)}};

  Skype.ui({
  "name": "chat",
  "element": "SkypeButton_Call",
  "participants": ["ramzi_abdullahi"],
  "imageSize": 24,
  "imageColor": "white"
  });

    // if(localStorage.getItem('loggedIn')){
    //   this.set('loggedOut', false);
    // }
  },

  init() {
    this._super(...arguments);

    if ($(window).width() > 600) {
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
            });
          }
        })
      ;
    }
    $('.additional.item')
      .popup({
        delay: {
          show: 200,
          hide: 50
        },
        position: 'bottom center'
      });

    var $menu = $('#toc'),
      $tocSticky = $('.toc .ui.sticky'),
      $fullHeightContainer = $('.pusher > .full.height')
    ;

    // create sidebar sticky
    requestAnimationFrame(function () {
        $tocSticky
          .sticky({
            silent: true,
            container: $('html'),
            context: $fullHeightContainer
          })
        ;
      }
    )
    ;

    // main sidebar
    $menu
      .sidebar({
        dimPage: true,
        transition: 'overlay',
        mobileTransition: 'uncover'
      })
    ;

    // launch buttons
    $menu
      .sidebar('attach events', '.launch.button, .view-ui, .launch.item')
    ;

  },

  actions: {
    logout: function () {
      localStorage.clear();
      // localStorage.setItem('loggedIn', false);
      this.set('loggedOut', true);
      // console.log(this.loggedOut)
    },
    deny(){
      $('.ui.login.modal').modal('hide');
    },
    submit(){
      localStorage.setItem('temp', false);
      this.get('ajax').request('http://localhost:8082/patients/' + this.get('Email'), {
        method: 'GET',
        success: function (res) {
          console.log(res);
          if (res.patient) {
            console.log("THIS IS A CLIENT");
            localStorage.setItem('temp', true);
          }
        }
      });
      this.get('ajax').request('http://localhost:8082/administrators/' + this.get('Email'), {
        method: 'GET',
        success: function(res) {
          if(res.admin) {
            console.log("THIS IS A Admin");
            localStorage.setItem('temp', true);
          }
        }
      });

      this.get('ajax').request('http://localhost:8082/physiotherapests/' + this.get('Email'), {
        method: 'GET',
        success: function(res) {
          if(res.physio) {
            console.log("THIS IS A Physio");
            localStorage.setItem('temp', true);
          }
        }
      });

      // if(localStorage.getItem('temp')) {
      this.authentication();
      this.set('loggedOut', false);
      $('.ui.login.modal').modal('hide');
      // } else {
      // console.log("NOT AN ACCOUNT");
      // }
    },

    openModal: function ()  {

      $('.ui.login.modal').modal({
        // closable: false,

      }).modal('show')
    },
  }
});


