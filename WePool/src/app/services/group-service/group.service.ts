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
    let user = localStorage.getItem("email");
    return this.http.post("http://localhost:8000/employee/carpool-group", {
      "WorkEmail": user
    }).toPromise()
    .then(
      res => { // Success
        console.log(res);
        return parseJSON(res);
      }
    );
  }
  
  //Gets group preferences from user
  async getGroupPreferences(group : string) {
    let prefs = await this.getGroup();
    return prefs.Preferences;
  } 
  
  //Get groups from company
  async getGroups() {
    let user = await this.userService.getUser();
    let company = user.Company.Name;
    return await this.http.post( "http://localhost:8000/employee/carpool-group/get-carpool-groups-by-company-name", {
      "Name": company
    }).toPromise()
    .then(
      res => { // Success
        console.log(res);
        return parseJSON(res);
      }
    );
  }  

  //Sends user report to company
  sendReport(offEmail: string, report : string) {
    console.log(report + " " + offEmail);
    let user = localStorage.getItem("email");
    this.http.post("http://localhost:8000/employee/report", {
      "PetitionerEmail": user,
      "OffenderEmail": offEmail,
      "IssueDescription": report
    });
  }
}

function parseJSON(data: any) {
  return JSON.parse(JSON.stringify(data));
}