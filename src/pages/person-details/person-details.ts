
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
/*
  Generated class for the PersonDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-person-details',
  templateUrl: 'person-details.html'
})
export class PersonDetailsPagePage {

  public personID: any;
  public castdata:any;
  public name:any;
  public place;
  public photo:any;
  public birthday:any;
  public biography:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {

    this.personID = navParams.get("personid");
    console.log(' person id ' + this.personID);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonDetailsPagePage');
    this.getDetails();
  }

  getDetails() {
    console.log('getdetails');
    let id: any;
    let url: any;
    url = 'https://api.themoviedb.org/3/person/' + this.personID + '?api_key=9e20e4f162e4aa28aeff3aa792dc22c8'

    return new Promise(resolve => {
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
     console.log('data '+data);
     this.castdata=data;
     this.name=data.name;
     console.log('name '+this.name);
     this.birthday=data.birthday;
     this.photo=data.profile_path
     this.biography=data.biography;
     this.place=data.place_of_birth;
     console.log(this.biography+ '' +this.birthday+" "+this.photo+' '+this.place);
    
        });
    });
  }



}

