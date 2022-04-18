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
    this.groups = await this.groupService.getGroups("one");
    for(let i: number = 0; i < this.groups.length; i++) {
        console.log(this.groups[i]);
        let val = await this.userService.comparePrefs(this.groups[i]);
        console.log(val);
        this.matches.push({"index": i, "matches": val});
    }
    this.matches.sort(function (a, b) {
        if (a.matches < b.matches)
            return 1;
        if (a.matches > b.matches)
            return -1;
        return 0;
    })
    console.log(this.matches);
  }

  //Add user to group
  joinGroup(id : any) {
    this.groupService.joinGroup(id, this.groups);
  }

}
