import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { UsercrudProvider } from "../../providers/usercrud/usercrud";

import { User } from './../../models/user';

@Component({
  selector: 'page-complete-profile',
  templateUrl: 'complete-profile.html',
})
export class CompleteProfilePage {

  user = {} as User;

  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  private afAuth: AngularFireAuth,
  private usercrudProvider: UsercrudProvider) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompleteProfilePage');
    this.afAuth.auth.onAuthStateChanged(res => {
      if(res){
        console.log('auth state changed');
        console.log(res);
        this.user.id= res.uid;
      }else{
        console.log("auth state changed erru");
      }
    });
  }

  completeProfile(user){
    console.log("Complete Profile");
    console.log(user);
    console.log(this.user);
    this.usercrudProvider.completeProfile(user);
  }

}
