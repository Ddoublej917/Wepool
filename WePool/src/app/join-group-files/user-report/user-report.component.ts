import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group-service/group.service';

@Component({
  selector: 'user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css']
})
export class UserReportComponent implements OnInit {

  constructor(public userService : GroupService) { }

  ngOnInit(): void {
  }

  sendReport(offEmail: string, report: string) {
    this.userService.sendReport(offEmail, report);
  }

}
