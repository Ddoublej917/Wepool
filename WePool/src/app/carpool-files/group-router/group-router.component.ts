import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { GlobalConstants } from 'src/app/common/global-constants';
import { GroupService } from 'src/app/services/group-service/group.service';

@Component({
  selector: 'group-router',
  templateUrl: './group-router.component.html',
  styleUrls: ['./group-router.component.css']
})
export class GroupRouterComponent implements OnInit {

  geocoder: google.maps.Geocoder;
  map : google.maps.Map;
  groupInfo : any;
  link : string;

  constructor(private http : HttpClient, public groupService : GroupService) { }

  loader = new Loader({
    apiKey: GlobalConstants.myKey,
    version: "weekly",
    libraries: ["places"]
  });

  ngOnInit(): void {
    this.loader.load().then(() => {
      this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: 0, lng: 0 },
        zoom: 3,
      });
      this.geocoder = new google.maps.Geocoder();
    });

    this.groupService.getGroup().then(data => {
      console.log(data);
      let users = data.Employees;
      
      let start = users[this.getDriver(data.CreatedAt, users.length)].HomeLocation;
      let dest = data.Location;
      this.getMap(users, start, dest);
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

    this.groupService.getGroup().then(data => {
      console.log(data);
      let users = this.groupInfo.Employees;
      
      let start = users[this.getDriver(data.CreatedAt, users.length)].HomeLocation;
      let dest = data.Location;
      this.getMap(users, start, dest);
    });
  }

  //This function will build the url and call the google API to get the appropriate map.
  async getMap(users : any, ori : string, dest : string) {
    let originLocation = await this.getGeocode(encodeURIComponent(ori));
    let destinationLocation = await this.getGeocode(encodeURIComponent(dest));
    const waypts: google.maps.DirectionsWaypoint[] = await this.getWaypoints(users, ori);
    let directionsService : google.maps.DirectionsService = new google.maps.DirectionsService(),
    directionsDisplay : google.maps.DirectionsRenderer = new google.maps.DirectionsRenderer(),
    request = {
      origin : originLocation,
      destination : destinationLocation,
      waypoints: waypts,
      optimizeWaypoints : true,
      travelMode: google.maps.TravelMode.DRIVING
    }
    directionsDisplay.setMap(this.map);
    directionsDisplay.setPanel(document.getElementById("sidebar") as HTMLElement);
    directionsService.route(request, (result, status) => {
      if (status == 'OK') {
        console.log(result);
        directionsDisplay.setDirections(result);
      }
    })
  }

  //Creates a list of the waypoints from the user list excluding the driver for that day.
  async getWaypoints(users : any, ori : string) {
    let userEncList: string[] = [];
    const waypts: google.maps.DirectionsWaypoint[] = [];
    for (let i = 0; i < users.length; i++) {
      if (users[i].HomeLocation != ori) {
        userEncList.push(encodeURIComponent(users[i].HomeLocation));
      }
    }
    for (let i = 0; i < userEncList.length; i++) {
      let temp = await this.getGeocode(userEncList[i]);
      waypts.push({
        location: temp,
        stopover: true
      });
    }    return waypts;
  }

  //Returns the driver for that day of the week depending on the start date of that group.
  getDriver(start : any, numInGroup : any) {
    let millisecondsPerday = 86400 * 1000;
    let diff = Date.now() - start;
    let days = Math.ceil(diff/millisecondsPerday);
    let weeks = Math.floor(days/7);
    days = days - (weeks * 2);
    return days % numInGroup;
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

}

//Parses JSON file to a readable object
function parseJSON(data: any) {
  return JSON.parse(JSON.stringify(data));
}