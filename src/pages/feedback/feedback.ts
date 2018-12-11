import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import {Storage} from '@ionic/storage';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Keyboard } from '@ionic-native/keyboard';

import {SigninPagePage } from '../signin/signin';

/*
  Generated class for the FeedbackPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html'
})
export class FeedbackPagePage {

  public userHash:any;
  public userId:any;
  public input:any;
  public loader:any;
  public response:any;
  public successOrFailure:any;
  public loginOrLogout:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,
  public storage:Storage, public alertCtrl:AlertController, public loadingCtrl:LoadingController, public keyboard:Keyboard) {

  this.storage.get('userHash').then((val) => {
      this.userHash=val;
      console.log('userHash '+this.userHash);
    });

this.storage.get('loginOrLogout').then((val) => {
      this.loginOrLogout=val;
      console.log('loginOrLogout '+this.loginOrLogout);
    });
  this.storage.get('userId').then((val) => {
      this.userId=val;
      console.log('userId '+this.userId);
    });
    this.input='';

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPagePage');
  }


  feedback(feedbackInput){
 this.input=feedbackInput;

if(this.input==undefined){

this.presentAlert('Please Enter Feedback');
}

// else if(this.loginOrLogout==false){
// this.navCtrl.push(SigninPagePage);
// }
else if(this.loginOrLogout==true){
var postingParams = JSON.stringify({ 
  "userid": this.userId,
  "userHash": this.userHash,
  "feedback": this.input});

  console.log('posting params '+postingParams);

var url = 'http://88.198.133.25/movic2/api/usersFeedback';
this.presentLoading();
this.http.post(url, postingParams)
             .map(res => res.json())
              .subscribe(data => {
                  this.response = data;
                  console.log("Data : "+this.response);
               this.successOrFailure=data.api_response;
            
               console.log('api response '+this.successOrFailure);
              
               if(this.successOrFailure==1){
                  this.input='';
                this.presentAlert('Thanks For Your Feedback '); 
               }
               else if(this.successOrFailure==0){
                 this.input='';
                 this.presentAlert('Invalid Details')
                // this.navCtrl.push(SigninPagePage);
                 
               }
                
               this.loader.dismiss();
              })
}
else{
  this.presentAlert('Please Sign In')
}
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
