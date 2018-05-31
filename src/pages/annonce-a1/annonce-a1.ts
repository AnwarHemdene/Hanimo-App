import { Component } from '@angular/core';
import { LoadingController , NavController, NavParams , AlertController , ToastController} from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

import { User } from "../../models/user";
import { Annonce } from "../../models/annonce";
import { AnnonceCrudProvider } from "../../providers/annonce-crud/annonce-crud";
import { UsercrudProvider } from "../../providers/usercrud/usercrud";

import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';

import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-annonce-a1',
  templateUrl: 'annonce-a1.html',
})
export class AnnonceA1Page {


  imageNumber : number;

  captureDataUrl: any;

  currentLocation: any;

  locationString : string = "chargement ... ";

  loading: any;

  annonce = {} as Annonce;
  user = {} as User;
  imgUrl: string = '';

  constructor(public navCtrl: NavController , private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private afAuth: AngularFireAuth,
    private annonceProvider: AnnonceCrudProvider,
    private usercrudProvider: UsercrudProvider,
    private camera: Camera,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public loadingCtrl: LoadingController,
    private diagnostic: Diagnostic) {

      this.imageNumber = 0;

      this.captureDataUrl = [];

      console.log("-------------------------------------------");
      this.geolocation.getCurrentPosition().then((resp) => {
            console.log("access position given");
            console.log(resp);
            this.currentLocation = resp.coords;
            this.nativeGeocoder.reverseGeocode(resp.coords.latitude,resp.coords.longitude)

              .then((result: NativeGeocoderReverseResult) =>{

                 console.log(result);
                 this.locationString = result.locality+" ,"+result.thoroughfare;
                 console.log(this.locationString);

                }).catch((error: any) => console.log(error));

           }).catch((error) => {
             this.navCtrl.pop();
             console.log('Error getting location', error);
                    
           });

      this.afAuth.auth.onAuthStateChanged(user => {
        if(user){
          this.user.id = user.uid;
          console.log(this.user.id);
        }else{
          console.log("Erreur de chargement");
        }
      });

  }


  async publierAnnonce(annonce: Annonce){

    this.diagnostic.isLocationEnabled().then(res=>{
      if(res==true){

        let loading = this.loadingCtrl.create({
          content: 'Publication ...',
        });
  
        loading.present().then(()=>{
          console.log("current location : ");
          console.log(this.currentLocation);
          annonce.typeAnnonce = 1;
          annonce.nbimage = this.imageNumber;
          annonce.latitude = this.currentLocation.latitude;
          annonce.longitude = this.currentLocation.longitude;
          annonce.creatorAnnonceId = this.user.id;
          console.log(annonce);
          this.annonceProvider.addingAnnonce(annonce,this.captureDataUrl).then(()=>{
            
            this.usercrudProvider.updateReputation(this.user.id,10);          
  
          }).then(()=>{
  
            loading.dismissAll();
            this.navCtrl.setRoot(HomePage);
            console.log("dismissing loader");
  
          });
  
        });

      }else{
        alert("Veuillez activez votre gps");
      }

    });
    
  }

    capture(sourceType){
      console.log("cameraaaaaaaa capture");
      const cameraOptions: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: sourceType,
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
