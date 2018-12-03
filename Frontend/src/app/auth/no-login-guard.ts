import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class NoLoginGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) { }

  canActivate(): boolean {
    if(localStorage.getItem('token') === null){
      return true;
    } else{
      this._router.navigate(['/test'])
      return false;
    }
  }
}