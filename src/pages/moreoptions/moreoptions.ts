import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController,ActionSheetController, AlertController } from 'ionic-angular';

import {SigninPagePage} from '../signin/signin';
import {RegistrationPagePage } from '../registration/registration'
import {AboutusPagePage } from '../aboutus/aboutus';
import {UserchatPagePage} from '../userchat/userchat';
import {PopoverPagePage} from '../popover/popover';
import {FeedbackPagePage } from '../feedback/feedback';
import { SocialSharing } from '@ionic-native/social-sharing';

import {Storage} from '@ionic/storage';
/*
  Generated class for the MoreoptionsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-moreoptions',
  templateUrl: 'moreoptions.html'
})
export class MoreoptionsPagePage {

public appUrl:any;
public userName:any;
public loginOrLogout:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl:PopoverController,
  public storage:Storage, public socialSharing:SocialSharing, public actionSheetCtrl:ActionSheetController, public alertCtrl:AlertController) {

  this.appUrl='https://play.google.com/store/apps/details?id=com.loginworks.Movic&hl=en';


  // this.storage.get('userName').then((val) => {
  //     this.userName=val;
  //     console.log('userName '+this.userName);
  //   });

  // this.storage.get('loginOrLogout').then((val) => {
  //     this.loginOrLogout=val;
  //     console.log('loginOrLogout'+this.loginOrLogout);
  //   });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoreoptionsPagePage');

  }

ionViewWillEnter() {
    console.log("this function will be called every time you enter the view");
    this.storage.get('userName').then((val) => {
      this.userName=val;
      console.log('userName '+this.userName);
    });

  this.storage.get('loginOrLogout').then((val) => {
      this.loginOrLogout=val;
      console.log('loginOrLogout'+this.loginOrLogout);
    });
}



 signin(){

 this.navCtrl.push(SigninPagePage);

 }

// chat(){

// this.navCtrl.push(UserchatPagePage);

// }

// presentPopover(myEvent) {
//     let popover = this.popoverCtrl.create(PopoverPagePage);
//     popover.present({
//       ev: myEvent
//     });
   
//   }

share(appUrl){
    this.socialSharing.share(appUrl ).then(()=>{
      console.log(appUrl);
      console.log("Posted Successfully");
    }).catch((error)=>{
       console.log(appUrl);
  console.log("Posting Failed");

    })
  }

//  ionInput($event){
//   //console.log('searchMovieName '+searchInput);
// this.navCtrl.push(SearchmoviesPagePage,{'serachMovieName':searchInput})

// }

moreOptions(){
  
  //   let errorActionSheet = this.actionSheetCtrl.create({
  //     // title: 'Error on fetching data !!!',
  //     buttons: [
  //       {
  //         text: 'Sign In',
  //         handler: () => {
  //           console.log('sign in clicked');
  //       this.navCtrl.push(SigninPagePage);
  //         }
  //       }, {
  //         text: 'Sign Up',
  //         handler: () => {
  //           console.log('Create account clicked');
  //       this.navCtrl.push(RegistrationPagePage);
  //         }
  //       }, {
  //         text: 'Feedback',
  //         handler: () => {
  //           console.log('Feedback clicked');
  //           this.navCtrl.push(FeedbackPagePage);
  //         }
  //       },
  //       {
  //         text: 'About Us',
  //         handler: () => {
  //           console.log('About Us clicked');
  //       this.navCtrl.push(AboutusPagePage);
  //         }
  //       },
  //         {
  //         text: 'Logout',
  //         handler: () => {
  //           console.log('Logout clicked');
  //           this.storage.set('loginOrLogout',false);

  // this.storage.get('loginOrLogout').then((val) => {
  //     this.loginOrLogout=val;
  //     console.log('loginOrLogout'+this.loginOrLogout);
  //   });
  //         }
  //       }
  //     ]
  //   });
  //   errorActionSheet.present();

if(this.loginOrLogout==true){

this.login();
}
else{
  this.logout();
}

  }

login(){
 let errorActionSheet = this.actionSheetCtrl.create({
      // title: 'Error on fetching data !!!',
      buttons: [
         {
          text: 'Feedback',
          handler: () => {
            console.log('Feedback clicked');
            if(this.loginOrLogout==false){
              this.navCtrl.push(SigninPagePage);
            }
            else{
            this.navCtrl.push(FeedbackPagePage);
            }
          }
        },
        {
          text: 'About Us',
          handler: () => {
            console.log('About Us clicked');
        this.navCtrl.push(AboutusPagePage);
          }
        },
          {
          text: 'Logout',
          handler: () => {
            console.log('Logout clicked');
            this.storage.set('loginOrLogout',false);
            // this.presentAlert('You Are Logged Out')
            this.navCtrl.push(SigninPagePage);

  this.storage.get('loginOrLogout').then((val) => {
      this.loginOrLogout=val;
      console.log('loginOrLogout '+this.loginOrLogout);
    });
          }
        }
      ]
    });
    errorActionSheet.present();
}

logout(){
    let errorActionSheet = this.actionSheetCtrl.create({
      // title: 'Error on fetching data !!!',
      buttons: [
        {
          text: 'Sign In',
          handler: () => {
            console.log('sign in clicked');
        this.navCtrl.push(SigninPagePage,{'page':true});
          }
        }, {
          text: 'Sign Up',
          handler: () => {
            console.log('Create account clicked');
        this.navCtrl.push(RegistrationPagePage);
          }
        }, {
          text: 'Feedback',
          handler: () => {
            console.log('Feedback clicked');
            this.navCtrl.push(FeedbackPagePage);
          }
        },
        {
          text: 'About Us',
          handler: () => {
            console.log('About Us clicked');
        this.navCtrl.push(AboutusPagePage);
          }
        },  
      ]
    });
    errorActionSheet.present();
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

}
