import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController } from 'ionic-angular';

import { PubsProvider } from "../../providers/pubs/pubs";

@Component({
  selector: 'page-conseil-modal',
  templateUrl: 'conseil-modal.html',
})
export class ConseilModalPage {

  currentUserId : string;
  conseil: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl : ViewController,
    private pubsProvider: PubsProvider) {
      this.currentUserId = this.navParams.get("currentUserId");
      this.conseil.conseilCreatorId = this.currentUserId;
      console.log("this.conseil.conseilCreatorId");
      console.log(this.conseil.conseilCreatorId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConseilModalPage');
  }

  addConseil(conseilContent){
    this.conseil.content = conseilContent;
    console.log("this.conseil");
    console.log(this.conseil);
    this.pubsProvider.addConseil(this.conseil);
    this.viewCtrl.dismiss();
  }


}
