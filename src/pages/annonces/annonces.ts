import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController , ToastController , ActionSheetController} from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Geolocation } from '@ionic-native/geolocation';

import { MapPage } from "../map/map";
import { CommentsModalPage } from "../comments-modal/comments-modal";
import { User } from "../../models/user";
import { AnnonceCrudProvider } from "../../providers/annonce-crud/annonce-crud";

@Component({
  selector: 'page-annonces',
  templateUrl: 'annonces.html',
})
export class AnnoncesPage {

  liked = false;
  isModal = false;
  currentUser = {} as User;
  annonceList : any = [];
  pos : any;
  pub : any ;
  publications: any = [];
  storageRef = firebase.storage().ref();
  nowDate : any ;
  compteur = 0;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public annonceCrudProvider: AnnonceCrudProvider,
    private afAuth: AngularFireAuth,
    private afDatabase :AngularFireDatabase,
    private geolocation: Geolocation) {
      
      this.nowDate = new Date();
      console.log(this.nowDate);

      this.afAuth.auth.onAuthStateChanged(user => {
        if(user){
          this.currentUser.id = user.uid;
          console.log("modifying user position");
          console.log(this.currentUser.id);
        }else{
          console.log("Erreur de chargement");
        }
      });

      this.loadPage();
  }

   loadPage() {
    console.log('Load AnnoncesPage');

    this.gettingPosition().then(()=>{
      console.log("pooosssiittiiooonn .......");
      let sAnnonces = this.afDatabase.list<any>("/annonces/").valueChanges().subscribe(data => {
        
        console.log(data);
        console.log("data");
        data.forEach(element => {
          console.log(element.likes);
          let pub = element;
          pub.liked = false;
          pub.myComment ="";
          this.isLiked(pub);
          console.log("pub");
          console.log(pub);
          let to = {
            latitude : pub.latitude,
            longitude: pub.longitude
          };
  
          /* let distance = this.getDistanceBetweenPoints(this.pos,to,'km');
          console.log("distance");
          console.log(distance);
          if(distance<300){ */

            if(pub.date){
              let d = new Date(pub.date);
              console.log(d.toDateString());

              pub.time = d.getDay().toString()+","+d.getMonth().toString() +","+d.getHours() +":"+d.getMinutes() ;
            }

            if(pub.nbimage>0){
              pub.imagesUrl = [];/**/
              for( let i = 0 ; i <pub.nbimage ; i++){
                this.storageRef.child("annoncesimages/"+pub.idAnnonce+"/"+i+".jpg").getDownloadURL().then(res => {
                  pub.imagesUrl.push(res);
                }); 
              }
              console.log(pub.imagesUrl);
            }

            this.afDatabase.database.ref("/users/"+pub.creatorAnnonceId).once("value",snap => {
              pub.displayName = snap.val().displayName;
              pub.avaterUrl = snap.val().imageUrl;
              console.log(pub);
              pub.index = this.compteur;
              this.compteur++;
              this.publications.push(pub);
            });

            console.log(pub);

         /* } */
          
        });
        console.log(this.publications);
        sAnnonces.unsubscribe();
      });

    });

    
  }

  openMapModal(pub){
    let mapModal = this.modalCtrl.create(MapPage, {
      "annonceLat": pub.latitude,
      "annonceLng": pub.longitude,
      "annonceTitle": pub.titleAnnonce,
      "annonceDesc": pub.descAnnonce,
      "currentPosLat": 35.7624676,
      "currentPosLng": 10.8400702
    }, { cssClass: 'inset-modal' })
    .present();
  }

  showComments(idAnnonce){

  }

  likePub(pub){
    pub.liked = true;
    this.annonceCrudProvider.likePub(pub.idAnnonce,this.currentUser.id);
    //add like to user activity log
    let newRef = this.afDatabase.list("/users/"+this.currentUser.id+"/activitylog").push({});
    newRef.set({
      key: newRef.key,
      type: 1,
      userId: this.currentUser.id,
      idAnnonce: pub.idAnnonce,
      date: firebase.database.ServerValue.TIMESTAMP
    });
  }

  dislikePub(pub) {
    console.log(pub);
    pub.liked = false;
    this.annonceCrudProvider.dislikePub(pub.idAnnonce,this.currentUser.id);

    this.afDatabase.database.ref("/users/"+this.currentUser.id+"/activitylog")
    .orderByChild("idAnnonce").equalTo(pub.idAnnonce).once("value", snap => {
      snap.forEach(data => {
        if(data.val().type == 1){
          this.afDatabase.list("/users/"+this.currentUser.id+"/activitylog/"+data.val().key).remove();
        }
        return false;
      });
    });
  }

  commentAnnonce(pub){
    console.log("adding comment");
    console.log(pub.myComment);
    this.annonceCrudProvider.commentAnnonce(pub.idAnnonce,pub.myComment,this.currentUser.id)
      .then(()=>{
        pub.myComment = "";
        console.log(pub.myComment);
      });

    let newRef = this.afDatabase.list("/users/"+this.currentUser.id+"/activitylog").push({});
    newRef.set({
      key: newRef.key,
      type: 2,
      userId: this.currentUser.id,
      idAnnonce: pub.idAnnonce,
      date: firebase.database.ServerValue.TIMESTAMP
    });
  }

  shareAnnonce(pub){
    let share = {
      key: "",
      userId: this.currentUser.id,
      idAnnonce: pub.idAnnonce,
      type: "annonce",
      date: firebase.database.ServerValue.TIMESTAMP
    }

    let newRef = this.afDatabase.list("/sharing/").push({});
    share.key = newRef.key;
    console.log(share);
    newRef.set(share);

    let toast = this.toastCtrl.create({
      message: 'Annonce partagé sur votre profil',
      duration: 1500,
      position: "middle"
    });
    toast.present();
  }

  isLiked(pub){

    let sLikes = this.afDatabase.list<any>("/annonces/"+pub.idAnnonce+"/likes/"+this.currentUser.id).valueChanges().subscribe(data =>{
      console.log(data.length);
      if(data.length == 1){
        pub.liked = true;
        console.log(pub.liked);
      }else{
        pub.liked = false;
        console.log(pub.liked);
      }
      sLikes.unsubscribe();
    });
  }

  openCommentsModal(pub){
    let commentsModalPage = this.modalCtrl.create(CommentsModalPage, {
      "order": "annonce",
      "idAnnonce": pub.idAnnonce,
      "titleAnnonce": pub.titleAnnonce
    }).present();
  }

  getDistanceBetweenPoints(start, end, units){

    let earthRadius = {
        miles: 3958.8,
        km: 6371
    };

    let R = earthRadius[units || 'miles'];
    let lat1 = start.latitude;
    let lon1 = start.longitude;
    let lat2 = end.latitude;
    let lon2 = end.longitude;

    let dLat = this.toRad((lat2 - lat1));
    let dLon = this.toRad((lon2 - lon1));
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    return d;

  }

  toRad(x){
    return x * Math.PI / 180;
  }

  async gettingPosition(){
    /* await this.geolocation.getCurrentPosition().then((resp) => {
      console.log("access position given");
      console.log(resp);
      this.pos = resp.coords;
     }).catch((error) => {
       this.navCtrl.pop();
       console.log('Error getting location', error);
              
     }); */
  }

  getImage(idAnnonce,i){
    let storageRef = firebase.storage().ref();
    storageRef.child("annoncesimages/"+idAnnonce+"/"+i+".jpg").getDownloadURL().then(res => {
      console.log(res);
    });
  }

  showMore(pub){
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Partager',
          handler: () => {
            this.shareAnnonce(pub);
          }
        },
        {
          text: 'Reporter',
          handler: () => {
            this.reportAnnonce(pub);
          }
        }
      ]
    });
    actionSheet.present();
  }



  reportAnnonce(annonce){
    this.annonceCrudProvider.reportAnnonce(annonce.idAnnonce,this.currentUser.id);
    let index = this.publications.findIndex(item => item.idAnnonce == annonce.idAnnonce);
    this.publications.splice(index,1);
    console.log(index);
  }

}
