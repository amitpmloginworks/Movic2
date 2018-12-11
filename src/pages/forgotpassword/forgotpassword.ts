import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';
import { ChangepasswordPagePage} from '../changepassword/changepassword';

/*
  Generated class for the ForgotpasswordPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html'
})
export class ForgotpasswordPagePage {
  public email:any;
  public response:any;
  public successOrFailure:any;
  public loader:any;
  public show:any;
  public showValidate:any;
  public pincode:any;
  public userHash:any;
  public emailRegEx: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage,
   public alertCtrl:AlertController, public http:Http, public loadingCtrl:LoadingController, public keyboard:Keyboard) {
    this.show=1;
    this.showValidate=0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswordPagePage');

  }


request(email) {
this.email=email;
   if (email == undefined) {

      this.presentAlert("Please Enter Email");
    }
    else if (email.trim() == '') {

      this.presentAlert("Please Enter Email");
    }
    else if (!this.emailRegEx.test(email.trim())) {

      this.presentAlert("Please Enter Valid Email");

    }
    else {
    this.submitEmail()

      
    }
    
}


submitEmail(){


var postingParams = JSON.stringify({ 
  "email": this.email,
  });

  console.log('postiong params '+postingParams);

this.presentLoading();
var url = 'http://88.198.133.25/movic2/api/forgotPassword';

this.http.post(url, postingParams)
             .map(res => res.json())
              .subscribe(data => {
                  this.response = data;
                  console.log("Data : "+this.response);
               this.successOrFailure=data.api_response;
          
               console.log('api response '+this.successOrFailure);
               if(this.successOrFailure==1){
                   this.show='0';
                   this.pincode='';
                 this.presentAlert('Pincode is sent to your registered email id successfully');
              
               }
               else if(this.successOrFailure==0){
                   this.email='';
                this.pincode='';
                 this.presentAlert('Email is not registered');

               }
this.loader.dismiss();
              })

}

validate(pincode){
this.pincode=pincode;

var postingParams = JSON.stringify({ 
  "pincode":this.pincode,
  "email": this.email,
  });

  console.log('postiong params '+postingParams);


var url = 'http://88.198.133.25/movic2/api/validatePincode';
this.presentLoading();
this.http.post(url, postingParams)
             .map(res => res.json())
              .subscribe(data => {
                  this.response = data;
                  console.log("Data : "+this.response);
               this.successOrFailure=data.api_response;
              this.userHash=data.userHash;

               console.log('api response '+this.successOrFailure);
               console.log('user hash '+this.userHash);
               this.storage.set('userHash',this.userHash);
               if(this.successOrFailure==1){
                this.email='';
                this.pincode='';
                this.navCtrl.pop({ animate: true, duration: 5 });
                 this.navCtrl.push(ChangepasswordPagePage,{'userHash':this.userHash
            
                 })
               }
               else if(this.successOrFailure==0){
                 this.presentAlert('pincode is  invalid');
               }
            this.loader.dismiss();
              })

}

onKeyDown(e) {
    if (e.keyCode == 13) {
      console.log('Should Close Keyboard');
      this.keyboard.close();
    }
  }
  presentAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Dear User',
      subTitle: msg,
      buttons: [
        {
          text: 'Okay',
          handler: data => {
            console.log('Okay Clicked');
          }
        }
      ]
    });
    alert.present();
  }
   presentLoading() {
    //console.log('Loading...');
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 4000
    });
   this.loader.present();
  }
}
