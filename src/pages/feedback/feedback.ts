import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController} from 'ionic-angular';
import { AddfeedbackmodalPage } from "../addfeedbackmodal/addfeedbackmodal";
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {

  currentUser = {} as any;
  feedbacks ;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController,
    private afDatabase: AngularFireDatabase, 
    private afAuth: AngularFireAuth) {

      this.currentUser = this.afAuth.auth.currentUser;
  }

  ionViewWillEnter(){
    let sFeeds = this.afDatabase.database.ref("/feedback/")
    .orderByChild("senderId").equalTo(this.currentUser.uid).on("value",snapshots => {
      this.feedbacks = [];
      snapshots.forEach(item =>{
        this.feedbacks.push(item.val());

        return false;
      })
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }

  goToAddFeeback() {
    console.log("goToAddFeeback()")
    let feedbackModal = this.modalCtrl.create(AddfeedbackmodalPage, { userId: 8675309 });
    feedbackModal.present();
  }

}
