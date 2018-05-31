import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase/app';

import { User } from "../../models/user";
import { Invitation } from "../../models/invitation";
import { Friend } from "../../models/friend";

import { UsercrudProvider } from "../../providers/usercrud/usercrud";

@Component({
  selector: 'page-invitation',
  templateUrl: 'invitation.html',
})
export class InvitationPage {


  currentUser = {} as User;
  invitations : any = [] ;
  public users: Array<any> = [];
  invitationsRef =  this.afDatabase.database.ref('/invitations/');

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private userProvider: UsercrudProvider,
  private storage: Storage,
  private afDatabase: AngularFireDatabase,
  private afAuth: AngularFireAuth) {

    /* this.afAuth.auth.onAuthStateChanged(user => {
      if(user){
        this.currentUser.id = user.uid;
        this.initilizeInvitationsList();
        console.log(this.currentUser.id);
      }else{
        console.log("Erreur de chargement");
      }
    }); */
  }

/*   loadPage() {
    
    this.afDatabase.database.ref("/invitations/").orderByChild("idReceiver").equalTo(this.currentUser.id)
      .on("value",data=>{
        this.invitations = data;
        console.log(this.invitations.val());
        this.invitations.forEach(element => {
          console.log(element.val().idSender);
          this.getUsers(element.val().idSender,element.val().key);
        });
        console.log(this.users);
      });
  } */

  ionViewWillEnter(){
    this.afAuth.auth.onAuthStateChanged(user => {
      if(user){
        this.currentUser.id = user.uid;
        this.initilizeInvitationsList();
        console.log(this.currentUser.id);
      }else{
        console.log("Erreur de chargement");
      }
    });
  }

  initilizeInvitationsList(){
    this.invitationsRef
     .orderByChild("idReceiver").equalTo(this.currentUser.id).on("value",invitSnapshot => {
         console.log("usersnapshot : "+invitSnapshot.val());
         this.users=[];
         invitSnapshot.forEach( invitNap => {
           let invit = invitNap.val();
           console.log(invit);
           this.afDatabase.database.ref("/users/"+invit.idSender).once("value",userSnap=>{
             invit.displayName = userSnap.val().displayName;
             invit.imageUrl = userSnap.val().imageUrl;
             console.log(invit);
             this.users.push(invit);
           });
           //this.invitations.push(invitNap.val());
           return false;
         });
         this.users.sort(function (a, b) {
          return a.date - b.date;
        });
       });
 }

  getUsers(idUser,invitId){
    this.afDatabase.database.ref("/users/"+idUser).once("value",data=>{
      let invit : any = {};
      invit = data.val();
      invit.key = invitId;
      this.users.push(invit);
      console.log(invit);
    });
  }


  acceptInvitation(userId,key){
    let friendRef = this.afDatabase.list('/friends/').push({});
    friendRef.set({
      key: friendRef.key,
      id1: userId,
      id2: this.currentUser.id,
      date: firebase.database.ServerValue.TIMESTAMP
    });

    this.afDatabase.list('/invitations/').remove(key);
    this.users = [];
  }

  declineInvitation(key){
    this.afDatabase.list('/invitations/').remove(key);
  }
}
