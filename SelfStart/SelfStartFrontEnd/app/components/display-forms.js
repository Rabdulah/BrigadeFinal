import Component from '@ember/component';

export default Component.extend({
  formView: true,
  questionView:false,
  formState: "active",
  questionState: "",

  actions: {
    form(){
      this.set('formView', true);
      this.set('questionView', false);
      this.set('formState', "active");
      this.set('questionState', "");
    },
    question(){
      this.set('formView', false);
      this.set('questionView', true);
      this.set('formState', "");
      this.set('questionState', "active");
    }
  }

});
