import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
    DS: inject('store'),
    AllPatients: null,
    UserName: null,
    Password: null,
    FamilyName: null,
    GivenName: null,
    IEmail: null,
    DateOfBirth: null,
    PhoneNumber: null,
    HealthCardNumber: null,
    Occupation: null,
    MaritalStatus: null,
    Gender: null,
    Country: null,
    ICity: null,
    Province: null,
    StreetNumber: null,
    StreetName: null,
    PostalCode: null,
    Appartment: null,

    actions: {
        submit: function() {

            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!re.test(this.get('Email'))) {
                console.log("BAD EMAIL");
                return false;
            } 

            this.set("UserName", this.get('UName'));
            this.set("Password", this.get('PWord'));
            this.set("FamilyName", this.get('FName'));
            this.set("GivenName", this.get('GName'));
            this.set("IEmail", this.get('Email'));
            this.set("DateOfBirth", this.get('DOB'));
            this.set("PhoneNumber", this.get('PNumber'));
            this.set("HealthCardNumber", this.get('HCN'));
            this.set("Occupation", this.get('Occ'));
            this.set("MaritalStatus", this.get('MStatus'));
            this.set('Gender', this.get('GDer'));
            this.set("Country", this.get('Ctry'));
            this.set("ICity", this.get('City'));
            this.set("Province", this.get('Prov'));
            this.set("Appartment", this.get('Apptmnt'));
            this.set("StreetNumber", this.get('SNumber'));
            this.set("StreetName", this.get('SName'));
            this.set("PostalCode", this.get('PCode'));
            
            let acc = {};
            acc['userAccountName'] = this.UserName;
            acc['encryptedPassword'] = this.Password;
            console.log(this.Password);

            let client = this.get('DS').createRecord('patient', {
                familyName: this.FamilyName,
                givenName: this.GivenName,
                email: this.IEmail,
                dateOfBirth: this.DateOfBirth,
                phoneNumber: this.PhoneNumber,
                healthCardNumber: this.HealthCardNumber,
                occupation: this.Occupation,
                maritalStatus: this.MaritalStatus,
                gender: this.Gender,
                country: this.Country,
                cities: this.ICity,
                provinces: this.Province,
                apartment: this.Appartment,
                streetNumber: this.StreetNumber,
                streetName: this.StreetName,
                postalCode: this.PostalCode,
                account: {
                    userAccountName: this.UserName,
                    encryptedPassword: this.Password
                }
            });

            console.log("asdasda", client);

            client.save().then((client) => {
                console.log("IN THEN");
                if(client) {
                    console.log("Success", client);
                }
            });
        }
    }
});
