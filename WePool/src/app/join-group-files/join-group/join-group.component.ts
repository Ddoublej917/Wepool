import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-join-group',
  templateUrl: './join-group.component.html',
  styleUrls: ['./join-group.component.css']
})
export class JoinGroupComponent implements OnInit {

  userType : any;

  constructor() { }

  ngOnInit(): void {
    //Initialize user type on initialization of page. Load in potential groups on user, "Please sign in!" on not signed in, 
    //and "Group Selected!" on group already selected.
    this.userType = "groupSelected";
  }
}
