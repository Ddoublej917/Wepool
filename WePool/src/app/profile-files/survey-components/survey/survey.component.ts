import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
//Component created to handle styling of survey page without touching other areas
export class SurveyComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

  //Questions that will be used for now
  questions = [{question: "Personal Info", type: "label"},
               {question: "My full name is...", type: "textbox"},
               {question: "My gender is...", type: "textbox"},
               {question: "My address is...", type: "address"},
               {question: "My work location is...", type: "company"},
               {question: "Preferences", type: "label"},
               {question: "When I ride I am talkative and lovet to catch up with my coworkers about their out of work happenings!", type: "slider"},
               {question: "I like to keep it chilly in the car, the cold helps me wake up!", type: "slider"},
               {question: "Music makes the car ride much more enjoyable and livens up my day!", type: "slider"},
               {question: "Must Haves", type: "label"},
               {question: "Food in the car?", type: "checkbox"},
               {question: "Smoking in the car?", type: "checkbox"},
               {question: "I want to ride with only the same gender.", type: "checkbox"}];
  items = [];
  profile = {

  }

  async addItem(newItem: string[]) {
    await this.userService.updateUserProfile(this.getProfile(newItem));
  }

  getProfile(newPrefs) {
    let preferences = {
      "Talkativeness": 0,
      "Music": 0,
      "Temperature": 0,
      "Mask": false,
      "Food": false,
      "Smoking": false,
      "Gender": "male"
    }
    preferences.Talkativeness = parseInt(newPrefs[6]);
    preferences.Temperature = parseInt(newPrefs[7]);
    preferences.Talkativeness = parseInt(newPrefs[8]);
    preferences.Mask = newPrefs[10];
    preferences.Food = newPrefs[11];
    preferences.Smoking = newPrefs[12];
    preferences.Gender = newPrefs[2];
    let name = newPrefs[1];
    let split = name.split(" ");
    let profile = {
      "firstName": split[0],
      "lastName": split[1]
    }
    return {
      "preferences": preferences,
      "profile": profile,
      "homeLocation": newPrefs[3],
      "workLocation": newPrefs[4]
    }
  }

}
