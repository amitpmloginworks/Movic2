import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { MovieDetailsPage } from '../movie-details/movie-details';
import { DataService } from '../../providers/data-service';
import { InAppBrowser } from 'ionic-native';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';

/*
  Generated class for the MoviesList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var cordova: any;
@Component({
  selector: 'page-movies-list',
  templateUrl: 'movies-list.html',
  providers: [DataService],
})
export class MoviesListPage {
  public moviesData: any;
  public upcomingMoviesData: any[];
  public currentMoviesData: any[];
  public loadedUpcomingMoviesData: any[];
  public loadedCurrentMoviesData: any[];
  public currentPageUpcoming: number;
  public numberOfPagesUpcoming: number;
  public currentPageCurrent: number;
  public numberOfPagesCurrent: number;
  public selectedRegion: any;
  public fbData: any;
  public title: any;
  public castCombinedArray: any;
  public loader: any;
  public movieTrailerData: any;
  public movieKey: any;
  public movieLink: any;
  public selectedMovieID: any;
  public date: any;
  public name: any;
  public array: any;
  public sortedCurrentMovie: any;
  public sortedUpcomingMovie: any;
  public likedIcon: any;
  public commentList: FirebaseListObservable<any>;
  public likesCount: FirebaseListObservable<any>;
  public isLikedIconArray: any;



  // public launch:any;
  movies: string = "current";
  constructor(public navCtrl: NavController, public storage: Storage, public navParams: NavParams, public dataService: DataService, public loadingCtrl: LoadingController, public platform: Platform, public angularFire: AngularFire) {
    this.selectedRegion = this.navParams.get("firstPassed");
    console.log('selectedRegion ' + this.selectedRegion);
    this.title = this.navParams.get('language');
    console.log('title ' + this.title);
    this.selectedMovieID = this.navParams.get('selectedID');
    console.log('selectedMovieID ' + this.selectedMovieID);
    this.commentList = angularFire.database.list('/Movic/Comments/324786');
    //this.likesCount = angularFire.database.list('/Movic/Likes/324786');
    this.upcomingMoviesData = [];
    this.currentMoviesData = [];
    this.loadedUpcomingMoviesData = [];
    this.loadedCurrentMoviesData = [];
    this.isLikedIconArray = [];
    this.currentPageUpcoming = 1;
    this.numberOfPagesUpcoming = 1;
    this.currentPageCurrent = 1;
    this.numberOfPagesCurrent = 1;
    this.likesCount = angularFire.database.list('/Movic/Likes/' + this.selectedMovieID);
    let ifLiked = angularFire.database.list('/Movic/Likes/' + this.selectedMovieID)
      .subscribe(data => {
        if (data.toString() == "") {
          console.log('New entry for Movie in Likes');
          this.likesCount.push({
            'likes': 0
          });
        }
        ifLiked.unsubscribe();
      });
  }

  ionViewDidLoad() {
    this.getNowPlayingMovieDetails();
  }

  presentLoadingDefaults() {
    this.loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.loader.present();
  }

  showMovieDetails(id, release_date, movie_status) {
    //console.log('Movie Status '+movie_status);
    this.navCtrl.push(MovieDetailsPage, {
      "selectedID": id,
      "release_date": release_date,
      "status": movie_status
    });
  }

  //===========================
  openTrailerView(e, id) {
    this.presentLoadingDefaults();
    e.stopPropagation();
    //console.log('Show Trailer');
    this.dataService.loadMovieTrailerBasedOnMovieId(id)
      .then(data => {
        this.movieTrailerData = data;
        this.movieKey = data[0].key;
        this.movieLink = 'https://www.youtube.com/watch?v=' + this.movieKey;
        //console.log('movieLink 2: ', this.movieLink);
        this.launch();
        //this.movieDuration = data.runtime +' Min';
        this.loader.dismiss();
      });

  }

  //=======================================
  presentLoading() {
    //console.log('Loading...');
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 4000
    });
    loader.present();
  }
  presentLoadingDefault() {
    this.loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.loader.present();
  }

  getUpcomingMovieDetails() {
    console.log('upcoming movies called');
    if (this.currentPageUpcoming == 1) {
      this.presentLoadingDefault();
    }
    this.dataService.loadMoviesListBasedOnRegion(this.selectedRegion, this.currentPageUpcoming)
      .then(data => {
        this.moviesData = data.results;
        this.numberOfPagesUpcoming = data.total_pages;
        this.currentPageUpcoming = data.page;
        console.log('upcoming page ' + this.currentPageUpcoming);
        this.date = this.moviesData[0].release_date;
        console.log('date ' + this.date);
        // this.sortTheArray(this.moviesData);
        this.getFirebaseData(this.moviesData, true);
        this.loader.dismiss();
      });
  }
  getNowPlayingMovieDetails() {
    if (this.currentPageCurrent == 1) {
      this.presentLoadingDefault();
    }
    //this.presentLoadingDefault();
    this.dataService.loadnowPlayingMoviesBasedOnRegion(this.selectedRegion, this.currentPageCurrent)
      .then(data => {
        this.moviesData = data.results;
        this.date = this.moviesData.release_date;
        console.log('date' + this.date);
        this.numberOfPagesCurrent = data.total_pages;
        this.currentPageCurrent = data.page;
        //console.log('Now Playing Movies Data : '+this.numberOfPages);
        // this.sortTheArray(this.moviesData);
        this.getFirebaseData(this.moviesData, false);
        this.loader.dismiss();
      });
  }

  // getFirebaseDataForCurrent(data);
  getFirebaseData(data, isUpcoming) {
    var myDate: any = new Date().getTime();
    if ((isUpcoming == true) && (this.moviesData != this.loadedUpcomingMoviesData)) {
      for (let movie of this.moviesData) {
        var releaseDate: any = new Date(movie.release_date).getTime();
        movie.isUpcoming = isUpcoming;
        if (releaseDate > myDate) {
          movie.likes_fb = this.angularFire.database.list('/Movic/Likes/' + movie.id);
          let ifLiked = this.angularFire.database.list('/Movic/Likes/' + movie.id)
            .subscribe(data => {
              // if (data.toString() == "") {
              //   movie.likes_fb.push({
              //     'likes': 0
              //   });
              // }
              // ifLiked.unsubscribe();
            });
          let commentsList = this.angularFire.database.list('/Movic/Comments/' + movie.id)
            .subscribe(data => {
              if (data.toString() == "") {
                movie.comments_count = 0;
              } else {
                movie.comments_count = data.length;
              }
              this.upcomingMoviesData.push(movie);
            });
        } else {
        }
      }
      this.loadedUpcomingMoviesData = this.moviesData;

    } else if ((isUpcoming == false) && (this.moviesData != this.loadedCurrentMoviesData)) {
      console.log('total data : ', this.moviesData.length);
      for (let movie of this.moviesData) {
        var releaseDate: any = new Date(movie.release_date).getTime();
        console.log('current movie : ', movie.title, 'releaseDate : ', releaseDate, ' and :', myDate);
        movie.isUpcoming = isUpcoming;
        if (releaseDate < myDate) {
          movie.likes_fb = this.angularFire.database.list('/Movic/Likes/' + movie.id);
          let ifLiked = this.angularFire.database.list('/Movic/Likes/' + movie.id)
            .subscribe(data => {
              if (data.toString() == "") {
                movie.likes_fb.push({
                  'likes': 0
                });
              }
              ifLiked.unsubscribe();
            });
          let commentsList = this.angularFire.database.list('/Movic/Comments/' + movie.id)
            .subscribe(data => {
              if (data.toString() == "") {
                movie.comments_count = 0;
              } else {
                movie.comments_count = data.length;
              }
              this.currentMoviesData.push(movie);
            });

            /// Getting likes Data from db and updating UI.
          this.storage.get(movie.id).then((val) => {
            // console.log('AlreadyLiked: ' + val);
            if (val === true) {
              this.isLikedIconArray.push(true);
              movie.isLikedAlready = true;
              
            } else {
              this.isLikedIconArray.push(false);
              movie.isLikedAlready = false;
            }
            console.log("liked Data : ", movie.isLikedAlready);

          });

        } else {
          console.log('Rejected : ', movie.title);
        }
      }
      this.loadedCurrentMoviesData = this.moviesData;

    }
  }

  sortTheArray(array) {
    console.log("Its Came here");
    array.sort((a, b) => {
      if (new Date(a.release_date).getTime() < new Date(b.release_date).getTime()) {
        console.log('sortarraya ' + new Date(a.release_date).getTime());
        console.log('sortedarrayb ' + new Date(b.release_date).getTime());
        var myDate = new Date().getTime();
        console.log('date ' + myDate);
        return 1;
      } else if (new Date(a.release_date).getTime() > new Date(b.release_date).getTime()) {
        return -1;
      }
      return 0;
    });
  }

  doInfinite(infiniteScroll, movies) {
    //console.log('current tab : ',movies);
    console.log('infinite called');
    if (movies == 'upcoming') {
      if (this.currentPageUpcoming < this.numberOfPagesUpcoming) {
        //console.log('Begin async operation : ', this.currentPage);
        setTimeout(() => {
          this.currentPageUpcoming = this.currentPageUpcoming + 1;
          this.getUpcomingMovieDetails();

          infiniteScroll.complete();
        }, 500);
      } else {
        infiniteScroll.complete();
      }
    } else {
      if (this.currentPageCurrent < this.numberOfPagesCurrent) {
        setTimeout(() => {
          this.currentPageCurrent = this.currentPageCurrent + 1;
          this.getNowPlayingMovieDetails();
          infiniteScroll.complete();
        }, 500);

      } else {
        //console.log('total number of pages completed');
        infiniteScroll.complete();
      }
    }
  }

  launch() {
    this.platform.ready().then(() => {
      cordova.InAppBrowser.open(this.movieLink, "_system", "location=true");
      //console.log('launch calls',this.movieLink);
    });
  }
  likeClicked(e) {
    //e.stopPropagation();
    //console.log('Post like');
  }
  postLikeForCurrentMovies(likeCount, movieObject) {
    console.log('like clicked ', likeCount);
    let storage = this.storage;
    let movieID = movieObject.id;

    var likeObj = {
      'likes': likeCount + 1
    }
    var disLikeObj = {
      'likes': likeCount - 1
    }

    //Reference to movie
    var likeCountRef = firebase.database().ref('/Movic/Likes/' + movieID);
    likeCountRef.once('value', function (snapshot) {
      if (snapshot.val() != null) {

        // console.log('likeCountRef key ' + likeCountRef.key); // Master object - key = movieid = 48566
        // console.log('Key from snapshot.val(): ', Object.keys(snapshot.val())[0]); // Random key value - -KuN28Aas2djSS
        // console.log('likeCountRef key .child(likes) ' +  likeCountRef.child(Object.keys(snapshot.val())[0]).child('likes')); // Ref to likes obj - https://moviebrowserionic.firebaseio.com/Movic/Likes/381284/-Kc2NgvUhPtWuhOmWsPE/likes

        storage.get(movieID).then((val) => {
          // console.log('AlreadyLiked: ' + val);
          if (val === true) {
            console.log('disLiking');
            likeCountRef.child(Object.keys(snapshot.val())[0]).update(disLikeObj);
            storage.set(movieID, false);
            movieObject.isLikedAlready = false;
            // TODO: change icon
            // Cannot access this.likedIcon
          } else {
            console.log('Liking');
            likeCountRef.child(Object.keys(snapshot.val())[0]).update(likeObj);
            storage.set(movieID, true);
            movieObject.isLikedAlready = true;
            // TODO: change icon
            // Cannot access this.likedIcon
          }
        });
        //firebase.database().ref('/Movic/Likes/' + movieID + '/' + Object.keys(snapshot.val())[0]).update(likeObj);
      } else {
        // console.log('snapshot.val() null');         
      }
    });
    

    this.likedIcon = !this.likedIcon; // Should be inside likeCountRef.once block

    
  }


  selectedUpcoming(e, movies) {
    if (movies == 'upcoming') {
      //console.log('do nothing');
    } else {
      this.getUpcomingMovieDetails();
    }

  }
  selectedNowPlaying(e, movies) {
    if (movies == 'current') {
      //console.log('do nothing now');
    } else {
      this.getNowPlayingMovieDetails();
    }

  }
  sort() {

    var myDate: any = new Date().getTime();

    this.sortedUpcomingMovie = this.moviesData.sort((a, b) => {
      if (new Date(a.release_date).getTime() < new Date(b.release_date).getTime()) {
        return 1;
      } else if (new Date(a.release_date).getTime() > new Date(b.release_date).getTime()) {
        return -1;
      }
      return 0;
    });

    console.log(" sorted upcoming " + this.sortedUpcomingMovie);
  }


  currentMovieSort() {
    // console.log("sort called");
    // var arr=["abc" , "abd" , "abb", "bcd"];
    // var sorted=arr.sort();
    // console.log('sorted '+sorted);
    var myDate: any = new Date().getTime();

    this.sortedCurrentMovie = this.currentMoviesData.sort((a, b) => {
      if (new Date(a.release_date).getTime() < new Date(b.release_date).getTime()) {

        return 1;
      } else if (new Date(a.release_date).getTime() > new Date(b.release_date).getTime()) {
        return -1;
      }
      return 0;
    });

    console.log(" sorted current " + this.sortedCurrentMovie);


    // var myDate: any = new Date().getTime();
    //   for(let i=0; i<=this.moviesData.length; i++){
    //   if(myDate<= new Date(this.moviesData[i].release_date).getTime)
    //   {
    //   this.array.push(this.moviesData[i]);
    //   }
    //   }

    // console.log('array '+this.array)
  }



}


