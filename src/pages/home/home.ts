import { Component } from '@angular/core';

import { NavController, PopoverController, ViewController, AlertController, LoadingController} from 'ionic-angular';
import { MoviesListPage } from '../movies-list/movies-list';
import { PopoverPagePage } from '../popover/popover';
import { SocialSharing } from '@ionic-native/social-sharing';

import { SearchmoviesPagePage } from '../searchmovies/searchMovies';
import { MoreoptionsPagePage } from '../moreoptions/moreoptions';

import { Keyboard } from '@ionic-native/keyboard';
import { DataService } from '../../providers/data-service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database-provider';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public toggled: boolean = false;

  public enteredMovieName:any;

  public languagesList: any;
  public selectedLanguage: any;
  public appUrl: any;
  public value: any;
  public title:any;
  public searchMovieName:any;
  public moviesData:any;
  public searchMoviesData:any;
  public imdbDataUrl:any;
  public imdbData:any;
  public loader:any;

  constructor(public navCtrl: NavController, public socialSharing: SocialSharing, public popoverCtrl: PopoverController,
   public viewCtrl: ViewController, public keyboard:Keyboard, public dataService:DataService, 
   public alertCtrl:AlertController,public loadingCtrl:LoadingController, public http:Http, public database:DatabaseProvider, public platform:Platform) {
    //console.log('Home Page');
    this.toggled = false;
    this.value = ' ';
    this.title='Movic';
    this.initialieTerms();
    this.enteredMovieName = '';
    this.languagesList = [{ "category": "ALL", "category2": "All Movies", "banner": "assets/img/animated.png", "code": "" }, { "category": "AMERICAN", "category2": "American Movies", "banner": "assets/img/american.png", "code": "US" },
    { "category": "INDIAN", "category2": "Indian Movies", "banner": "assets/img/bollywood.png", "code": "IN" }, { "category": "BRITISH", "category2": "British Movies", "banner": "assets/img/british.png", "code": "GB" },
    { "category": "FRENCH", "category2": "French Movies", "banner": "assets/img/french.png", "code": "FR" }, { "category": "PORTUGAL", "category2": "Portugal Movies", "banner": "assets/img/portugal.png", "code": "PT" },
    { "category": "RUSSIAN", "category2": "Russian Movies", "banner": "assets/img/russian.png", "code": "RU" }, { "category": "AUSTRALIAN", "category2": "Australian Movies", "banner": "assets/img/hollywood.png", "code": "AU" },];
    this.appUrl = 'https://play.google.com/store/apps/details?id=com.loginworks.Movic&hl=en';
     
    
      this.platform.ready().then(() => {
      this.getImdbData();
    });
  }
  pushMoviesListPage(selectedCategory, languageName) {
    this.cancelSearch(event);
    this.selectedLanguage = selectedCategory;
    this.navCtrl.push(MoviesListPage, {
      firstPassed: this.selectedLanguage,
      language: languageName
    });
  }

  share(appUrl) {
    this.socialSharing.share(appUrl).then(() => {
      console.log(appUrl);
      console.log("Posted Successfully");
    }).catch((error) => {
      console.log(appUrl);
      console.log("Posting Failed");
    })
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPagePage);
    popover.present({
      ev: myEvent
    });

  }

  getImdbData() {
    this.imdbDataUrl = 'http://88.198.133.25/movic2/api/getImdbData'
    this.presentLoading();
    this.http.get(this.imdbDataUrl)
      .map(res => res.json())
      .subscribe(data => {
        this.imdbData = data.response;
        console.log("IMDB Data : ", this.imdbData);
          this.database.deleteIMDBData();
        for(let index=0; index < this.imdbData.length; index++){
          //  insertIntoIMDBDataTable(id, movieid, movielink, certificate, release_date, budget
          //, opening, imdb_rating, trailorlink, imagelink, socialsite1) {
        
         
          this.database.insertIntoIMDBDataTable(this.imdbData[index].id,this.imdbData[index].movieid,this.imdbData[index].movielink,this.imdbData[index].certificate,
                                                this.imdbData[index].release_date,this.imdbData[index].budget,this.imdbData[index].opening,this.imdbData[index].imdb_rating,
                                                this.imdbData[index].trailorlink,this.imdbData[index].imagelink,this.imdbData[index].socialsite1);
                                      
      }
      this.loader.dismiss();
      });
    
  }

  moreOptions() {
    this.navCtrl.push(MoreoptionsPagePage);
  }

  public toggle(): void {
    this.toggled = this.toggled ? false : true;
    this.title=' ';
  }

  close() {
    this.viewCtrl.dismiss();
  }

  search(input) {
    //console.log('searchMovieName '+searchInput);
    this.navCtrl.push(SearchmoviesPagePage, { 'serachMovieName': input })

  }

  cancelSearch(event) {

    this.toggled = false;
    this.enteredMovieName = '';
    this.title="Movic"
  }
  initialieTerms() {
    this.value = ' ';
  }

  onInput(ev: any) {
   
    this.initialieTerms();
    this.value = ev.target.value;
    console.log('value1 ' + this.value);
    if (this.value.trim() !== '') {
      // this.navCtrl.push(SearchmoviesPagePage,{'serachMovieName':val})
    }
    //this.navCtrl.push(SearchmoviesPagePage,{'serachMovieName':val})

  }

onKeyDown(e ,enteredMovieName) {
    if (e.keyCode == 13) {
      //console.log('Should Close Keyboard');
     // this.keyboard.close();
         //this.value = enteredMovieName.target.value;
    console.log('value ' + this.value);
    if (this.value.trim() !== '') {
      this.searchMovieName=this.value;
      this.dataService.getSearchMovieData(this.searchMovieName)
      .then(data => {
        this.moviesData = data;
       this.searchMoviesData=data;
       // this.loader.dismiss();
       if(this.searchMoviesData==''){
         console.log('No movies found')
          this.value='';
    this.presentAlert('No Movies Found')
    
       }
       else if(this.searchMoviesData.length){
          
 this.navCtrl.push(SearchmoviesPagePage,{'serachMovieName':this.value})
 this.value='';
      this.toggled=false;
      this.title="Movic"
     
       }
      });
    
    }
        
    
     
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
