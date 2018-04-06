import Component from '@ember/component';
import Ember from "ember";
import { computed } from '@ember/object';

export default Component.extend({
    store: Ember.inject.service(),
    allAnswers: [],
    matchedAnswers: [],
    averageRating: 0,
    ratingGroupCount: [10],

    init() {
        this._super(...arguments);
        let self = this;
        

        this.get('store').findAll('answer').then((ans) => {
            self.set('allAnswers', ans.toArray());
        })

        this.get('allAnswers').forEach(element => {
            if (element.get('question') === self.get('question').get('questionText')
            && self.get('question').get('type') == "Rating") {
                self.get('matchedAnswers').pushObject(element);
            }
        });

        this.get('matchedAnswers').forEach(ans => {
            self.set('averageRating', self.get('averageRating') + ans.get('answer'));

            if (ans.get('answer') == 1) {
                this.set('ratingGroupCount'[0], this.get('ratingGroupCount'[0]) + 1);
            }

            else if (ans.get('answer') == 2) {
                this.set('ratingGroupCount'[1], this.get('ratingGroupCount'[1]) + 1);
            }

            else if (ans.get('answer') == 3) {
                this.set('ratingGroupCount'[2], this.get('ratingGroupCount'[2]) + 1);
            }

            else if (ans.get('answer') == 4) {
                this.set('ratingGroupCount'[3], this.get('ratingGroupCount'[3]) + 1);
            }

            else if (ans.get('answer') == 5) {
                this.set('ratingGroupCount'[4], this.get('ratingGroupCount'[4]) + 1);
            }

            else if (ans.get('answer') == 6) {
                this.set('ratingGroupCount'[5], this.get('ratingGroupCount'[5]) + 1);
            }

            else if (ans.get('answer') == 7) {
                this.set('ratingGroupCount'[6], this.get('ratingGroupCount'[6]) + 1);
            }

            else if (ans.get('answer') == 8) {
                this.set('ratingGroupCount'[7], this.get('ratingGroupCount'[7]) + 1);
            }

            else if (ans.get('answer') == 9) {
                this.set('ratingGroupCount'[8], this.get('ratingGroupCount'[8]) + 1);
            }

            else if (ans.get('answer') == 10) {
                this.set('ratingGroupCount'[9], this.get('ratingGroupCount'[9]) + 1);
            }
        })

        self.set('averageRating', self.get('averageRating') / self.get('matchedAnswers').length);
    },
    actions: {
        openModal: function () {
            $('.ui.' + 'dataModal' + '.modal').modal({
                closable: false,
        
                transition: 'fly down',
        
                onDeny: () => {
                return true;

                },

                onApprove: () => {
                    window.print();
                }

            })
                .modal('show');
        },
    }
});
