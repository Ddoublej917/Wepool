import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _userUrl = "./assets/data/user-data.json";

  constructor(private http: HttpClient) { }

  //Pass in user, build url to get profile info
  async getUser() {
    //Loads employee profile using signed in email
    return this.http.post("http://localhost:8000/employee/profile",
    {
      "workEmail": localStorage.getItem("email")
    }).toPromise() //Converts to readable JSON
    .then(
      res => { // Success
        return parseJSON(res);
      }
    );
  } 

  //Compares preferences between user and group and returns the amount of matches
  async comparePrefs(group: any): Promise<number>{
    //Load user and store preferences
    let userData = await this.getUser();
    //userData = userData.preferences;
    //Load group preferences
    let groupData = group.Preferences;
    let count = 3;
    //Compares matching info from preferences
    console.log("User data: " + userData.preferencesId)
    if (Math.abs(userData.talkativeness-groupData.talkativeness) <= 1) {
      count++;
    }
    if (Math.abs(userData.music-groupData.music) <= 1) {
      count++;
    }    if (Math.abs(userData.temperature-groupData.temperature) <= 1) {
      count++;
    }
    if (userData.food != groupData.food || userData.smoking != groupData.smoking || userData.mask != groupData.mask) {
      count = 0;
    }
    return count;
  }

  async updateUserProfile(userInfo) {
    //Loads work email of signed in user
    let workEmail = localStorage.getItem("email");
    console.log("Updating " + workEmail + " with new preferences.")
    //Updates employee profile using form
    await this.http.put("http://localhost:8000/employee/preferences", {
      "workEmail": workEmail,
      "preferences": userInfo.preferences,
      "homeLocation": userInfo.homeLocation,
      "profile": userInfo.profile,
      "workLocation": userInfo.workLocation
    });
  }

  //Converts phone number to formatted version
  parsePhoneNumber(phoneNum: string): string {
    let formattedNum = "";
    formattedNum += "(" + phoneNum.substring(0,3) + ")" + phoneNum.substring(3,6) + "-" + phoneNum.substring(6,10);
    return formattedNum;
  }

  //Checks if user is in group or not
  async isInGroup() {
    let user = await this.getUser();
    console.log("Carpool group ID: " + user.carpoolGroupId);
    if (user.carpoolGroupId == 0) {
      return false;
    } else {
      return true;
    }
  }
}

function parseJSON(data: any) {
  return JSON.parse(JSON.stringify(data));
}