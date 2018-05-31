import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { CompleteProfilePage } from './../complete-profile/complete-profile';
import { TabsPage } from "../tabs/tabs";
import { AngularFireDatabase } from 'angularfire2/database';

import { User } from "../../models/user";

@Component({
  selector: 'page-first-connection',
  templateUrl: 'first-connection.html',
})
export class FirstConnectionPage {

  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private afAuth: AngularFireAuth,
  private afDatabase: AngularFireDatabase) {
    this.afAuth.auth.onAuthStateChanged(user => {
      if(user){
        console.log('auth state changed');
        console.log(user)
      }else{
        console.log("auth state changed erru");
      }
    });
    console.log(this.navParams.get("userId"));
    this.user.id = this.navParams.get("userId");
    console.log("user id : "+ this.user.id);

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad FirstConnectionPage');
  }

  goToCompleteProfile(){
    this.navCtrl.setRoot(CompleteProfilePage);
  }

  skipToHome(){
    this.navCtrl.setRoot(TabsPage);
  }

}
