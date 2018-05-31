import { Component , ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController , Content} from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from "firebase";
import { Camera, CameraOptions } from '@ionic-native/camera';


@Component({
  selector: 'page-messaging-modal',
  templateUrl: 'messaging-modal.html',
})
export class MessagingModalPage {
  @ViewChild(Content) content: Content;

  currentUserId : string;
  friendId : string;
  discussion : any = [] ;
  message : string;
  friendUser = {} as any;
  imageMessage = null;
  imageDownloadUrl = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private camera: Camera,
    private viewController: ViewController,
    private afDatabase: AngularFireDatabase, 
    private afAuth: AngularFireAuth) {

      

  }

  ionViewWillEnter(){

    this.currentUserId = this.navParams.get("currentUser");
    console.log("currentUserId : ",this.currentUserId);

    this.friendId = this.navParams.get("friendId");
    console.log("friendId : ",this.friendId);

    this.afDatabase.database.ref("/users/"+this.friendId).once("value",snapshots =>{
      this.friendUser = snapshots.val();
      console.log(this.friendUser);
    });

    this.getMessages(this.friendId);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagingModalPage');
    
  }

  getMessages(userId){
    let myMessages = [];
    this.afDatabase.list<any>("/discussions/"+this.currentUserId+"/"+userId).valueChanges()
      .subscribe(data =>{
        myMessages = data;
        console.log(myMessages);

        let hisMessages = [];
        this.afDatabase.list<any>("/discussions/"+userId+"/"+this.currentUserId).valueChanges()
        .subscribe(data2=>{
          this.discussion = myMessages.concat(data2);
          this.discussion.sort(function (a, b) {
            return a.date - b.date;
          });
          console.log(this.discussion);
        });
      });
    
  }

  async sendMessage(){
    console.log("message to : ",this.friendId);

    let newRef = this.afDatabase.list('/discussions/'+this.currentUserId+"/"+this.friendId).push({});


    await this.uploadImageMessage(this.imageMessage,newRef.key).then(()=>{

      newRef.set({
        senderId: this.currentUserId,
        messageKey: newRef.key,
        attachement: this.imageDownloadUrl,
        content: this.message,
        date: firebase.database.ServerValue.TIMESTAMP
      }).then(()=>{
        //that thing goes here
        this.afDatabase.list("/conversations/"+this.currentUserId).set(this.friendId,{
          userId: this.friendId,
          attachement: this.imageDownloadUrl,
          content: this.message,
          date: firebase.database.ServerValue.TIMESTAMP,
          sender: true
        });

        this.afDatabase.list("/conversations/"+this.friendId).set(this.currentUserId,{
          userId: this.currentUserId,
          attachement: this.imageDownloadUrl,
          content: this.message,
          date: firebase.database.ServerValue.TIMESTAMP,
          sender: false
        });
        this.message = "";
        this.imageMessage = null;
      });

    });

    
  }

  addAttachement(){
    console.log("add attachement ...");
  }

  goBack(){
    this.viewController.dismiss();
  }

  capture(sourceType){
    console.log("cameraaaaaaaa capture");
    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,
      allowEdit: true,
      correctOrientation: true
    };

    this.camera.getPicture(cameraOptions).then((imageData) => {

      console.log(imageData);
      let dataUrl = 'data:image/jpeg;base64,' + imageData;
      this.imageMessage = dataUrl;
      console.log(this.imageMessage);

    },(err) => {
      console.log(err);
    });
  }

  async uploadImageMessage(captureDataUrl,messageKey){
    if(captureDataUrl){
      let storageRef = await firebase.storage().ref("messagesImages/");

      const filename = messageKey+".jpg";
      const imageRef = storageRef.child(filename);

      await imageRef.putString(captureDataUrl, firebase.storage.StringFormat.DATA_URL).then(snap=>{
        this.imageDownloadUrl = snap.downloadURL;
        console.log(this.imageDownloadUrl);
      });
    }
  }

}
