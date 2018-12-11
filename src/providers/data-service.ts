import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
// import { AngularFireModule, FirebaseListObservable, AngularFire, FIREBASE_PROVIDERS } from 'angularfire2'; 

/*
  Generated class for the DataService provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataService {
public moviesData: any;
public upcomingMoviesData: any;

public fbDataBase:any;
public movieDetailsData : any;
public baseURL = 'http://image.tmdb.org/t/p/w185';
public moviesAPI : any;
public movieDetailsAPI : any;
public movieTrailerData:any;
public nowPlayingMoviesAPI: any;
public nowPlayingMoviesData:any;
public upcomingMoviesRegion:any;
public upcomingMoviePageIndex:any;
public currentMoviesRegion:any;
public currentMoviePageIndex:any;
public currentDate:any;
public addedDate:any;
public todayDate:any;
public imdbData:any;
public imdbDataUrl:any;
public miniCategoryDataUrl:any;
public miniCategoryData:any;
public someDate:any;
public currentyear:any;
public searchMovieDetailsData:any;

public commentsData:any;
// public likes: FirebaseListObservable<any>;
  constructor(public http: Http) {
    // console.log('Hello DataService Provider');
    
    this.moviesAPI = 'https://api.themoviedb.org/3/movie/upcoming?api_key=9e20e4f162e4aa28aeff3aa792dc22c8&region=';
    this.movieDetailsAPI = 'https://api.themoviedb.org/3/movie/550?api_key=9e20e4f162e4aa28aeff3aa792dc22c8';
    this.nowPlayingMoviesAPI = 'https://api.themoviedb.org/3/movie/now_playing?api_key=9e20e4f162e4aa28aeff3aa792dc22c8&page=1&region=';
  

  }
   init(){
      const config = {
    apiKey: "AIzaSyDxqyW42CoZARpMS50SBMtNQFCa9h1X-ZE",
    authDomain: "moviebrowserionic.firebaseapp.com",
    databaseURL: "https://moviebrowserionic.firebaseio.com",
    storageBucket: "moviebrowserionic.appspot.com",
    messagingSenderId: "439456632492"
      }
      firebase.initializeApp(config);
      this.fbDataBase = firebase.database().ref('Movic/Comments');
    //   console.log('FireBase Configured successfully : '+this.fbDataBase);
  
  }

  ionViewDidLoad(){
  

  }
 

  loadMoviesListBasedOnRegion(region,page){
      let url : any;
     
      if(region == ''){
       console.log('region'+region);
      url = 'https://api.themoviedb.org/3/movie/upcoming?api_key=9e20e4f162e4aa28aeff3aa792dc22c8&page='+page;
      //url='https://api.themoviedb.org/3/discover/movie?api_key=9e20e4f162e4aa28aeff3aa792dc22c8&language=en-US&sort_by=primary_release_date.asc&include_adult=false&include_video=false&page='+page+'&primary_release_year='+this.currentyear+'&primary_release_date.gte='+this.todayDate+'&primary_release_date.lte='+this.addedDate+''
      }else{
        url = this.moviesAPI+region+'&page='+page;
      // url='https://api.themoviedb.org/3/discover/movie?api_key=9e20e4f162e4aa28aeff3aa792dc22c8&language=en-US&region='+region+'&sort_by=primary_release_date.asc&include_adult=false&include_video=false&page='+ page +'&primary_release_year='+this.currentyear+'&primary_release_date.gte='+this.todayDate+'&primary_release_date.lte='+this.addedDate+''
      }
      if(this.upcomingMoviePageIndex == page && this.upcomingMoviesRegion == region){
         return Promise.resolve(this.moviesData);
      }


      this.upcomingMoviePageIndex = page;
      console.log(" Upcoming Page "+this.upcomingMoviePageIndex);
      this.upcomingMoviesRegion = region;
      console.log("region "+this.upcomingMoviesRegion);
      return new Promise(resolve => {
        
        // console.log('API Based on selected Region: '+url);
          this.http.get(url)
              .map(res => res.json())
              .subscribe(data => {
                  this.moviesData = data;
                  this.upcomingMoviesData = data;
                //   console.log('Data : '+this.moviesData)
                  //resolve(this.moviesData + "~"+ data.page+ "~"+ data.total_pages);
                  resolve(this.moviesData);
              });
      });
  }
  loadnowPlayingMoviesBasedOnRegion(region,page){

      let url : any;
       this.currentDate=new Date()
    var numberOfDaysToAdd = 100;
   this. addedDate= new Date();
   console.log('some date '+this.someDate);
   this.addedDate.setDate(this.addedDate.getDate() + numberOfDaysToAdd); 
     console.log('date Added '+this.addedDate);
     console.log('date '+this.currentDate);
    var date= this.currentDate.getDate();
    var month=this.currentDate.getMonth();
    var year=this.currentDate.getYear();
    this.currentyear=year+1900;
    this.todayDate=this.currentyear+'-'+month+'-'+date
    console.log('today Date '+this.todayDate);
    var date= this.addedDate.getDate();
    var month=this.addedDate.getMonth();
    var year=this.addedDate.getYear();
   var year1=year+1900;
    this.addedDate=year1+'-'+month+'-'+date
    console.log('Added Date '+this.addedDate);
      if(region == ''){
   //     url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=9e20e4f162e4aa28aeff3aa792dc22c8&page='+page;
   url='https://api.themoviedb.org/3/discover/movie?api_key=9e20e4f162e4aa28aeff3aa792dc22c8&language=en-US&sort_by=primary_release_date.desc&include_adult=false&include_video=false&page='+page+'&primary_release_year='+this.currentyear+'&primary_release_date.lte='+this.todayDate+''  
    }else{
        //url = this.nowPlayingMoviesAPI+region+'&page='+page;
        url='https://api.themoviedb.org/3/discover/movie?api_key=9e20e4f162e4aa28aeff3aa792dc22c8&language=en-US&region='+region+'&sort_by=primary_release_date.desc&include_adult=false&include_video=false&page='+page+'&primary_release_year='+this.currentyear+'&primary_release_date.lte='+this.todayDate+''
      }
      if(this.currentMoviePageIndex == page && this.currentMoviesRegion == region){
        
         return Promise.resolve(this.moviesData);
      }
     // console.log(" movie data "+this.moviesData);
      this.currentMoviePageIndex = page;
      this.currentMoviesRegion = region;
      // if(this.nowPlayingMoviesData){
      //    return Promise.resolve(this.nowPlayingMoviesData);
      // }

      return new Promise(resolve => {
        // console.log('API Based on selected Region: '+url);
          this.http.get(url)
              .map(res => res.json())
              .subscribe(data => {
                  this.nowPlayingMoviesData = data;
                //   console.log('Data : '+this.nowPlayingMoviesData)
                  //resolve(this.nowPlayingMoviesData + "~"+ data.page+ "~"+ data.total_pages);
                  resolve(this.nowPlayingMoviesData);
              });
      });
  }
  loadMoviesDetailsBasedOnID(tmdbID){
    
      let url : any;
      url = 'https://api.themoviedb.org/3/movie/'+tmdbID+'?api_key=9e20e4f162e4aa28aeff3aa792dc22c8';
      
      if(this.movieDetailsData){
         return Promise.resolve(this.movieDetailsData);
      }

      return new Promise(resolve => {
        // console.log('API Based on selected tmdbID: '+url);
          this.http.get(url)
              .map(res => res.json())
              .subscribe(data => {
                  this.movieDetailsData = data;
                //   console.log('Data : '+this.movieDetailsData)
                  resolve(this.movieDetailsData);
              });
      });
  }

 
 //=============================================>
 
  loadMovieTrailerBasedOnMovieId(id){
      let url :any;
      
      url='https://api.themoviedb.org/3/movie/'+id+'/videos?api_key=9e20e4f162e4aa28aeff3aa792dc22c8';
    //   console.log('url : ',url);
    //   if(this.movieTrailerData){
    //       return Promise.resolve(this.movieTrailerData);
    //   }
      return new Promise(resolve => {
        // console.log('API Based on selected id: '+url);
          this.http.get(url)
              .map(res => res.json())
              .subscribe(data => {
                  this.movieTrailerData = data.results;
                //   console.log('Trailer Data : '+this.movieTrailerData)
                  resolve(this.movieTrailerData);
              });
      });

  }


//===================>
  postCommentToFB(commentData){
  var ref = firebase.database().ref('Movic/Comments');
  
  return new Promise((resolve, reject)=>{
     
      ref.push(commentData, (_responce)=>{
          alert("Uploaded Successfully");
          
      }).catch((_error) =>{
          reject(_error)
      })
    });
  }
  getComments(){
       var ref = firebase.database().ref('Movic/Comments');
       return new Promise((resolve, reject)=>{
    });
  }

   loadUser(number){
      if(this.commentsData){
         return Promise.resolve(this.commentsData);
      }

      return new Promise(resolve => {
          this.http.get('https://randomuser.me/api?results='+number)
              .map(res => res.json())
              .subscribe(data => {
                  this.commentsData = data.results;
                  resolve(this.commentsData);
              });
      });
  }


  getImdbData() {
    this.imdbDataUrl = 'http://88.198.133.25/movic2/api/getImdbData'
    this.http.get(this.imdbDataUrl)
      .map(res => res.json())
      .subscribe(data => {
        this.imdbData = data.response;
        console.log("IMDB Data : ", this.imdbData);
      });
    
  }
  
mainCategoryData(){
  this.miniCategoryDataUrl =  'http://88.198.133.25/movic2/api/getMainCategoryData'
    this.http.get(this.miniCategoryData)
      .map(res => res.json())
      .subscribe(data => {
        this.imdbData = data.response;
        console.log("miniCategoryData : ", this.miniCategoryData);
      });
}

getSearchMovieData(movieName){
     var link="https://api.themoviedb.org/3/search/movie?api_key=9e20e4f162e4aa28aeff3aa792dc22c8&language=en-US&query="+movieName+"&page=1&include_adult=false&"
    return new Promise(resolve => {
        // console.log('API Based on selected tmdbID: '+url);
          this.http.get(link)
              .map(res => res.json())
              .subscribe(data => {
                  this.searchMovieDetailsData =data.results;
                //   console.log('Data : '+this.movieDetailsData)
                  resolve(this.searchMovieDetailsData);
              });
      });
  }
}

