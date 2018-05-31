import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { MessagingModalPage } from "../messaging-modal/messaging-modal";
import firebase from "firebase";

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

  choix : string  = "messages";
  currentUser = {} as any;
  messageList: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController,
    private afDatabase: AngularFireDatabase, 
    private afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }

  ionViewWillEnter(){

    this.afAuth.auth.onAuthStateChanged(user => {
      if(user){
        this.currentUser.id = user.uid;
        console.log(this.currentUser.id);
        this.getMessagesList();
      }else{
        console.log("Erreur de chargement");
      }
    });

  }

  getMessagesList(){
    let Smessages = this.afDatabase.list<any>("/conversations/"+this.currentUser.id).valueChanges().subscribe(data=>{
      console.log(data);
      this.messageList = [];
      data.forEach(element => {
        let message = element;
        this.afDatabase.database.ref("/users/"+message.userId).once("value",snapshots =>{
          message.displayName = snapshots.val().displayName;
          message.avatar = snapshots.val().imageUrl;
          console.log(message);
        });//end of recupering user
        this.messageList.push(message);
        console.log(this.messageList);

      });//end of Foreach
    });//end of Smessages

  }

  goToMessage(friendId){
    let messageModal = this.modalCtrl.create(MessagingModalPage, 
      { 
        "currentUser": this.currentUser.id,
        "friendId": friendId 
      });
    messageModal.present();
    this.afDatabase.database.ref("/conversations/"+this.currentUser.id+"/"+friendId).update({
      seen: firebase.database.ServerValue.TIMESTAMP
    });
  }

  verifSeenMessage(message){

    if(message.sender == true){
      //afficher Vous : displayName
      return 1 ;
    }else if(message.sender==false && !message.seen){
      //Message Non vue
      return 2;
    }else if (message.sender==false ){
      //Rien
      return 3;
    }

  }


}
