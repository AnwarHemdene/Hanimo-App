import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFireDatabaseModule } from "angularfire2/database";
//native plugins
import { GooglePlus } from "@ionic-native/google-plus";
import { Geolocation } from '@ionic-native/geolocation';
import { Facebook } from '@ionic-native/facebook';
import { Camera } from '@ionic-native/camera';
import { IonicStorageModule } from '@ionic/storage';
import { GoogleMaps , Spherical} from '@ionic-native/google-maps';
import { ImagePicker } from '@ionic-native/image-picker';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { FCM } from '@ionic-native/fcm';
import { Diagnostic } from '@ionic-native/diagnostic';

import { MediaCapture } from '@ionic-native/media-capture';
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';


import firebase from 'firebase';
import { FIREBASE_CREDENTIALS } from "./firebase.credentials";

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { SignupPage } from "../pages/signup/signup";
import { LoginPage } from "../pages/login/login";
import { FirstConnectionPage } from "../pages/first-connection/first-connection";
import { CompleteProfilePage } from './../pages/complete-profile/complete-profile';
import { TabsPage } from './../pages/tabs/tabs';
import { MessagesPage } from '../pages/messages/messages';
import { PosterPage } from '../pages/poster/poster';
import { InvitationPage } from '../pages/invitation/invitation';
import { AnnoncesPage } from "../pages/annonces/annonces";
import { SearchPage } from "../pages/search/search";
import { AnnonceA0Page } from "../pages/annonce-a0/annonce-a0";
import { AnnonceA1Page } from "../pages/annonce-a1/annonce-a1";
import { AnnonceA3Page } from "../pages/annonce-a3/annonce-a3";
import { AnnonceA2Page } from "../pages/annonce-a2/annonce-a2";
import { ConseilModalPage } from "../pages/conseil-modal/conseil-modal";
import { PublicationModalPage } from "../pages/publication-modal/publication-modal";
import { CommentsModalPage } from "../pages/comments-modal/comments-modal";
import { FriendsPage } from "../pages/friends/friends";
import { ProfilePage } from "../pages/profile/profile";
import { MapPage } from "../pages/map/map";
import { SettingsProfilePage } from "../pages/settings-profile/settings-profile";
import { MessagingModalPage } from "../pages/messaging-modal/messaging-modal";
import { OtherprofilePage } from "../pages/otherprofile/otherprofile";
import { FeedbackPage } from "../pages/feedback/feedback";
import { AddfeedbackmodalPage } from "../pages/addfeedbackmodal/addfeedbackmodal";

import { UsercrudProvider } from '../providers/usercrud/usercrud';
import { AnnonceCrudProvider } from '../providers/annonce-crud/annonce-crud';
import { PubsProvider } from '../providers/pubs/pubs';

firebase.initializeApp(FIREBASE_CREDENTIALS);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    LoginPage,
    FirstConnectionPage,
    CompleteProfilePage,
    TabsPage,
    MessagesPage,
    PosterPage,
    InvitationPage,
    AnnoncesPage,
    SearchPage,
    AnnonceA0Page,
    AnnonceA3Page,
    AnnonceA2Page,
    AnnonceA1Page,
    ConseilModalPage,
    PublicationModalPage,
    CommentsModalPage,
    MapPage,
    FriendsPage,
    ProfilePage,
    SettingsProfilePage,
    MessagingModalPage,
    OtherprofilePage,
    FeedbackPage,
    AddfeedbackmodalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    LoginPage,
    FirstConnectionPage,
    CompleteProfilePage,
    TabsPage,
    MessagesPage,
    PosterPage,
    InvitationPage,
    AnnoncesPage,
    SearchPage,
    AnnonceA0Page,
    AnnonceA3Page,
    AnnonceA2Page,
    AnnonceA1Page,
    ConseilModalPage,
    PublicationModalPage,
    CommentsModalPage,
    MapPage,
    FriendsPage,
    ProfilePage,
    SettingsProfilePage,
    MessagingModalPage,
    OtherprofilePage,
    FeedbackPage,
    AddfeedbackmodalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Media,
    File,
    UsercrudProvider,
    GooglePlus,
    Facebook,
    Camera,
    Geolocation,
    GoogleMaps,
    AnnonceCrudProvider,
    ImagePicker,
    LocationAccuracy,
    NativeGeocoder,
    PubsProvider,
    Spherical,
    MediaCapture,
    FCM,
    Diagnostic
  ]
})
export class AppModule {}
