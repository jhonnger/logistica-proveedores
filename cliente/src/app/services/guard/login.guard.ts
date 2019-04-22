import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import {LoginService} from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements  CanActivate {
  constructor(private router: Router,
              private loginService: LoginService) {

  }
  canActivate(): boolean  {
    if (!this.loginService.estaLogueado()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
