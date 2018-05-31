
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams , ModalController } from 'ionic-angular';

import { UsercrudProvider } from "../../providers/usercrud/usercrud";
import { OtherprofilePage } from "../otherprofile/otherprofile";
import { User } from "../../models/user";
import { Invitation } from "../../models/invitation";

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  users : any [];
  list : any [];
  invitations : any = [] ;
  currentUser = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private userCrud: UsercrudProvider,
    private storage: Storage) {

      this.afAuth.auth.onAuthStateChanged(user => {
        if(user){
          this.currentUser.id = user.uid;
          console.log(this.currentUser.id);
        }else{
          console.log("Erreur de chargement");
        }
      });
      this.initilizeUsers();

  }

  initilizeUsers(){
    let sUsers = this.afDatabase.list<any>("/users/").valueChanges().subscribe(data=>{

      this.users = [];
      data.forEach(element => {
        let user = element;
        user.state = 0;
        this.verifInvitation(user);
        console.log(user);
        this.users.push(user);
      });
      console.log(this.users);
      sUsers.unsubscribe();

    });
  }

  getUsers(ev: any){
    // Reset items back to all of the items
    this.list = this.users;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.list = this.list.filter((item) => {
        return (item.displayName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

/*   ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
    let sInvitations = this.afDatabase.list('/invitations/').valueChanges().subscribe(data => {
      this.invitations = data;
      console.log(this.invitations);
      sInvitations.unsubscribe();
    });
  } */

  sendMessage(id){
    console.log("send message to : "+id);
  }

  sendInvitation(user){
    console.log("idReceiver : ",user.id);
    let invitation: any = {}  ;
    invitation.idReceiver = user.id;
    invitation.idSender = this.currentUser.id;
    console.log(invitation);
    user.state = 2;

    let newRef = this.afDatabase.list('/invitations/').push({});
    newRef.set({
      key: newRef.key,
      idSender : invitation.idSender,
      idReceiver: invitation.idReceiver,
      date: firebase.database.ServerValue.TIMESTAMP
    });
  }

  cancelInvitation(user){
    user.state = 2;
    this.afDatabase.database.ref("/invitations/").orderByChild("idSender").equalTo(this.currentUser.id).once("value",snap=>{
      console.log(snap);
      snap.forEach(element => {
        if(element.val().idReceiver == user.id){
          console.log(element);
          let key = element.val().key;
          this.afDatabase.list('/invitations/').remove(key);
          console.log(user);
          return false;
        }
      });
    });
  }

  verifInvitation(user){
    console.log(user.id);
    let sVerifInvit = this.afDatabase.list<any>("/invitations/").valueChanges().subscribe(data=>{
      data.forEach(element => {
        if(element.idSender == this.currentUser.id && element.idReceiver == user.id){
          console.log(element);
          console.log("invit sent");
          user.state = 2;
          console.log(user);
        }else if(element.idSender == user.id && element.idReceiver == this.currentUser.id){
          console.log(element);
          console.log("invit recu");
          user.state = 3;
          console.log(user);
        }
      });
      sVerifInvit.unsubscribe();
    });

    if(user.state != 2 && user.state != 3){
      let sVerifFriends = this.afDatabase.list<any>("/friends/").valueChanges().subscribe(data =>{
        data.forEach(element => {
          if((element.id1 == this.currentUser.id && element.id2 == user.id) || (element.id2 == this.currentUser.id && element.id1 == user.id)){
            console.log("friends");
            user.state = 1;
            console.log(user);
          }
        })
        sVerifFriends.unsubscribe();
      });

    }

  }

  goToUserProfile(user){
    let otherProfileModal = this.modalCtrl.create(OtherprofilePage, 
      { 
        "currentUserId": this.currentUser.id,
        "userId": user.id,
        "relationStatus": user.state
      });
      otherProfileModal.present();
  }

}