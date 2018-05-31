import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController , ModalController } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';

//for notifications
import { HttpClient } from '@angular/common/http/';
import { HttpHeaders } from '@angular/common/http';

import { TabsPage } from './../tabs/tabs';
import { SearchPage } from './../search/search';
import { LoginPage } from "../login/login";
import { ConseilModalPage } from "../conseil-modal/conseil-modal";
import { PublicationModalPage } from "../publication-modal/publication-modal";
import { AnnonceA0Page } from "../annonce-a0/annonce-a0";
import { AnnonceA3Page } from "../annonce-a3/annonce-a3";
import { AnnonceA2Page } from "../annonce-a2/annonce-a2";
import { AnnonceA1Page } from "../annonce-a1/annonce-a1";

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from "../../models/user";
import { UsercrudProvider } from "../../providers/usercrud/usercrud";

import { Geolocation } from '@ionic-native/geolocation';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  pubType : string  = "pub";

  currentUser = {} as User;

  friendList: any;

  myFriends : any;

  pos : any;


  constructor(public navCtrl: NavController,public modalCtrl: ModalController,
    private http: HttpClient,
    private storage: Storage,
    private afAuth: AngularFireAuth,
    private afDatabase :AngularFireDatabase,
    private userProvider: UsercrudProvider,
    private geolocation: Geolocation,
    private diagnostic: Diagnostic) {

      this.afAuth.auth.onAuthStateChanged(user => {
        if(user){
          this.currentUser.id = user.uid;
          console.log("modifying user position");
          this.gettingPosition();
          console.log(this.currentUser.id);
        }else{
          console.log("Erreur de chargement");
        }
      });
  }


  //go to search page
  rootSearch(){
    this.navCtrl.push(SearchPage);
  }

  getFriendList(){
    console.log("getting friend list : ");
    this.afDatabase.list<any>("/friends/").valueChanges().subscribe(data => {
      this.myFriends = data;
      console.log("my friends : "+this.myFriends);
      this.friendList = [];
      this.myFriends.forEach(element => {
        console.log("element : "+element);
        console.log("element sender id : "+element.senderId);
        this.afDatabase.object("/users/"+element.senderId).valueChanges().subscribe(data=>{
          this.friendList.push(data);
        });
      });
    });

    this.showFriend();
  }

  showFriend(){
    this.friendList.forEach(element => {
      console.log("elemnt user nchallah : "+element);
      console.log("elemnt user name nchallah : "+element.displayName);
    });
  }

  updateReputation(){
    this.userProvider.updateReputation(this.currentUser.id,5);
  }

  getPosition(){
    console.log(this.pos);
  }

  gettingPosition(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.userProvider.updateUserPosition(this.currentUser.id,resp.coords);
      console.log("access position given");
      console.log(resp);
      this.pos = resp;
     }).catch((error) => {
       this.navCtrl.pop();
       console.log('Error getting location', error);
              
     });
  }

  openConseilModal(){
    let thisModal = this.modalCtrl.create(ConseilModalPage, {"currentUserId":this.currentUser.id});
    thisModal.present();
  }

  openPublicationModal(){
    this.navCtrl.push(PublicationModalPage,{"currentUserId":this.currentUser.id});
    /* let thisModal = this.modalCtrl.create(PublicationModalPage,{"currentUserId":this.currentUser.id});
    thisModal.present(); */
  }

  loadHome(){
    
  }

  sendNotification(){
    let body = {
      "notification":{
        "title":"New Notification has arrived",
        "body":"Notification Body",
        "sound":"default",
        "click_action":"FCM_PLUGIN_ACTIVITY",
        "icon":"fcm_push_icon"
      },
      "data":{
        "param1":"value1",
        "param2":"value2"
      },
        "to":"/topics/matchday",
        "priority":"high",
        "restricted_package_name":""
    }
    let options = new HttpHeaders().set('Content-Type','application/json');
    this.http.post("https://fcm.googleapis.com/fcm/send",body,{
      headers: options.set('Authorization', 'key=AAAA96ZF_R0:APA91bFQZUbbPmXhGZp09l_cjxeZVxzt_n-bkMqktzNrzwictuEKsdSOjxVMj9FAb4U2J6Io-2GbSuVO9-4FElsHZGMh7pXbfoIc3wijAPMXN0Eb5YgZZCAgjbfixwwc0smv2hPMp76-'),
    })
      .subscribe();
  }

  goToA0(){
    this.diagnostic.isLocationEnabled().then(res=>{
      if(res==true){
        this.navCtrl.push(AnnonceA0Page);
      }else{
        alert("Veuillez activez votre gps");
      }

    });
  }

  goToA1(){
    this.diagnostic.isLocationEnabled().then(res=>{
      if(res==true){
        this.navCtrl.push(AnnonceA1Page);
      }else{
        alert("Veuillez activez votre gps");
      }

    });
    
  }

  goToA2(){
    this.diagnostic.isLocationEnabled().then(res=>{
      if(res==true){
        this.navCtrl.push(AnnonceA2Page);
      }else{
        alert("Veuillez activez votre gps");
      }

    });
    
  }

  goToA3(){
    this.diagnostic.isLocationEnabled().then(res=>{
      if(res==true){
        this.navCtrl.push(AnnonceA3Page);
      }else{
        alert("Veuillez activez votre gps");
      }

    });
    
  }


}
