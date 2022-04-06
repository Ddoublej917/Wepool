import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupServiceService {

  constructor(private http : HttpClient) { }

  private _groupUrl = "./assets/data/group-data.json";
  private _userUrl = "./assets/data/user-data.json";

  //Gets group based off user
  async getGroup() {
    return this.http.get(this._groupUrl).toPromise()
    .then(
      res => { // Success
        return parseJSON(res).groupData;
      }
    );
  }

  //Pass in user, build url to get profile info
  async getUser(user : string) {
    let url = user;
    return this.http.get(this._userUrl).toPromise()
    .then(
      res => { // Success
        return parseJSON(res);
      }
    );
  } 
  
  //Pass in group, build url to get group preferences
  async getGroupPreferences(group : string) {
    let url = group;
    return this.http.get(this._groupUrl).toPromise()
    .then(
      res => { // Success
        return parseJSON(res).groupData.preferences;
      }
    );
  }  

  //Add group when current group does not fit preferences
  addGroup() {
    //Load user
    let user = "renzo"
    //Load company
    let company = "one"
    //Add group using user and company
    //this.http.put();
  }
}

function parseJSON(data: any) {
  return JSON.parse(JSON.stringify(data));
}
