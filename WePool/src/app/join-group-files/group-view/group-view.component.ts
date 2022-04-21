import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group-service/group.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.css']
})
export class GroupViewComponent implements OnInit {

  constructor(public groupService: GroupService, public userService: UserService) { }

  groups = [];
  matches: {index: number, matches: number}[] = [];

  async ngOnInit(): Promise<void> {
    //Load in groups based on company
    this.groups = await this.groupService.getGroups();
    for(let i: number = 0; i < this.groups.length; i++) {
        //Compare preferences from user with each group
        let val = await this.userService.comparePrefs(this.groups[i]);
        this.matches.push({"index": i, "matches": val});
    }
    //Sort group matches by most preferences matched
    this.matches.sort(function (a, b) {
        if (a.matches < b.matches)
            return 1;
        if (a.matches > b.matches)
            return -1;
        return 0;
    });
    console.log("Matches: " + this.matches);
  }

  //Add user to group
  joinGroup(id : any) {
    alert("Group joined!");
    this.groupService.joinGroup(id, this.groups);
  }

}
