import { Component, Input, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group-service/group.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'group-info',
  templateUrl: './group-info.component.html',
  styleUrls: ['./group-info.component.css']
})
//The purpose of this component is to display users and their information. Information may be up to change.
export class GroupInfoComponent implements OnInit {

  group: any;

  constructor(public groupService : GroupService, public userService: UserService) { }

   phoneNums: string[] = [];

  async ngOnInit(): Promise<void> {
    await this.groupService.getGroup().then(data => {
      this.group = data.Employees; 
    });
    for (let i = 0; i < this.group.length; i++) {
      this.phoneNums.push(this.userService.parsePhoneNumber(this.group[i].Profile.PhoneNumber));
    }
  }
  
  panelOpenState = false;
  @Input() panelState;

}
