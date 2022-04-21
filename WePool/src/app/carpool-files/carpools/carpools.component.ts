import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-carpools',
  templateUrl: './carpools.component.html',
  styleUrls: ['./carpools.component.css']
})
export class CarpoolsComponent implements OnInit {

  group: any;

  constructor(public userService: UserService) { }

  userType = "";

  async ngOnInit(): Promise<void> {
    if (await this.userService.isInGroup()) {
      this.userType = "groupSelected";
    } else {
      this.userType = "signedIn";
    }
    console.log("User type: " + this.userType);
  }

}
