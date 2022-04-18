import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

export interface Carpool {
  position: number;
  company: string;
  driver: string;
  pas1: string;
  pas2: string;
  pas3: string;
}

export interface Issue {
  position: number;
  company: string;
  reporter: string;
  message: string;
}

const CARPOOL_DATA: Carpool[] = [
  {position: 1, company: 'University of Florida', driver: 'Daniel Johnson', pas1: 'Renzo Pretto', pas2: 'Ganesh Sundar', pas3: 'Chris Phang'},
  {position: 2, company: 'University of Florida', driver: 'Lorena Anderson', pas1: 'Amanda Hicks', pas2: 'Lindsay Higgins', pas3: 'Vivian Sanchez'},
  {position: 3, company: 'University of Florida', driver: 'Wendell Rodgers', pas1: 'Conrad Garza', pas2: 'Cody Santos', pas3: 'Bradford Delgado'},
  {position: 4, company: 'University of Florida', driver: 'Theodore Hart', pas1: 'Sergio Young', pas2: 'Jeannie Mendez', pas3: 'Mae Vargas'},
];

const GROUP_DATA: Carpool[] = [
  {position: 1, company: 'University of Florida', driver: 'Daniel Johnson', pas1: 'Renzo Pretto', pas2: 'Ganesh Sundar', pas3: 'Chris Phang'},
  {position: 2, company: 'University of Florida', driver: 'Lorena Anderson', pas1: 'Amanda Hicks', pas2: 'Lindsay Higgins', pas3: 'Vivian Sanchez'},
  {position: 3, company: 'University of Florida', driver: 'Wendell Rodgers', pas1: 'Conrad Garza', pas2: 'Cody Santos', pas3: 'Bradford Delgado'},
  {position: 4, company: 'University of Florida', driver: 'Theodore Hart', pas1: 'Sergio Young', pas2: 'Jeannie Mendez', pas3: 'Mae Vargas'},
];

const ISSUE_DATA: Issue[] = [
  {position: 1, company: 'University of Florida', reporter: 'Daniel Johnson', message: 'Reckless driving'},
  {position: 2, company: 'University of Florida', reporter: 'Daniel Johnson', message: 'Got ghosted'},
  {position: 3, company: 'University of Florida', reporter: 'Daniel Johnson', message: 'Dropped off at wrong place'},
  {position: 4, company: 'University of Florida', reporter: 'Daniel Johnson', message: 'I want to switch groups'},
];


@Component({
  selector: 'app-mod',
  templateUrl: './moderation.component.html',
  styleUrls: ['./moderation.component.css']
})
export class ModerationComponent {
  displayedColumns: string[] = ['position', 'company', 'driver', 'pas1', 'pas2', 'pas3', 'action1', 'action2'];
  groupColumns: string[] = ['position', 'company', 'driver', 'pas1', 'pas2', 'pas3'];
  issueColumns: string[] = ['position', 'company', 'reporter', 'message', 'action1'];
  dataSource = CARPOOL_DATA;
  dataSource2 = ISSUE_DATA;
  dataSource3 = GROUP_DATA;
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Carpool Groups', cols: 1, rows: 1 },
          { title: 'User Join Requests', cols: 1, rows: 1 },
          { title: 'Issues', cols: 1, rows: 1 },
          { title: 'Company Join Requests', cols: 1, rows: 1 }
        ];
      }
      return [
        { title: 'Carpool Groups', cols: 2, rows: 1 },
        { title: 'User Join Requests', cols: 1, rows: 1 },
        { title: 'Issues', cols: 1, rows: 2 },
        { title: 'Company Join Requests', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
