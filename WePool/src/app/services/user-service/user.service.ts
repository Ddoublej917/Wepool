import { Injectable } from '@angular/core';
import { GroupService } from '../group-service/group.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _userUrl = "./assets/data/user-data.json";

  constructor(private http: HttpClient, public groupService: GroupService) { }

  //Pass in user, build url to get profile info
  async getUser() {
    return this.http.post("http://localhost:8000/employee/profile",
    {
      "workEmail": localStorage.getItem("email")
    }).toPromise()
    .then(
      res => { // Success
        console.log(res);
        return parseJSON(res);
      }
    );
  } 

  //Compares preferences between user and group and returns the amount of matches
  async comparePrefs(group: any): Promise<number>{
    let userData = await this.getUser();
    userData = userData.Preferences;
    let groupData = group.Preferences;
    let count = 3;
    if (Math.abs(userData[5]-groupData[5]) <= 1) {
      count++;
    }
    if (Math.abs(userData[6]-groupData[6]) <= 1) {
      count++;
    }    if (Math.abs(userData[7]-groupData[7]) <= 1) {
      count++;
    }
    if (userData[9] != groupData[9] || userData[10] != groupData[10] || userData[11] != groupData[11]) {
      count = 0;
    }
    return count;
  }

  updateUserProfile(userInfo) {
    let workEmail = "renzo@ufl.edu"
    this.http.put("http://localhost:8000/employee/preferences", {
      "workEmail": workEmail,
      "preferences": userInfo.preferences,
      "homeLocation": userInfo.homeLocation,
      "profile": userInfo.profile,
      "workLocation": userInfo.workLocation
    })
  }

  //Converts phone number to formatted version
  parsePhoneNumber(phoneNum: string): string {
    let formattedNum = "";
    formattedNum += "(" + phoneNum.substring(0,3) + ")" + phoneNum.substring(3,6) + "-" + phoneNum.substring(6,10);
    return formattedNum;
  }
}

function parseJSON(data: any) {
  return JSON.parse(JSON.stringify(data));
}