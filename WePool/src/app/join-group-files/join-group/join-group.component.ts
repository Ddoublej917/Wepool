import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-join-group',
  templateUrl: './join-group.component.html',
  styleUrls: ['./join-group.component.css']
})
export class JoinGroupComponent implements OnInit {

  userType : any;

  constructor(public userService: UserService) { }

  async ngOnInit(): Promise<void> {
    /*Initialize user type on initialization of page. Load in potential groups on user, "Please sign in!" on not signed in, 
    and "Group Selected!" on group already selected.*/
    //Load user
    if (localStorage.getItem("email") == "renzo@gmail.com") {
      this.userType = "signedIn";
    } else {
      this.userType = "groupSelected";
    }
  }
}
