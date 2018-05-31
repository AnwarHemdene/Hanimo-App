import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController , ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { SettingsProfilePage } from "../settings-profile/settings-profile";
import { CommentsModalPage } from "../comments-modal/comments-modal";
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';
import { UsercrudProvider } from "../../providers/usercrud/usercrud";
import { AnnonceCrudProvider } from "../../providers/annonce-crud/annonce-crud";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  currentUser = {} as any;
  imageUrl : any;
  publications: any = [];
  storageRef = firebase.storage().ref();

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    private modalController: ModalController,
    private afDatabase: AngularFireDatabase, 
    private afAuth: AngularFireAuth,
    public usercrudProvider: UsercrudProvider,
    public annonceCrudProvider: AnnonceCrudProvider,
    private camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  ionViewWillEnter(){
    this.afAuth.auth.onAuthStateChanged(user => {
      if(user){
        this.afDatabase.database.ref("/users/"+user.uid).on("value",data => {
          this.currentUser = data.val();
          console.log(this.currentUser);
          this.loadActivities();
        });
      }else{
        console.log("Erreur de chargement");
      }
    });
  }

  changePicture(){

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            console.log('Camera clicked');
            this.capture(1);
          }
        },
        {
          text: 'Galerie',
          handler: () => {
            console.log('Galerie clicked');
            this.capture(0);
          }
        }
      ]
    });
    actionSheet.present();

  }

  settings(){
    let user = JSON.stringify(this.currentUser);
    let profileModal = this.modalController.create(SettingsProfilePage,{"currentUser": user});
    profileModal.present();
  }

  capture(sourceType){
    console.log("cameraaaaaaaa capture");
    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType
    };

    this.camera.getPicture(cameraOptions).then((imageData) => {

      console.log(imageData);
      let dataUrl = 'data:image/jpeg;base64,' + imageData;
      this.imageUrl = dataUrl ;
      console.log(this.imageUrl);

      this.currentUser.imageUrl = this.imageUrl ;
      this.usercrudProvider.uploadProfilePicture(dataUrl,this.currentUser.id);

    },(err) => {
      console.log(err);
    });
  }

  loadActivities(){
    //getting publication
    this.afDatabase.database.ref("/publications/").orderByChild("creatorId")
    .equalTo(this.currentUser.id).once("value",snapshots =>{
        snapshots.forEach(element =>{
          let pub : any = {} ;
          pub = element.val();
          pub.order = "publication";
          pub.liked = false ;
          pub.myComment ="";
          this.isLiked(pub);
          console.log(pub);
          let d = new Date(pub.date);
          pub.time = d.getDay().toString()+","+d.getMonth().toString() +","+d.getHours() +":"+d.getMinutes() ;
          if(pub.nbimage>0){
            pub.imagesUrl = [];/**/
            for( let i = 0 ; i <pub.nbimage ; i++){
              this.storageRef.child("publicationsimages/"+pub.key+"/"+i+".jpg").getDownloadURL().then(res => {
                pub.imagesUrl.push(res);
              }); 
            }
            console.log(pub.imagesUrl);
          }
          // pub.displayName = this.currentUser.displayName;
          // pub.avaterUrl = snap.val().imageUrl;
          // console.log(pub);
          this.publications.push(pub);
          console.log(pub);
          console.log(this.publications);

          return false;
        });
      });

    //getting annonces
    this.afDatabase.database.ref("/annonces/").orderByChild("creatorAnnonceId")
    .equalTo(this.currentUser.id).once("value",snapshots =>{
      snapshots.forEach(element =>{
        let pub : any = {} ;
        pub = element.val();
        pub.order = "annonce";
        pub.liked = false ;
        pub.myComment ="";
        this.isLiked(pub);
        console.log(pub);
        let d = new Date(pub.date);
        pub.time = d.getDay().toString()+","+d.getMonth().toString() +","+d.getHours() +":"+d.getMinutes() ;
        if(pub.nbimage>0){
          pub.imagesUrl = [];/**/
          for( let i = 0 ; i <pub.nbimage ; i++){
            this.storageRef.child("annoncesimages/"+pub.idAnnonce+"/"+i+".jpg").getDownloadURL().then(res => {
              pub.imagesUrl.push(res);
            }); 
          }
          console.log(pub.imagesUrl);
        }
        // pub.displayName = this.currentUser.displayName;
        // pub.avaterUrl = snap.val().imageUrl;
        // console.log(pub);
        this.publications.push(pub);
        console.log(pub);
        console.log(this.publications);
        

        return false;
      });
    });
    //getting sharings
    this.afDatabase.database.ref("/sharing/").orderByChild("userId")
    .equalTo(this.currentUser.id).once("value",snapshots =>{
      snapshots.forEach(element=>{
        let pub : any = {} ;
        console.log(element.val());
        if(element.val().type == "annonce"){

          this.afDatabase.database.ref("/annonces/"+element.val().idAnnonce).once("value",annonceSnap=>{
            console.log(annonceSnap.val());
            pub = annonceSnap.val();
            if(pub.nbimage>0){
              pub.imagesUrl = [];/**/
              for( let i = 0 ; i <pub.nbimage ; i++){
                this.storageRef.child("annoncesimages/"+pub.idAnnonce+"/"+i+".jpg").getDownloadURL().then(res => {
                  pub.imagesUrl.push(res);
                }); 
              }
              console.log(pub.imagesUrl);
            }

            //getting user
            this.afDatabase.database.ref("/users/"+annonceSnap.val().creatorAnnonceId).once("value",userSnap=>{
              pub.userDipslayName = userSnap.val().displayName;
              console.log(pub);
            });

            pub.order = "sharingannonce";
            pub.type = "annonce";
            this.publications.push(pub);
            console.log(pub);
            console.log(this.publications);

          });
        }
        

        return false;
      });
    });
  }


  likePub(pub){

    pub.liked = true;
    if(pub.order == "annonce"){
      this.afDatabase.list('/annonces/'+pub.idAnnonce+'/likes/').set(this.currentUser.id,{
        userId: this.currentUser.id
      });
    }else if (pub.order == "publication"){
      this.afDatabase.list('/publications/'+pub.key+'/likes/').set(this.currentUser.id,{
        userId: this.currentUser.id
      });
    }

  }

  dislikePub(pub) {
    console.log(pub);
    pub.liked = false;
    if(pub.order == "annonce"){
      this.afDatabase.list('/annonces/'+pub.idAnnonce+'/likes/'+this.currentUser.id).remove();
    }else if (pub.order == "publication"){
      this.afDatabase.list('/publications/'+pub.key+'/likes/'+this.currentUser.id).remove();
    }

  }

  isLiked(pub){

    if(pub.order == "annonce"){
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
    }else if(pub.order == "publication"){
      let sLikes = this.afDatabase.list<any>("/publications/"+pub.key+"/likes/"+this.currentUser.id).valueChanges().subscribe(data =>{
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
  }

  commenter(pub){
    console.log("adding comment");
    console.log(pub.myComment);

    if(pub.order == "annonce"){
      let newRef = this.afDatabase.list('/annonces/'+pub.idAnnonce+'/comments/').push({});
      newRef.set({
        commentKey: newRef.key,
        userId: this.currentUser.id,
        commentContent: pub.myComment,
        date: firebase.database.ServerValue.TIMESTAMP
      }).then(()=>{pub.myComment = "";});
    }else if(pub.order == "publication"){
      let newRef = this.afDatabase.list('/publications/'+pub.key+'/comments/').push({});
      newRef.set({
        commentKey: newRef.key,
        userId: this.currentUser.id,
        commentContent: pub.myComment,
        date: firebase.database.ServerValue.TIMESTAMP
      }).then(()=>{pub.myComment = "";});
    }

  }

  openCommentsModal(pub){
    if(pub.order == "annonce"){
      let commentsModalPage = this.modalController.create(CommentsModalPage, {
        "order": "annonce",
        "idAnnonce": pub.idAnnonce,
        "titleAnnonce": pub.titleAnnonce
      }).present();
    }else if(pub.order == "publication"){
      let commentsModalPage = this.modalController.create(CommentsModalPage, {
        "order": "publication",
        "idAnnonce": pub.key
      }).present();
    }
    
  }

  showMore(pub){
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Supprimer',
          handler: () => {
            if(pub.order == "annonce"){
              this.deleteAnnonce(pub);
            }else{
              console.log("rien a faire !!");
            }
          }
        }
      ]
    });
    actionSheet.present();
  }

  deleteAnnonce(annonce){
    this.annonceCrudProvider.deleteAnnonce(annonce).then(()=>{
      let index = this.publications.findIndex(item => item.idAnnonce == annonce.idAnnonce);
      this.publications.splice(index,1);
      //delete images one by one
      for (let index = 0; index < annonce.nbimage; index++) {
        this.storageRef.child("annoncesimages/"+annonce.idAnnonce+"/"+index+".jpg").delete();
      }      
    });
  }

}
