import Component from '@ember/component';

export default Component.extend({
  genderSelected: false,
  countrySelected: false,
  provinceSelected: false,
  model: null,

  actions: {
    genderSelect: function(){
      this.set('genderSelected', true);
      this.set('countrySelected', false);
      this.set('provinceSelected', false);
    },
    countrySelect: function(){
      this.set('countrySelected', true);
      this.set('genderSelected', false);
      this.set('provinceSelected', false);
    },
    provinceSelect: function(){
      this.set('provinceSelected', true);
      this.set('genderSelected', false);
      this.set('countrySelected', false);
    },
  }
});
