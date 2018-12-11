import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MoviesListPage } from '../pages/movies-list/movies-list';
import { MovieDetailsPage } from '../pages/movie-details/movie-details';
import {PersonDetailsPagePage} from '../pages/person-details/person-details'
import { AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';
// import { DatabaseProvider } from '../providers/database/database';
import {RegistrationPagePage} from '../pages/registration/registration';
import {UserchatPagePage} from '../pages/userchat/userchat';
import {ForgotpasswordPagePage } from '../pages/forgotpassword/forgotpassword';
import {ChangepasswordPagePage} from '../pages/changepassword/changepassword';
import {SigninPagePage} from '../pages/signin/signin';
import {PopoverPagePage} from '../pages/popover/popover';
import {MoreoptionsPagePage} from '../pages/moreoptions/moreoptions';

import { DatabaseProvider } from '../providers/database-provider';
import { SQLite } from '@ionic-native/sqlite';
import { Keyboard } from '@ionic-native/keyboard';
import {SearchmoviesPagePage} from '../pages/searchmovies/searchMovies';
import {FeedbackPagePage} from '../pages/feedback/feedback';
import {AboutusPagePage } from '../pages/aboutus/aboutus';

// Development
export const firebaseConfig = {
  apiKey: "AIzaSyDxqyW42CoZARpMS50SBMtNQFCa9h1X-ZE",
  authDomain: "moviebrowserionic.firebaseapp.com",
  databaseURL: "https://moviebrowserionic.firebaseio.com",
  storageBucket: "moviebrowserionic.appspot.com",
  messagingSenderId: "439456632492"
};

// Production
// export const firebaseConfig = {
//     apiKey: "AIzaSyAl5jnHhLvaw2AKYK7M_xr9mrWIGrg2HiY",
//     authDomain: "movic-c68c9.firebaseapp.com",
//     databaseURL: "https://movic-c68c9.firebaseio.com",
//     storageBucket: "movic-c68c9.appspot.com",
//     messagingSenderId: "549140886989"
//   };
// const myFirebaseAuthConfig = {
//   provider: AuthProviders.Password,
//   method: AuthMethods.Password
// }

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MovieDetailsPage,
    MoviesListPage,
    PersonDetailsPagePage,
    RegistrationPagePage,
    UserchatPagePage,
  ForgotpasswordPagePage,
  ChangepasswordPagePage,
  SigninPagePage,
  PopoverPagePage,
  MoreoptionsPagePage,
  SearchmoviesPagePage,
  FeedbackPagePage,
  AboutusPagePage,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MovieDetailsPage,
    MoviesListPage,
    PersonDetailsPagePage,
    RegistrationPagePage,
    UserchatPagePage,
    ForgotpasswordPagePage,
    ChangepasswordPagePage,
    SigninPagePage,
    PopoverPagePage,
    MoreoptionsPagePage,
    SearchmoviesPagePage,
    FeedbackPagePage,
    AboutusPagePage,
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage, SocialSharing,SQLite,Keyboard,
    DatabaseProvider]
})
export class AppModule {}
