import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-comments-modal',
  templateUrl: 'comments-modal.html',
})
export class CommentsModalPage {

  idAnnonce: string;
  titleAnnonce: string;
  comments: any = [];
  sComments : any;
  order: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private afDatabase :AngularFireDatabase,
    public viewController: ViewController) {

      this.order = this.navParams.get("order");
      console.log("order : ",this.order);
      this.idAnnonce = this.navParams.get("idAnnonce");
      console.log("id annonce : ",this.idAnnonce);
      this.titleAnnonce = this.navParams.get("titleAnnonce");
      console.log("titleAnnonce : ",this.titleAnnonce);
      this.loadComments();
  }

  loadComments() {
    console.log('ionViewDidLoad CommentsModalPage');
    if(this.order == "annonce"){
      this.sComments = this.afDatabase.list<any>("/annonces/"+this.idAnnonce+"/comments")
      .valueChanges().subscribe(data => {
        this.comments = [];
        console.log("all data :");
        console.log(data);
        data.forEach(element => {  
          let comment = element;
          console.log("comment");
          console.log(comment);

          this.afDatabase.database.ref("/users/"+comment.userId).once("value",snap => {
            comment.displayName = snap.val().displayName;
            comment.avaterUrl = snap.val().imageUrl;
            console.log(comment);
            this.comments.push(comment);
          });

        });
      });
    }else if (this.order == "publication"){
      this.sComments = this.afDatabase.list<any>("/publications/"+this.idAnnonce+"/comments")
      .valueChanges().subscribe(data => {
        this.comments = [];
        console.log("all data :");
        console.log(data);
        data.forEach(element => {  
          let comment = element;
          console.log("comment");
          console.log(comment);

          this.afDatabase.database.ref("/users/"+comment.userId).once("value",snap => {
            comment.displayName = snap.val().displayName;
            comment.avaterUrl = snap.val().imageUrl;
            console.log(comment);
            this.comments.push(comment);
          });

        });
      });
    }
    
  }

  dismissModal(){
    this.sComments.unsubscribe();
    this.viewController.dismiss();
  }

}
