import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { UsercrudProvider } from "../usercrud/usercrud";
import firebase from 'firebase';

@Injectable()
export class PubsProvider {

  constructor(public http: HttpClient,
    private afDatabase: AngularFireDatabase,
    private usercrudProvider: UsercrudProvider) {
    console.log('Hello PubsProvider Provider');
  }

  addConseil(conseil: any){
    const ref = this.afDatabase.database.ref('/conseils/').push({});
    console.log("conseil from provider : ");
    console.log(conseil);
    ref.set({
      conseilId : ref.key,
      conseilCreatorId : conseil.conseilCreatorId,
      conseilContent: conseil.content,
      date: firebase.database.ServerValue.TIMESTAMP
    });
    this.usercrudProvider.updateReputation(conseil.conseilCreatorId,3);

  }

  addPublication(publication: any,captureData: any){
    let newRef = this.afDatabase.list("/publications/").push({});
    publication.key = newRef.key;
    newRef.set(publication).then(()=>{
      console.log(publication);
      for (let index = 0; index < captureData.length; index++) {
        console.log("captureData[index] : ");
        console.log(captureData[index]);
        this.uploadImagePublication(captureData[index],publication.key,index).then(()=>{index++;});    
      }
    });
  }

  async uploadImagePublication(captureDataUrl,idPublication,i){
    let storageRef = await firebase.storage().ref("publicationsimages/"+idPublication+"/");

    const filename = i+".jpg";
    const imageRef = storageRef.child(filename);

    await imageRef.putString(captureDataUrl, firebase.storage.StringFormat.DATA_URL).then(snap=>{
      console.log("image added : "+snap);
      console.log(snap);
    });

  }

}
