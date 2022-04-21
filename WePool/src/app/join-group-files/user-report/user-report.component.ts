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

  //Sends report to company
  async sendReport(offEmail: string, report: string) {
    alert("Report sent!");
    await this.userService.sendReport(offEmail, report);
  }

}
