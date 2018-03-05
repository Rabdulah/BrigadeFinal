import Component from '@ember/component';
import $ from 'jquery';

export default Component.extend({

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

  didRender() {
    this._super(...arguments);


  },

  actions: {

  },
});


