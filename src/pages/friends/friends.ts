import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from "firebase";

import { MessagingModalPage } from "../messaging-modal/messaging-modal";
import { OtherprofilePage } from "../otherprofile/otherprofile";

@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {

  currentUser = {} as any;
  friends : any = [] ;
  tab : any = [] ;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController,
    private afDatabase: AngularFireDatabase, 
    private afAuth: AngularFireAuth,)  {

  }

  ionViewWillEnter(){

    this.afAuth.auth.onAuthStateChanged(user => {
      if(user){
        this.currentUser.id = user.uid;
        console.log(this.currentUser.id);
      }else{
        console.log("Erreur de chargement");
      }
    });

    this.intializeFriendList();

  }

  intializeFriendList(){
    let sAnnonces = this.afDatabase.list<any>("/friends/").valueChanges().subscribe(data => {
      console.log(data);
      let i = 0;
      data.forEach(element =>{

        if(element.id1 == this.currentUser.id || element.id2 == this.currentUser.id){
          let friend : any = {} ;
          friend.userId = element.id2;
          if(element.id2 == this.currentUser.id){friend.userId = element.id1}
          friend.key = element.key;
          friend.date = element.date;
          console.log(friend);

          this.afDatabase.database.ref("/users/"+friend.userId).once("value",snap => {
            friend.displayName = snap.val().displayName;
            friend.avaterUrl = snap.val().imageUrl;
            friend.index = i;
            console.log(friend);
            i++;
            this.friends.push(friend);
          });

        }
      });
      this.tab = this.friends;
      console.log("-------------------------");
      this.friends.sort(function (a, b) {
        return a.date - b.date;
      });
      console.log(this.tab);
      console.log("-------------------------");
      sAnnonces.unsubscribe();
    });
  }

  deleteFriend(key,index){
    console.log(index);
    this.tab.splice(index,1);
    this.friends.splice(index,1);
    console.log(this.friends);
    console.log(this.tab);
    this.afDatabase.list('/friends/').remove(key);
    console.log("deleting : ",key);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.tab = this.friends;
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.tab = this.tab.filter((item) => {
        return (item.displayName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  message(friendId){
    let messageModal = this.modalCtrl.create(MessagingModalPage, 
      { 
        "currentUser": this.currentUser.id,
        "friendId": friendId 
      });
    messageModal.present();
  }

  goToUserProfile(userId){
    let otherProfileModal = this.modalCtrl.create(OtherprofilePage, 
      { 
        "currentUserId": this.currentUser.id,
        "userId": userId,
        "relationStatus": 1
      });
      otherProfileModal.present();
  }

}
