import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { DatabaseProvider } from '../../providers/database-provider';
import { Platform } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

import {ForgotpasswordPagePage } from '../forgotpassword/forgotpassword';
import {Storage} from '@ionic/storage';
import {SigninPagePage} from '../signin/signin';
/*
  Generated class for the RegistrationPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html'
})
export class RegistrationPagePage {

  public emailRegEx: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  public nameRegEx: RegExp = /^([A-Za-z]+[]?[ ]?|[A-Za-z]+[']?)+$/;

  public imdbDataUrl: any;
  public imdbData: any;
  public certificate: any;
  public trailorLink: any;
  public imagesDataUrl:any;
  public imagesData:any;
  public mainCategoryDataUrl:any;
  public mainCategoryData:any;

  public name:any;
  public email:any;
  public mobile:any;
  public password:any;
  public confirmPassword:any;
  public response:any;
  public successOrFailure:any;
  public loader:any;
  public userId:any;
  public userHash:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl:LoadingController,
 public storage:Storage, public alertCtrl: AlertController, public http: Http, public database:DatabaseProvider,
  public platform:Platform, public keyboard:Keyboard ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPagePage');
    // this.getData();
      this.platform.ready().then(() => {
     // this.getImdbData();
    });

    
  }
  register(name, email, mobile, password, confirmPassword) {
    this.name=name;
    this.email=email;
    this.password=password;
    this.mobile=mobile;
    this.confirmPassword=confirmPassword;
     console.log('name '+name+ 'mobile '+mobile+' password '+password+'confirmPassword '+confirmPassword+'email '+email)
    if (name == undefined) {
      this.presentAlert("Please Enter Your Name");
    }

    else if (name.trim() == '') {
      this.presentAlert("Please Enter Your Name");
    }

    else if (!this.nameRegEx.test(name.trim())) {
      this.presentAlert("Please Enter Valid Name");
    }

    else if (email == undefined) {

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

    else if(password.trim().length < 8) {

      this.presentAlert('Please Enter Password');
    }

    else if(confirmPassword == undefined) {

      this.presentAlert('Please Enter Confirm Password');
    }
    else if(confirmPassword.trim().length < 8) {

      this.presentAlert("Please Enter At least 8 Characters");
    }
    else if(password.trim() != confirmPassword.trim()) {

      this.presentAlert(" Password and Confirm Password are not same");

    }

    else {

   this.postData(name, email, password, mobile, confirmPassword);     

    }

  }


postData(name, email, password, mobile, confirmPassword){
if(mobile == undefined){
  mobile = "";
}

var postingParams = JSON.stringify({ "name":name,
  "email": email,
  "password": password,
  "phone": mobile});

  console.log('posting params '+postingParams);

var url = 'http://88.198.133.25/movic2/api/signup';
this.presentLoading();
this.http.post(url, postingParams)
             .map(res => res.json())
              .subscribe(data => {
                  this.response = data;
                  console.log("Data : "+this.response);
               this.successOrFailure=data.api_response;
               this.userId=data.response.userid;
              this.userHash=data.response.userHash;
               console.log('user Id '+this.userId);
               console.log('userHash '+this.userHash);
               console.log('api response '+this.successOrFailure);
               this.storage.set('userId',this.userId);
               this.storage.set('userHash',this.userHash);
               if(this.successOrFailure==1){
                this.presentAlert('User Registration Successfully Completed');
                this.name='';
                 this.mobile='';
                 this.email='';
                 this.password='';
                 this.confirmPassword='';
                this.navCtrl.push(SigninPagePage);
               }
               else if(this.successOrFailure==0){
                 this.presentAlert('Emali is Already Exist')
                // this.navCtrl.push(SigninPagePage);
                 this.name='';
                 this.mobile='';
                 this.email='';
                 this.password='';
                 this.confirmPassword='';
               }
               
                 
               this.loader.dismiss();
              })
  
}

  presentLoading() {
    //console.log('Loading...');
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 4000
    });
   this.loader.present();
  }


  forgotPassword() {
    this.navCtrl.pop({ animate: true, duration: 5 });    
this.navCtrl.push(ForgotpasswordPagePage);
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
  // getData() {
  //   this.imdbDataUrl = 'http://88.198.133.25/movic2/api/getImdbData'
  //   this.http.get(this.imdbDataUrl)
  //     .map(res => res.json())
  //     .subscribe(data => {
  //       this.imdbData = data.response;
  //       console.log('url data ' + this.imdbData);
  //       console.log('link ' + this.imdbData[0].movielink);
  //       console.log('id ' + this.imdbData[0].movieid);
  //       console.log('rating ' + this.imdbData[0].imdb_rating);
  //       console.log('date ' + this.imdbData[0].release_date);
  //       console.log('certificate' + this.imdbData[0].certificate);
  //       console.log('socialsite ' + this.imdbData[0].socialsite1);
  //       console.log('trailorlink ' + this.imdbData[0].trailorlink);

  //     });

  // }

  // getImdbData() {
  //   this.imdbDataUrl = 'http://88.198.133.25/movic2/api/getImdbData'
  //   this.http.get(this.imdbDataUrl)
  //     .map(res => res.json())
  //     .subscribe(data => {
  //       this.imdbData = data.response;
  //       console.log("IMDB Data : ", this.imdbData);
  //       for(let index=0; index < this.imdbData.length; index++){
  //         //  insertIntoIMDBDataTable(id, movieid, movielink, certificate, release_date, budget
  //         //, opening, imdb_rating, trailorlink, imagelink, socialsite1) {
  //         this.database.insertIntoIMDBDataTable(this.imdbData[index].id,this.imdbData[index].movieid,this.imdbData[index].movielink,this.imdbData[index].certificate,
  //                                               this.imdbData[index].release_date,this.imdbData[index].budget,this.imdbData[index].opening,this.imdbData[index].imdb_rating,
  //                                               this.imdbData[index].trailorlink,this.imdbData[index].imagelink,this.imdbData[index].socialsite1);
                                      
  //     }
  //     });
    
  // }

// getImagesData(){
//    this.imagesDataUrl = 'http://88.198.133.25/movic2/api/getMoviesImagesData'
//     this.http.get(this.imagesDataUrl)
//       .map(res => res.json())
//       .subscribe(data => {
//         this.imagesData = data.response;
//         console.log("Images Data : ", this.imagesData);
//         for(let index=0; index < this.imagesData.length; index++){
//           //  insertIntoIMDBDataTable(id, movieid, movielink, certificate, release_date, budget
//           //, opening, imdb_rating, trailorlink, imagelink, socialsite1) {
//           this.database.insertIntoImagesData(this.imagesData[index].id,this.imdbData[index].movie_id,this.imdbData[index].link);
                                      
//       }
//       });
// }

// getMainCategoryData(){
//    this.mainCategoryDataUrl = 'http://88.198.133.25/movic2/api/getMainCategoryData'
//     this.http.get(this.mainCategoryDataUrl)
//       .map(res => res.json())
//       .subscribe(data => {
//         this.mainCategoryData = data.response;
//         console.log("Main category  Data : ", this.mainCategoryData);
//         for(let index=0; index < this.mainCategoryData.length; index++){
//           //  insertIntoIMDBDataTable(id, movieid, movielink, certificate, release_date, budget
//           //, opening, imdb_rating, trailorlink, imagelink, socialsite1) {
//           this.database.insertIntoImagesData(this.mainCategoryData[index].id,this.mainCategoryData[index].name,this.imdbData[index].links);
                                      
//       }
//       });



// }

}
