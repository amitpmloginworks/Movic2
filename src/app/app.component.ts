import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage} from '../pages/home/home';
import {DataService} from '../providers/data-service';
//import{database} from '../providers/database';
//import {RegistrationPagePage} from '../pages/registration/registration';
//import {UserchatPagePage} from '../pages/userchat/userchat';
//import {ForgotpasswordPagePage } from '../pages/forgotpassword/forgotpassword';
//import {ChangepasswordPagePage} from '../pages/changepassword/changepassword';
//import {SigninPagePage} from '../pages/signin/signin';
//import {MoreoptionsPagePage} from '../pages/moreoptions/moreoptions';
@Component({
  templateUrl: 'app.html',
  providers:[DataService]
})
export class MyApp {
  rootPage = HomePage;
  constructor(platform: Platform , public data:DataService) {
    //this.data.init();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
