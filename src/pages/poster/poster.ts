import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController , ToastController} from 'ionic-angular';

import { User } from "../../models/user";
import { AnnonceA0Page } from "../annonce-a0/annonce-a0";
import { AnnonceA3Page } from "../annonce-a3/annonce-a3";
import { AnnonceA2Page } from "../annonce-a2/annonce-a2";
import { AnnonceA1Page } from "../annonce-a1/annonce-a1";

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Diagnostic } from '@ionic-native/diagnostic';

@Component({
  selector: 'page-poster',
  templateUrl: 'poster.html',
})
export class PosterPage {

  captureDataUrl: any;
  user = {} as User;
  reputation : number = 0;

  constructor(public navCtrl: NavController , private alertCtrl: AlertController,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private diagnostic: Diagnostic) {

      this.afAuth.auth.onAuthStateChanged(user => {
        if(user){
          this.user.id = user.uid;
          console.log(this.user.id);
          this.getUserReputation(this.user.id).then(()=>{
            console.log("this.reputation : ");
            console.log(this.reputation);
             
          });
          
        }else{
          console.log("Erreur de chargement");
        }
      });

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

  async getUserReputation(userId: string){
    await this.afDatabase.database.ref("/users/"+userId+"/reputation").once("value", snap=>{
      this.reputation = snap.val();
    });
  }

}