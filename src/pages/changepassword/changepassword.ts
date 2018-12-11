import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import {SigninPagePage} from '../signin/signin';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {Storage} from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';
/*
  Generated class for the ChangepasswordPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html'
})
export class ChangepasswordPagePage {

public newPassword:any;
public newPassword1:any;
public response:any;
public userHash:any;
public successOrFailure:any;
public loader:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController,
   public http:Http, public storage:Storage, public loadingCtrl:LoadingController, public keyboard:Keyboard) {
    this.storage.get('userHash').then((val) => {
      this.userHash=val;
      console.log('userHash '+this.userHash);
    });
    console.log('userHash '+this.userHash);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPagePage');
  }

changePassword(newPassword, newPassword1) {
this.newPassword=newPassword;
this.newPassword=newPassword1;
 if(this.newPassword== undefined){
      this.presentAlert('Please Enter password');
    }
    else if(this.newPassword.trim()== ''){
      this.presentAlert('Please Enter password');
    }

    else if(this.newPassword.trim().length < 8) {

      this.presentAlert('Please Enter Password');
    }

    else if(this.newPassword1 == undefined) {

      this.presentAlert('Please Enter Confirm Password');
    }
    else if(this.newPassword1.trim().length < 8) {

      this.presentAlert("Please Enter At least 8 Characters");
    }
    else if(this.newPassword.trim() != this.newPassword1.trim()) {

      this.presentAlert(" Password and Confirm Password are not same");

    }
    else{ 

 this.postData();

    }

}


postData(){
  
var postingParams = JSON.stringify({ 
  "password":this.newPassword,
  "userHash": this.userHash,
  });

  console.log('posting params '+postingParams);


var url = 'http://88.198.133.25/movic2/api/changePassword';
this.presentLoading();
this.http.post(url, postingParams)
             .map(res => res.json())
              .subscribe(data => {
                  this.response = data;
                  console.log("Data : "+this.response);
               this.successOrFailure=data.api_response;
               console.log('api response '+this.successOrFailure);
               console.log('user hash '+this.userHash);
               if(this.successOrFailure==1){
    this.navCtrl.pop({ animate: true, duration: 5 });
                this.navCtrl.push(SigninPagePage);

               }
               else if(this.successOrFailure==0){
                 this.presentAlert(' Invalid Details');
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
