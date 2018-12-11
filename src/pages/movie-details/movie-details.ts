import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform, AlertController } from 'ionic-angular';
import { DataService } from '../../providers/data-service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from 'ionic-native';
import { Http } from '@angular/http';
import { SocialSharing } from '@ionic-native/social-sharing';
import { PersonDetailsPagePage } from '../person-details/person-details'
import { DatabaseProvider } from '../../providers/database-provider';


/*
  Generated class for the MovieDetails page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var cordova: any;
@Component({
  selector: 'page-movie-details',
  templateUrl: 'movie-details.html',
  providers: [DataService]
})
export class MovieDetailsPage {

  public movieDetailsData: any;
  public movieReleaseDate: any;
  public movieStatus: any;
  public movieName: any;
  public movieDescription: any;
  public movieLikes: any;
  public moviePoster: any;
  public movieDuration: any;
  public movieGenre: any;
  public selectedMovieID: any;
  public movieProductions: any;
  public castId: any;
  public loader: any;
  public homePage: any;
  public imdbId: any;


  public likedIcon: any;
  public movieTrailerData: any;
  public movieKey: any;
  public movieLink: any;
  public appUrl: any;
  public castDetails: any;
  public crewDetails: any;
  public castPersonId: any;
  public crewPersonId: any;
  public crewJob: any;
  public commentList: FirebaseListObservable<any>;
  public likesCount: FirebaseListObservable<any>;

  public castCombinedArray: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: DataService,
    public loadingCtrl: LoadingController, public angularFire: AngularFire,
    public storage: Storage, public platform: Platform, public http: Http,
    public socialSharing: SocialSharing, public alertCtrl: AlertController,
    public database: DatabaseProvider) {
    this.selectedMovieID = this.navParams.get('selectedID');
    this.movieReleaseDate = this.navParams.get('release_date');
    this.movieStatus = this.navParams.get('status');
    this.appUrl = 'https://play.google.com/store/apps/details?id=com.loginworks.Movic&hl=en';
    this.commentList = angularFire.database.list('/Movic/Comments/' + this.selectedMovieID);
    this.likesCount = angularFire.database.list('/Movic/Likes/' + this.selectedMovieID);
    this.castCombinedArray = [];
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

    // console.log('Comments : ' + this.commentList);
    // console.log('Likes : ' + this.likesCount);


    this.storage.get(this.selectedMovieID).then((val) => {
      //console.log('isLiked : ' + val);
      if (val === true) {
        this.likedIcon = true;
      } else {
        this.likedIcon = false;
      }
    });

  }

  //=======================

  ionViewDidLoad() {
    console.log("movie Details page");
    this.getMovieDetails();
    this.getMovieTrailer();
    this.getCastDetails();
    this.getHomePage();
    this.date();
  }

  //=======================

  presentLoadingDefault() {
    this.loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.loader.present();
  }

  //=======================

  getMovieDetails() {
    this.presentLoadingDefault();
    this.dataService.loadMoviesDetailsBasedOnID(this.selectedMovieID)
      .then(data => {
        this.movieDetailsData = data;
        this.movieName = data.title;
        this.movieDescription = data.overview;
        this.moviePoster = 'http://image.tmdb.org/t/p/w780' + data.backdrop_path;
        this.movieLikes = data.vote_count;
        this.imdbId = data.imdb_id;
        console.log('imdbId ' + this.imdbId);



        this.database.getFromIMDBTableWithID(this.imdbId).then((movieData: any) => {
          if (movieData.rows.length > 0) {
            let imdbiMovieData: any;
            imdbiMovieData = data.rows.item(0);
            console.log("Imdb movie data : ", imdbiMovieData);
          } else {
            console.log("No data in the database");
          }
        });


        //this.castDetails=data.credits.cast;
        //console.log('cast '+this.castDetails);
        //this.crewDetails=data.credits.crew;
        // console.log('crew '+this.crewDetails);
        for (let production of data.production_companies) {
          if (this.movieProductions != undefined) {
            this.movieProductions = this.movieProductions + ', ' + production.name;
          }
          else {
            this.movieProductions = production.name;
          }
        }

        for (let genre of data.genres) {
          if (this.movieGenre != undefined) {
            this.movieGenre = this.movieGenre + ', ' + genre.name;
          }
          else {
            this.movieGenre = genre.name;
          }
        }
        this.movieDuration = data.runtime + ' Min';
        this.loader.dismiss();

      });
  }



  //=======================

  getMovieTrailer() {
    //this.presentLoadingDefault();
    this.dataService.loadMovieTrailerBasedOnMovieId(this.selectedMovieID)
      .then((data: any) => {


        this.movieTrailerData = data;
        if (data.length > 0) {
          this.movieKey = data[0].key;

          this.movieLink = 'https://www.youtube.com/watch?v=' + this.movieKey;
        } else {
          console.log("No trailer video presented");
        }

        //this.loader.dismiss();
      });

  }

  //=======================

  launch() {
    this.platform.ready().then(() => {
      cordova.InAppBrowser.open(this.movieLink, "_system", "location=true");
    });
  }

  //=======================

  postComment(userName, userComment) {
    // console.log('Posting Params : '+userName +' and : '+userComment);
    var saveToDatabase = {
      'comment': userComment,
      'name': userName,
      'movieID': this.selectedMovieID,
      'commentTime': new Date().getTime()
    }

    this.commentList.push(saveToDatabase);
  }


  //=======================

  // Update like/dislike
  postLike(likeCount) {

    console.log('like clicked');
    let storage = this.storage;
    let movieID = this.selectedMovieID;

    var likeObj = {
      'likes': likeCount + 1
    }
    var disLikeObj = {
      'likes': likeCount - 1
    }

    //Reference to movie
    var likeCountRef = firebase.database().ref('/Movic/Likes/' + this.selectedMovieID);

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
            // TODO: change icon
            // Cannot access this.likedIcon
          } else {
             console.log('Liking');
            likeCountRef.child(Object.keys(snapshot.val())[0]).update(likeObj);
            storage.set(movieID, true);
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

  getCastDetails() {
    console.log("getcastdetails");
    let url: any;
    let id = this.selectedMovieID;
    console.log('Movie Id ' + this.selectedMovieID);
    url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=9e20e4f162e4aa28aeff3aa792dc22c8&append_to_response=credits';

    // return new Promise(resolve => {
    this.http.get(url)
      .map(res => res.json())
      .subscribe(data => {
        this.castDetails = data.credits.cast;
        this.crewDetails = data.credits.crew;
        console.log('crew details ' + this.crewDetails);
        console.log('crew details ' + this.castDetails);
        for (let j = 0; j < this.crewDetails.length; j++) {
          console.log('crew Enter');
          if (this.crewDetails[j].job == "Director" ||
            this.crewDetails[j].job == "Producer" ||
            this.crewDetails[j].job == "Novel" ||
            this.crewDetails[j].job == "Director of Photography" ||
            this.crewDetails[j].job == "Editor" ||
            this.crewDetails[j].job == "Screenplay") {
            if (this.crewDetails[j].profile_path)
              if (this.crewDetails[j].profile_path.length > 5) {
                this.castCombinedArray.push(this.crewDetails[j]);
                console.log('crew For');
              }
          }
        }
        for (let i = 0; i < this.castDetails.length; i++) {
          let count = 0;
          console.log('cast Enter');
          if (this.castDetails[i].profile_path) {
            if (this.castDetails[i].profile_path.length > 5 && count < 6) {
              this.castCombinedArray.push(this.castDetails[i]);
              count = count + 1;
              console.log('cast For');
              console.log('count ' + count);
            }
          }
        }

        console.log('combined Array ' + this.castCombinedArray);
        this.castId = data.credits.cast.id;
      });
  }
  // share(appUrl) {
  //   this.socialSharing.share(appUrl).then(() => {
  //     console.log(appUrl);
  //     console.log("Posted Successfully");
  //   }).catch((error) => {
  //     console.log(appUrl);
  //     console.log("Posting Failed");
  //   })
  // }

  // shareFacebook(appUrl) {
  //   this.socialSharing.shareViaFacebook(appUrl).then(() => {
  //     console.log(appUrl);
  //     console.log("Posted Successfully");
  //   }).catch((error) => {
  //     console.log(appUrl);
  //     console.log("Posting Failed");
  //   })
  // }

  // shareTwitter(appUrl) {
  //   this.socialSharing.shareViaTwitter(appUrl).then(() => {
  //     console.log(appUrl);
  //     console.log("Posted Successfully");
  //   }).catch((error) => {
  //     console.log(appUrl);
  //     console.log("Posting Failed");
  //     this.presentAlert("Please Install Twitter");
  //   })
  // }

  // shareWhatsapp(appUrl) {
  //   this.socialSharing.shareViaWhatsApp(appUrl).then(() => {
  //     console.log(appUrl);
  //     console.log("Posted Successfully");
  //   }).catch((error) => {
  //     console.log(appUrl);
  //     console.log("Posting Failed");
  //     //alert('please install WhatsApp');
  //     this.presentAlert("Please Install WhatsApp");
  //   })
  // }

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

  navigateToCastDetails(castId) {
    console.log('id ' + castId);
    this.castPersonId = castId;
    this.navCtrl.push(PersonDetailsPagePage, { "personid": this.castPersonId })
  }

  navigateToCrewDetails(crewId) {
    console.log('id ' + crewId);
    this.crewPersonId = crewId;
    this.navCtrl.push(PersonDetailsPagePage, { "personid": this.crewPersonId })
  }

  getHomePage() {

    let url: any;
    let id = this.selectedMovieID;
    url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=9e20e4f162e4aa28aeff3aa792dc22c8&language=en-US';

    return new Promise(resolve => {

      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {

          let home = data.homepage;
          console.log('homepage ' + home);
          this.homePage = home;
          console.log('homepage' + this.homePage);
        });
    });
  }

  date() {
    var someDate = new Date();
    var numberOfDaysToAdd = 100;
    someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
    console.log('date Added ' + someDate);
  }

}
