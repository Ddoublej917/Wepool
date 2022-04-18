import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ModAuthguardService } from 'src/app/services/Authguard-service/mod_authguard.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModGuard implements CanActivate {
  constructor( private modauth: ModAuthguardService, private router: Router) {}  
canActivate(): boolean {  
    if (!this.modauth.gettoken()) {  
      window.alert("You don't have permission to view this page");
    } 
    return this.modauth.gettoken();  
}  
  
}
