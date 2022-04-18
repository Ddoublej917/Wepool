import { Component, OnInit } from '@angular/core';
import { AuthguardServiceService } from '../services/Authguard-service/authguard-service.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor( public userService: AuthguardServiceService) {
    if(!this.userService.gettoken()){
      this.ngOnInit()
    }
   }

 email = localStorage.getItem("email");


  ngOnInit(): void {
  
  }

  get GetUsername(): string
   {
     return localStorage.getItem("email");
   }

}
