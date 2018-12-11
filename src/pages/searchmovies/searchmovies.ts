import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { DataService } from '../../providers/data-service';
/*
  Generated class for the SearchmoviesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-searchmovies',
  templateUrl: 'searchmovies.html'
})
export class SearchmoviesPagePage {
public searchMovieName:any;
public searchMoviesData:any;
public moviesData:any;
public loader:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService:DataService, public loadingCtrl:LoadingController ) {
  this.searchMovieName=this.navParams.get('serachMovieName');
  //console.log('movieName '+this.searchMovieName);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchmoviesPagePage');
    this.searchMovieName=this.navParams.get('serachMovieName');
    this.searchMovies();
  }

searchMovies(){
  console.log('search movies called ');
this.dataService.getSearchMovieData(this.searchMovieName)
      .then(data => {
        this.moviesData = data;
       this.searchMoviesData=data;
       // this.loader.dismiss();
      });
}

 presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 10000
    });
    this.loader.present();
  }
}
