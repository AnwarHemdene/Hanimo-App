import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../../models/user';
import { Invitation } from "../../models/invitation";
import { Friend } from "../../models/friend";

import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';



@Injectable()
export class UsercrudProvider {


  constructor(public http: HttpClient,
  private afDatabase: AngularFireDatabase) {
    console.log('Hello UsercrudProvider Provider');
  }

  addUser(user: User){
    const usersRef = this.afDatabase.database.ref("/users/"+user.id);
    usersRef.once("value",snap => {
      console.log(snap.val());
      if(snap.val()){
        console.log("user exists from provider");
      }else{
        console.log("user NOT exists from provider");
        console.log(user);
        user.reputation = 1;
        this.afDatabase.list('/users/').set(user.id,user).then(res => {
          console.log(res);
        });
      }
    });
    
  }

  completeProfile(user: User){
    this.afDatabase.database.ref('/users/'+user.id).update(user).then(res=>{
      console.log("updating data");
      console.log(res);
    });
  }

async findUserbyId(idUser : string){
    await this.afDatabase.database.ref("/users/"+idUser).on("value",snap => {
      console.log(snap.val());
      /*console.log(snap.val());
      return snap.val();*/
    });
  }

  async sendInvitation(invitation: any){
    const ref = await this.afDatabase.database.ref('/invitations/');
    ref.push(invitation).then(res => {
      console.log(res.key);
      const key = res.key;
      invitation.invitId= key;
      this.afDatabase.database.ref('/invitations/'+invitation.invitId).update(invitation).then(res=>{
        console.log("finished adding invtation");
        console.log(res);
      })
    });
  }

  async acceptInvitation(friend: Friend){
    const ref = await this.afDatabase.database.ref('/friends/');
    ref.push(friend).then(res => {
      console.log(res.key);
      const key = res.key;
      friend.friendId= key;
      this.afDatabase.database.ref('/friends/'+friend.friendId).update(friend).then(res=>{
        console.log("finished adding friends");
        console.log(res);
        this.afDatabase.database.ref("/invitations/").orderByChild("receiverId").equalTo(friend.receiverId)
          .on("value",invitSnapShot => {
            invitSnapShot.forEach( invitSnap => {
              console.log()
              if(invitSnap.val().senderId == friend.senderId){
                this.afDatabase.database.ref("/invitations/").child(invitSnap.val().invitId).remove().then(res => {
                  console.log("invitation deleted : "+res);
                });
              };
              return false;
            });
          });
      });
    });
  }

  declineInvitation(friend: Friend){
    this.afDatabase.database.ref("/invitations/").orderByChild("receiverId").equalTo(friend.receiverId)
          .on("value",invitSnapShot => {
            invitSnapShot.forEach( invitSnap => {
              console.log()
              if(invitSnap.val().senderId == friend.senderId){
                this.afDatabase.database.ref("/invitations/").child(invitSnap.val().invitId).remove().then(res => {
                  console.log("invitation deleted : "+res);
                });
              };
              return false;
            });
          });
  }

  updateReputation(userId: string,value: number){
    this.afDatabase.database.ref("/users/"+userId).once("value",snapShot => {
      value =value + snapShot.val().reputation;
      this.afDatabase.database.ref("/users/"+userId).update({reputation: value}).then(res => {
        console.log("updating reputation from provider "+res);
      });
    });
  }

  updateUserPosition(userId: string,value:any){

    const usersRef = this.afDatabase.database.ref("/users/"+userId);
    usersRef.once("value",snap => {
      if(snap.val()){
        this.afDatabase.database.ref("/users/"+userId).update({
          currentPositionLat: value.latitude,
          currentPositionLng: value.longitude,
        }).then(res => {
          console.log("updating position from provider "+res);
        });
      }
    });

      
  }

  updateUserProfile(user){
    this.afDatabase.database.ref("/users/"+user.id).update(user);
  }



  async uploadProfilePicture(imgDataUrl,idUser){
    let storageRef = await firebase.storage().ref("profileImages/");

    const filename = idUser+".jpg";
    const imageRef = storageRef.child(filename);

    await imageRef.putString(imgDataUrl, firebase.storage.StringFormat.DATA_URL).then(snap=>{
      console.log("image added : "+snap);
      console.log(snap);
      this.afDatabase.database.ref("/users/"+idUser).update({
        imageUrl: snap.downloadURL
      })
    });
  }


}
