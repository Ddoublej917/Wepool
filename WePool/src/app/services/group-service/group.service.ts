import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private _groupUrl = "./assets/data/group-data.json";
  private _groupsUrl = "./assets/data/groups-data.json";

  constructor(public http: HttpClient, public userService: UserService) { }

  //User joins group using their id and groups id
  async joinGroup(buttonID : number, groups : any) {
    //Load user data using state
    let user = localStorage.getItem("email");
    //Group ID
    let group = groups[buttonID].groupData.id;
    //Add user to group
    await this.http.post( "http://localhost:8000/add-employee-to-carpool-group", {
      "WorkEmail": user,
      "CarpoolGroupID": group
    });
    console.log("Adding " + user + " to group " + group);
  }

  //Gets group based off user
  async getGroup() {
    //Load user
    //let user = localStorage.getItem("email");
    //Returns group using work email as ID
    /*return this.http.post("http://localhost:8000/employee/carpool-group", {
      "WorkEmail": user
    }).toPromise()
    .then(
      res => { // Success
        console.log(res);
        return parseJSON(res);
      }
    );*/
    return this.http.get(this._groupUrl).toPromise()
    .then(
      res => { // Success
        return parseJSON(res);
      }
    );
  }
  
  //Gets group preferences from user
  async getGroupPreferences(group : string) {
    //Loads in group
    let prefs = await this.getGroup();
    //Returns preferences from group
    return prefs.Preferences;
  } 
  
  //Get groups from company
  async getGroups() {
    /*
    //Load user
    let user = await this.userService.getUser();
    //Load company from user
    let company = user.company.name;
    console.log("Getting groups from " + company);
    //Get list of groups pertaining to company current user is in
    return await this.http.post( "http://localhost:8000/get-carpool-groups-by-company-name", {
      "Name": "Google"
    }).toPromise()
    .then(
      res => { // Success
        console.log(res);
        return parseJSON(res);
      }
    );*/
    return this.http.get(this._groupsUrl).toPromise()
    .then(
      res => { // Success
        return parseJSON(res);
      }
    );
  }  

  //Sends user report to company
  async sendReport(offEmail: string, report : string) {
    //Load user
    let user = localStorage.getItem("email");
    console.log("Petitioner email: " + user + "/nOffender email: " + offEmail + "/nReport: " + report);
    await this.http.post("http://localhost:8000/employee/report", {
      "PetitionerEmail": user,
      "OffenderEmail": offEmail,
      "IssueDescription": report
    });
  }

  //Adds group using user ID
  addGroup() {
    let user = localStorage.getItem("email");
    this.http.post("http://localhost:8000/employee/carpoolgroup", {
      "workEmail": user,
      "carCapacity": 4
    })
  }
}

function parseJSON(data: any) {
  return JSON.parse(JSON.stringify(data));
}