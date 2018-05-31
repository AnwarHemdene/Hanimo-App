import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController , ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { CommentsModalPage } from "../comments-modal/comments-modal";
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';
import { UsercrudProvider } from "../../providers/usercrud/usercrud";

@Component({
  selector: 'page-otherprofile',
  templateUrl: 'otherprofile.html',
})
export class OtherprofilePage {

  currentUser = {} as any;
  user = {} as any;
  relationStatus ;
  publications: any = [];
  storageRef = firebase.storage().ref();

  //in case of friends needed for deleting friend
  friendRelation = {} as any ;
  // in case of received invitation get the invitation key to receive or decline it 
  invitation = {} as any ;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewController: ViewController,
    private modalController: ModalController,
    private afDatabase: AngularFireDatabase, 
    private afAuth: AngularFireAuth,
    public usercrudProvider: UsercrudProvider,) {

    this.currentUser.id = this.navParams.get("currentUserId");
    console.log("currentUser : ",this.currentUser);

    this.user.id = this.navParams.get("userId");
    console.log("user : ",this.user);

    this.relationStatus = this.navParams.get("relationStatus");
    console.log("user : ",this.relationStatus);

    this.afDatabase.database.ref("/users/"+this.user.id).once("value",userSnapshot=>{
      this.user = userSnapshot.val();
      console.log(this.user);
    });
    

  }

  ionViewWillEnter(){
    if(this.relationStatus == 1 ){
      this.getFriendRelationKey();
      this.loadActivities();
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherprofilePage');
  }

  goBack(){
    this.viewController.dismiss();
  }

  getFriendRelationKey(){
    let sVerifFriends = this.afDatabase.list<any>("/friends/").valueChanges().subscribe(data =>{
      data.forEach(element => {
        if((element.id1 == this.currentUser.id && element.id2 == this.user.id) || (element.id2 == this.currentUser.id && element.id1 == this.user.id)){
          console.log("friends");
          //this.relationStatus = 1;
          this.friendRelation = element;
          console.log("friendRelation : ",this.friendRelation);
        }
      })
      sVerifFriends.unsubscribe();
    });
  }

  loadActivities(){
    //getting publication
    this.afDatabase.database.ref("/publications/").orderByChild("creatorId")
    .equalTo(this.user.id).once("value",snapshots =>{
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
    .equalTo(this.user.id).once("value",snapshots =>{
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

  // NON TESTEE

  sendInvitation(){
    console.log("idReceiver : ",this.user.id);
    let invitation: any = {}  ;
    invitation.idReceiver = this.user.id;
    invitation.idSender = this.currentUser.id;
    console.log(invitation);
    this.relationStatus = 2;

    let newRef = this.afDatabase.list('/invitations/').push({});
    newRef.set({
      key: newRef.key,
      idSender : invitation.idSender,
      idReceiver: invitation.idReceiver,
      date: firebase.database.ServerValue.TIMESTAMP
    });
  }

  // NON TESTEE

  supprimerAmis(){
    console.log(this.friendRelation.key);
    this.afDatabase.list('/friends/').remove(this.friendRelation.key).then(res=>{
      this.relationStatus = 0 ;
      console.log("deleting : ",res,this.friendRelation.key);
    }); 
  }

  // NON TESTEE
  annulerInvitation(){
    this.afDatabase.database.ref("/invitations/").orderByChild("idSender").equalTo(this.currentUser.id).once("value",snap=>{
      console.log(snap);
      snap.forEach(element => {
        if(element.val().idReceiver == this.user.id){
          console.log(element);
          let key = element.val().key;
          this.afDatabase.list('/invitations/').remove(key);
          this.relationStatus = 0;
          return false;
        }
      });
    });
  }

  initilizeInvitation(){
    this.afDatabase.database.ref("/invitations/").orderByChild("idReceiver").equalTo(this.currentUser.id).once("value",snapShotInvit=>{
      snapShotInvit.forEach(invit =>{

        if(invit.val().idSender == this.user.id){
          this.invitation = invit.val();
          console.log(this.invitation);
        }

        return false;
      })
    })
  }
 
  accepterInvitation(){

    let friendRef = this.afDatabase.list('/friends/').push({});
    friendRef.set({
      key: friendRef.key,
      id1: this.user.id,
      id2: this.currentUser.id,
      date: firebase.database.ServerValue.TIMESTAMP
    });

    this.afDatabase.list('/invitations/').remove(this.invitation.key);
    this.relationStatus = 1 ;

  }
  
  // NON TESTEE
  declinerInvitation(){
    this.afDatabase.list('/invitations/').remove(this.invitation.key);
    this.relationStatus = 0 ;
  }

}
