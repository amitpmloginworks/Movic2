import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController, AlertController, ViewController } from 'ionic-angular';
import {ForgotpasswordPagePage} from '../forgotpassword/forgotpassword';

import {RegistrationPagePage} from '../registration/registration';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {Storage} from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';

import {MoreoptionsPagePage} from '../moreoptions/moreoptions';
import {HomePage} from '../home/home';
/*
  Generated class for the SigninPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})

export class SigninPagePage {
public userHash:any;
public response:any;
public successOrFailure:any;
public loader:any;
public userName:any;
public name:any;
public password:any;
public email:any;
public userId:any;
public page:any;
public emailRegEx: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage,
  public http:Http, public loadingCtrl:LoadingController, public alertCtrl:AlertController, 
  public keyboard:Keyboard, public viewCtrl:ViewController) {
    this.storage.get('userHash').then((val) => {
      this.userHash=val;
      console.log('userHash '+this.userHash);
    });
    this.page=this.navParams.get('page');
  }

//  ionViewWillEnter() {
//         this.viewCtrl.showBackButton(false);
//     }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPagePage');
  }


forgotPassword(){
this.navCtrl.push(ForgotpasswordPagePage);
}

createAccount(){
this.navCtrl.push(RegistrationPagePage);
}

loginAccount(email, password){

       if (email == undefined) {

      this.presentAlert("Please Enter Email");
    }
    else if (email.trim() == '') {

      this.presentAlert("Please Enter Email");
    }
    else if (!this.emailRegEx.test(email.trim())) {

      this.presentAlert("Please Enter Valid Email");

    }
    else if(password== undefined){
      this.presentAlert('Please Enter password');
    }
    else if(password.trim()== ''){
      this.presentAlert('Please Enter password');
    }
    
else{
    var postingParams = JSON.stringify({ 
  "email": email,
  "password": password,
  });
  console.log('params '+postingParams);

var url = 'http://88.198.133.25/movic2/api/login';
this.presentLoading();
this.http.post(url, postingParams)
             .map(res => res.json())
              .subscribe(data => {
                  this.response = data;
                  console.log("Data : "+this.response);
                 this.successOrFailure=data.api_response;
                 this.userName=data.response.name;  
                 this.userId=data.response.userId;
                 this.storage.set('userName',this.userName);
                 this.storage.set('userId',this.userId);
               console.log('api response '+this.successOrFailure);
               console.log('username '+this.userName);
               console.log('userId '+this.userId);
               if(this.successOrFailure==1){
                  this.storage.set('loginOrLogout',true);
                  this.storage.set('userName',this.userName);
                  if(this.page==true){
                  this.navCtrl.popTo(MoreoptionsPagePage);
                }
                else
                this.navCtrl.push(MoreoptionsPagePage);
                 console.log('successful');
               }
               else if(this.successOrFailure==0){
                 this.presentAlert('Email or Password is invalid')
                // this.navCtrl.push(SigninPagePage);
               }   
               this.loader.dismiss();
              })
} 
}  
  presentLoading() {
    //console.log('Loading...');
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 4000
    });
   this.loader.present();
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

  onKeyDown(e) {
   if (e.keyCode == 13) {
      console.log('Should Close Keyboard');
      this.keyboard.close();
    }
  }
}
