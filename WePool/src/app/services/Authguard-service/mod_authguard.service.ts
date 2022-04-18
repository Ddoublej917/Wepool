import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModAuthguardService {

  constructor() { }
  gettoken(){

    return !!localStorage.getItem("IsMod");  
    }  
}
