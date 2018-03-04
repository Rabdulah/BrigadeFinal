import Service from '@ember/service';

export default Service.extend({
    token: null,
    authenticate(log, pass){
        return Ember.$.ajax({
            method: 'POST',
            url: '/token',
            data: {username: log, password: pass}

        }).then((info) => {
            if(info){
                this.set('token', info.access_token);
            } else{
                console.log('error');
            }
            
        });
    }
});
