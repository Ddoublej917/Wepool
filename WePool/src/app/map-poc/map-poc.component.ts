import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { GlobalConstants } from '../common/global-constants';

@Component({
  selector: 'app-map-poc',
  templateUrl: './map-poc.component.html',
  styleUrls: ['./map-poc.component.css']
})
export class MapPOCComponent implements OnInit {

  public origin: string = "";
  public destination: string = "";
  public link: string = "";
  geocoder: google.maps.Geocoder;
  map : google.maps.Map;

  constructor(private http : HttpClient) { }

  loader = new Loader({
    apiKey: GlobalConstants.myKey,
    version: "weekly",
    libraries: ["places"]
  });

  //Initializes map on page opening
  ngOnInit(): void {
    this.loader.load().then(() => {
      this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: 0, lng: 0 },
        zoom: 3,
      });
      this.geocoder = new google.maps.Geocoder();
    });
  }

  ngOnChange() {
    this.loader.load().then(() => {
      this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: 0, lng: 0 },
        zoom: 3,
      });
      this.geocoder = new google.maps.Geocoder();
    });
  }

  //Accesses location-autocomplete component in HTML of id search
  @ViewChild('search' /* #name or Type*/, {static: false}) search;

  //Sets map and link using given origin and destination
  async initRoute() {
    //Creates encoded URI components from location-autocomplete component input objects. Needs to be encoded in order to use them in link API.
    let oriEnc = encodeURIComponent(this.search.getVal().ori);
    let destEnc = encodeURIComponent(this.search.getVal().dest);

    //Uses promises await HTTP request resolving in getGeocode function
    let oriLoc = await this.getGeocode(oriEnc);
    let destLoc = await this.getGeocode(destEnc);

    //Edits map to show route between origin and destination locations
    this.changeMap(oriLoc, destLoc);

    //Sets link to Google directions page using given origin and destination
    this.link = "https://www.google.com/maps/dir/?api=1&origin=" + oriEnc + "&destination=" + destEnc + "&travelmode=driving";
  }

  //Calls Google Geocode API in order to translate a location to a latitude and longitude necessary for Google DirectionsService API
  //Creates a promise that resolves after HTTP request finishes retreiving information
  getGeocode(location : string) {
    let url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=" + GlobalConstants.myKey;
    return this.http.get(url).toPromise()
    .then(
      res => { // Success
        return parseJSON(res).results[0].geometry.location;
      }
    );
  }

  //Edits map on screen to show route between origin and destination
  changeMap(originLocation : any, destinationLocation : any) {
    let directionsService : google.maps.DirectionsService = new google.maps.DirectionsService(),
        directionsDisplay : google.maps.DirectionsRenderer = new google.maps.DirectionsRenderer(),
        request = {
          origin : new google.maps.LatLng(originLocation.lat, originLocation.lng),
          destination : new google.maps.LatLng(destinationLocation.lat, destinationLocation.lng),
          travelMode: google.maps.TravelMode.DRIVING
    }
    directionsDisplay.setMap(this.map);
    directionsService.route(request, (result, status) => {
      if (status == 'OK') {
        directionsDisplay.setDirections(result);
      }
    })
  }
  
}

//Parses JSON file to a readable object
function parseJSON(data: any) {
  return JSON.parse(JSON.stringify(data));
}