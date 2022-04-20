import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group-service/group.service';

@Component({
  selector: 'add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  constructor(public groupService : GroupService) { }

  ngOnInit(): void {
  }

  //Adds group 
  addGroup() {
    console.log("Adding group using user preferences.");
    this.groupService.addGroup();
    alert("Group added and joined!");
    this.toggleHidden();
  }

  //Makes button invisible after adding group
  toggleHidden() {
    let element = document.getElementById("button");
    let hidden = element.getAttribute("disabled");

    if (hidden) {
       element.removeAttribute("disabled");
    } else {
       element.setAttribute("disabled", "disabled");
    }
  }

}
