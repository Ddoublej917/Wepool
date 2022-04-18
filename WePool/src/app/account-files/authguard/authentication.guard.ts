import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthguardServiceService } from '../../services/Authguard-service/authguard-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private Authguardservice: AuthguardServiceService, private router: Router) {}  
canActivate(): boolean {  
    if (!this.Authguardservice.gettoken()) {  
      console.log("redirect")
        this.router.navigateByUrl("/login");  
    }
    return this.Authguardservice.gettoken();  
}  
  
}
