import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import {UserchatPagePage} from '../userchat/userchat';
import {RegistrationPagePage} from '../registration/registration';
import {SigninPagePage} from '../signin/signin';

import {ChangepasswordPagePage } from '../changepassword/changepassword';
import{FeedbackPagePage } from '../feedback/feedback';
import {AboutusPagePage} from '../aboutus/aboutus';
/*
  Generated class for the PopoverPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  
  template:  `
    <ion-list>
    
      <button ion-item (click)="signin()">Sign in</button>
      <button ion-item (click)="register()">Create Account </button>
      <button ion-item  (click)="feedback()">Feedback</button>
      <button ion-item (click)="aboutUs()">About Us</button>
    </ion-list>
  `
})
export class PopoverPagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController) {}

  ionViewDidLoad() {
  
    console.log('ionViewDidLoad PopoverPagePage');

  }

chat(){
this.navCtrl.push(UserchatPagePage);

}

close(){
  this.viewCtrl.dismiss();
}

register(){
  this.navCtrl.push(RegistrationPagePage);
}
signin(){
  this.navCtrl.push(SigninPagePage);
}

aboutUs(){
  this.navCtrl.push(AboutusPagePage);
}

changePassword(){
this.navCtrl.push(ChangepasswordPagePage);
}

feedback(){
  this.navCtrl.push(FeedbackPagePage);
}


}
