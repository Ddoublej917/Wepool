import { Component, OnInit } from '@angular/core';
import { GroupServiceService } from 'src/app/services/group-service/group-service.service';

@Component({
  selector: 'add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  constructor(public groupService : GroupServiceService) { }

  ngOnInit(): void {
  }

  addGroup() {
    this.groupService.addGroup();
    alert("Group added and joined!");
  }

  toggleHidden() {
    let element = document.getElementById("button");
    let hidden = element.getAttribute("hidden");

    if (hidden) {
       element.removeAttribute("hidden");
    } else {
       element.setAttribute("hidden", "hidden");
    }
  }

}
