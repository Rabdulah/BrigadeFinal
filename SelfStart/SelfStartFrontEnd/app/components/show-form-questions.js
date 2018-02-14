import Component from '@ember/component';

export default Component.extend({
    actions:{
        removeQuestion(q, f, qid, fid){
            f.get('questions').removeObject(q);
            q.get('forms').removeObject(f);

            this.get('DS').findRecord('form', this.get('fid')).then((rec) => {
                rec.save().then(()=>{
                });
              });
          
            this.get('DS').findRecord('question', this.get('qid')).then((rec) => {
                rec.save().then(()=>{
                });
              });
        }

      


    },
});
