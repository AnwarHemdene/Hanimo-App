import { Component , ElementRef, ViewChild } from '@angular/core';
import { NavController, ViewController ,  Platform , NavParams } from 'ionic-angular';

declare const google;;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  annonceLat: number;
  annonceLng: number;
  annonceTitle: any;
  annonceDesc: any;
  currentPosLat: any;
  currentPosLng: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public platform: Platform) {

      this.annonceLat = navParams.get("annonceLat");
      console.log(this.annonceLat);

      this.annonceLng = navParams.get("annonceLng");
      console.log(this.annonceLng);

      this.annonceTitle = navParams.get("annonceTitle");
      console.log(this.annonceTitle);

      this.annonceDesc = navParams.get("annonceDesc");
      console.log(this.annonceDesc);

      this.currentPosLat = navParams.get("currentPosLat");
      console.log(this.currentPosLat);

      this.currentPosLng = navParams.get("currentPosLng");
      console.log(this.currentPosLng);

      platform.ready().then(() => {
        this.loadMap();
      });
  }

  loadMap() {
    // start my map
    let annoncePos = new google.maps.LatLng(this.annonceLat,this.annonceLng);
    let currentPos = new google.maps.LatLng(this.currentPosLat,this.currentPosLng);

    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 17,
      center: annoncePos,
      mapTypeId: 'roadmap'
    });

    //associating direction display to the map
    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setOptions({
       suppressMarkers: true ,
       optimizeWaypoints: false
      });

  
    let annonceMarker = this.addMarker(this.annonceLat,this.annonceLng,this.annonceTitle);
    console.log(annonceMarker);
    let currentPosMarker = this.addMarker(this.currentPosLat,this.currentPosLng,"vous etes ici");
    console.log(currentPosMarker);

    this.calculateAndDisplayRoute(currentPos,annoncePos);



  }

  addMarker(lat,lng,title){
    console.log("adding Marker : "+title,lat,lng);

    let pos = new google.maps.LatLng(lat,lng);

    let infowindow = new google.maps.InfoWindow({
      content: title
    });

    let marker = new google.maps.Marker({
      position: pos,
      map: this.map,
      animation: google.maps.Animation.DROP,
    });

    infowindow.open(this.map, marker);
    
    return marker;
  }

  calculateAndDisplayRoute(start,end) {

    console.log(start,end);
    this.directionsService.route({
      origin: start,
      destination: end,
      travelMode: 'WALKING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

/*   https://github.com/BrunoAlencar/ionic3-google-maps-examples/blob/master/src/pages/example-1/example-1.ts */

}
