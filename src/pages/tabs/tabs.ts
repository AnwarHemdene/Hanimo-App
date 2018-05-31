import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from './../home/home';
import { MessagesPage } from './../messages/messages';
import { PosterPage } from './../poster/poster';
import { InvitationPage } from './../invitation/invitation';

import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MessagesPage;
  tab3Root = PosterPage;
  tab4Root = InvitationPage;

  pages: Array<{title: string, component: any}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private afDatabase: AngularFireDatabase) {

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Messages', component: MessagesPage },
      { title: 'Poster', component: PosterPage },
      { title: 'Invitations', component: InvitationPage }
    ];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

  openPage(p){
    this.navCtrl.setRoot(p);
  }

}
