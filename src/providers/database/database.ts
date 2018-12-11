import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import 'rxjs/add/operator/map';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DatabaseProvider {

  public imdbDataUrl: any;
  public imdbData: any;
  public movieLink: any;
  public trailerLink: any;
  public certificate: any;
  public date: any;
  public socialSite: any;
  public rating: any;
  public movieId: any;

  constructor(public http: Http, private sqlite: SQLite) {
    console.log('Hello DatabaseProvider Provider');
    //this.createDatebaseTable();
  }
  

  // insertIntoIMDbTable() {
  //   this.sqlite.create({
  //     name: 'movic.db',
  //     location: 'default'
  //   }).then((db: SQLiteObject) => {
  //       db.executeSql('CREATE TABLE IF NOT EXISTS imdbdata(id int(11) Primary key , movieid varchar2(100), movielink varchar(100), moviename varchar(100), duration varchar(100), genre varchar(100), certificate varchar(100), release_date varchar(100), productioncomp varchar(100), budget varchar(100), opening varchar(100), gross varchar(100), imdb_rating varchar(100),Language varchar(100),trailorlink varchar(100),imagelink varchar(100),socialsite1 varchar(100), socialsite3 varchar(100), )', {})
  //       db.executeSql('INSERT INTO imdbdata(id int(11) Primary key , movieid varchar2(100), movielink varchar(100), moviename varchar(100), duration varchar(100), genre varchar(100), certificate varchar(100), release_date varchar(100), productioncomp varchar(100), budget varchar(100), opening varchar(100), gross varchar(100), imdb_rating varchar(100),Language varchar(100),trailorlink varchar(100),imagelink varchar(100),socialsite1 varchar(100), socialsite3 varchar(100), )', {})        
  //         .then(() => console.log('Table Created'))
  //         .catch(e => console.log(e));
  //     })
  //     .catch(e => console.log(e));
  // }

  


  // insertIntoStarCastTable() {
  //   this.sqlite.create({
  //     name: 'movic.db',
  //     location: 'default'
  //   }).then((db: SQLiteObject) => {
  //       db.executeSql('create table if not exists starcast(id int(11) primary key, link varchar(200), star_id varchar(100), name varchar(1000), profession varchar(1000), movie_id varchar(100), biography varchar(10000), imagelink varchar(1000) )', {})
  //         .then(() => console.log('Table Created'))
  //         .catch(e => console.log(e));
  //     })
  //     .catch(e => console.log(e));
  // }


  // insertDataImdb() {
  //   this.sqlite.create({
  //     name: 'data.db',
  //     location: 'default'
  //   })
  //     .then((db: SQLiteObject) => {

  //       //db.executeSql("insert into employee (name) values (\""+msg+ "\")", [])
  //       db.executeSql('insert into imdb.imdbdata [(id, movieid, movielink, moviename, duration, genre, certificate, release_date, productioncomp, budget, opening, gross, imdb_rating, Language, trailorlink, imagelink, socialsite1, socialsite2, socialsite3)] values(', [])
  //         // db.executeSql('insert into imdb.starcast [(idlink, star_idname, profession, movie_id, biography, imagelink)]  values (', [])
  //         .then(() => console.log('Data Inserted'))
  //         .catch(e => console.log(e));
  //     })
  //     .catch(e => console.log(e));
  // }

  // insertDataStarcast() {
  //   this.sqlite.create({
  //     name: 'data.db',
  //     location: 'default'
  //   })
  //     .then((db: SQLiteObject) => {
  //       // db.executeSql('insert into imdb.imdbdata [(id, movieid, movielink, moviename, duration, genre, certificate, release_date, productioncomp, budget, opening, gross, imdb_rating, Language, trailorlink, imagelink, socialsite1, socialsite2, socialsite3)] values(', [])
  //       db.executeSql('insert into imdb.starcast [(idlink, star_idname, profession, movie_id, biography, imagelink)]  values (', [])
  //         .then(() => console.log('Data Inserted'))
  //         .catch(e => console.log(e));
  //     })
  //     .catch(e => console.log(e));
  // }

  // deleteData() {

  //   this.sqlite.create({
  //     name: 'data.db',
  //     location: 'default'
  //   })
  //     .then((db: SQLiteObject) => {


  //       db.executeSql('delete from  imdb(name VARCHAR(32))', {})
  //         .then(() => console.log('Data Deleted'))
  //         .catch(e => console.log(e));
  //     })
  //     .catch(e => console.log(e));
  // }

 
}

