import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  public sqliteObject: any;
  public imdata:any;
  constructor(public sqlite: SQLite, platform: Platform) {
    console.log('Hello DatabaseProvider Provider');

    platform.ready().then(() => {
      this.sqlite.create({
        name: 'movic.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.sqliteObject = db;
        console.log("Database is created");
      }).catch(e => console.log("Error on creating Database : ", e));
    });
  }

  insertIntoIMDBDataTable(id, movieid, movielink, certificate, release_date, budget, opening, imdb_rating, trailorlink, imagelink, socialsite1) {
    this.sqliteObject.executeSql('CREATE TABLE IF NOT EXISTS imdbdata(id int(11)  , movieid varchar(100), movielink varchar(100),  certificate varchar(100), release_date varchar(100),  budget varchar(100), opening varchar(100),  imdb_rating varchar(100), trailorlink varchar(100), imagelink varchar(100),socialsite1 varchar(100) )', {})
    this.sqliteObject.executeSql("INSERT INTO imdbdata(id , movieid, movielink , certificate , release_date , budget , opening ,  imdb_rating ,trailorlink ,imagelink, socialsite1 )VALUES(\"" + id + "\",\"" + movieid + "\",\"" + movielink + "\", \"" + certificate + "\", \"" + release_date + "\", \"" + budget + "\", \"" + opening + "\",\"" + imdb_rating + "\", \"" + trailorlink + "\", \"" + imagelink + "\", \"" + socialsite1 + "\")", {})
      .then(() => {
        console.log('Inserted imdb Data : Executed SQL: ',movieid);
      }).catch(e => console.log("Error on Inserting Data into imdb table: ", e));
      
  }

  getFromIMDBTableWithID(imdbid){
    return new Promise(resolve =>{
      this.sqliteObject.executeSql("SELECT * FROM imdbdata where movieid=\""+imdbid+"\"", {})
      .then((movieData) => {
        console.log('MOvie Data from IMDB Databbase : ', movieData.rows);
        resolve(movieData);
      }).catch(e => console.log("Error on fetching Data into imdb table: ", e));
    });
  }

  deleteIMDBData(){
    this.sqliteObject.executeSql("DELETE FROM imdbdata", {})
      .then(() => {
        console.log("deleted successfully");
      }).catch(e => console.log("Error on deleting Data into imdb table: ", e))
  }

   select(imdb_id) {
       this.sqliteObject.executeSql("SELECT * FROM imdbdata where movieid=tt0075860 ", []).then((data) => {
       console.log('data '+data);
       }, (error) => {
           console.log("ERROR: " + JSON.stringify(error));
       });
   }

  registerData(name, email, mobile, language, password, confirmPassword) {
      this.sqliteObject.executeSql('CREATE TABLE IF NOT EXISTS register(name varchar(30), email varchar(30), mobile int(15), language varchar(15), password varchar(30), confirmPassword varchar(30)', {})
      this.sqliteObject.executeSql("INSERT INTO register(name , email, mobile , language, password , confirmPassword )VALUES(\"" + name + "\",\"" + email + "\",\"" + mobile + "\",\"" + language + "\",\"" + password + "\",\"" + confirmPassword + "\")", {})
        .then(() => console.log('Data inserted into register table'))
        .catch(e => console.log(e));
    }
      

insertIntoImagesData(id, movie_id, link){
   this.sqliteObject.executeSql('CREATE TABLE IF NOT EXISTS imagesData(id int(11), movie_id varchar(30), link varchar(300)', {})
    this.sqliteObject.executeSql("INSERT INTO register(id , movie_id, link)VALUES(\"" + id + "\",\"" + movie_id + "\",\"" + link + "\")", {})
   .then(() => console.log('Data inserted into images table'))
        .catch(e => console.log(e));
}





getMainCategoryData(id, name, links){{

this.sqliteObject.executeSql('CREATE TABLE IF NOT EXISTS mainCategoryData(id int(11), name varchar(50), links varchar(300)', {})
    this.sqliteObject.executeSql("INSERT INTO mainCategoryData(id , name, links)VALUES(\"" + id + "\",\"" + name + "\",\"" + links + "\")", {})
   .then(() => console.log('Data inserted into images table'))
        .catch(e => console.log(e));

}

}
  }



