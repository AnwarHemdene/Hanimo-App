import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@Component({
  selector: 'page-addfeedbackmodal',
  templateUrl: 'addfeedbackmodal.html',
})
export class AddfeedbackmodalPage {

  feedBack = {} as any;
  currentUser = {} as any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewController: ViewController,
    private afDatabase: AngularFireDatabase, 
    private afAuth: AngularFireAuth) {

      this.currentUser = this.afAuth.auth.currentUser;
      console.log(this.currentUser);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddfeedbackmodalPage');
  }

  goBack(){
    this.viewController.dismiss();
  }

  sendFeedback(feedBack){

    console.log(feedBack);
    let newRef = this.afDatabase.list('/feedback/').push({});
    newRef.set({
      key: newRef.key,
      about: feedBack.about,
      contenu: feedBack.content,
      senderId: this.currentUser.uid,
      date: firebase.database.ServerValue.TIMESTAMP
    });
    this.goBack();
  }

}
