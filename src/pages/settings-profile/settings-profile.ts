import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsercrudProvider } from "../../providers/usercrud/usercrud";
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-settings-profile',
  templateUrl: 'settings-profile.html',
})
export class SettingsProfilePage {

  currentUser = {} as any;
  oldPassword : string;
  newPassword : string;
  confirmNewPassword : string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private usercrudProvider: UsercrudProvider,
  private afAuth : AngularFireAuth,) {
    this.currentUser = JSON.parse(this.navParams.get("currentUser"));
    console.log(this.currentUser);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsProfilePage');
  }

  updateProfile(currentUser){
    this.usercrudProvider.updateUserProfile(currentUser);
  }

  resetPassword(){
    var user = this.afAuth.auth.currentUser;
    console.log(user);
    user.updatePassword(this.newPassword).then((res)=>{
      console.log("mot de passe changé avec succes " , res);
      this.afAuth.auth.signOut();
    });
  }

}
