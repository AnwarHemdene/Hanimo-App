import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController , ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireDatabase } from 'angularfire2/database';
import { PubsProvider } from "../../providers/pubs/pubs";

import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';
import { Storage } from '@ionic/storage';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';

import firebase from 'firebase';

@Component({
  selector: 'page-publication-modal',
  templateUrl: 'publication-modal.html',
})
export class PublicationModalPage {

  currentUser = {} as any;
  video : any;
  captureDataUrl: any;
  imageNumber : number;
  content : string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    private pubsProvider: PubsProvider,
    private viewController: ViewController,
    private afDatabase :AngularFireDatabase,
    private mediaCapture: MediaCapture, 
    private storage: Storage, 
    private file: File, 
    private media: Media) {

      this.imageNumber = 0;

      this.captureDataUrl = [];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublicationModalPage');
  }

  ionViewWillEnter(){
    let id = this.navParams.get("currentUserId");
    this.afDatabase.database.ref("/users/"+id).once("value",data => {
      this.currentUser = data.val();
      console.log(this.currentUser);
    });
  
  }

  publier(){
    let publication = {} as any;
    publication.creatorId = this.currentUser.id;
    publication.nbimage = this.imageNumber;
    publication.content = this.content;
    publication.date = firebase.database.ServerValue.TIMESTAMP;

    this.pubsProvider.addPublication(publication,this.captureDataUrl);
  }

  openAction(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Enrichissez votre publication',
      buttons: [
        {
          text: 'Prendre une photo',
          handler: () => {
            console.log('Prendre une photo clicked');
            this.takePicture();
          }
        },
        {
          text: 'Video',
          handler: () => {
            console.log('Video clicked');
            /* this.recordVideo(); */
          }
        },
        {
          text: 'Gallerie',
          handler: () => {
            console.log('Gallerie clicked');
          }
        },
        {
          text: 'Position',
          handler: () => {
            console.log('Position clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }

  takePicture(){
    this.capture(1);
  }

  importPicture(){
    this.capture(1);
  }

  recordVideo(){
    let options: CaptureVideoOptions = {
      limit: 1,
      duration: 60
    }
    this.mediaCapture.captureVideo(options).then(data =>{
      console.log(data);
      let fpath = data[0].fullPath;
      let name = data[0].name;
      let path = fpath.replace(name, '');

      this.video = path;

    }).then(()=>{
      let storageRef = firebase.storage().ref("videos/");


      storageRef.putString(this.video, firebase.storage.StringFormat.DATA_URL).then(snap=>{
        console.log("video added : "+snap);
        console.log(snap);
      });
    
    })
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
      this.captureDataUrl.push(dataUrl);
      this.imageNumber++;
      console.log(this.captureDataUrl);

    },(err) => {
      console.log(err);
    });
  }

}
