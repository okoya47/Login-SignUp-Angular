import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service'; // Import AuthService
import { inject } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

export const authGGuard: CanActivateFn = (route : ActivatedRouteSnapshot, state: RouterStateSnapshot ) => {


  if (inject(AuthService).isLoggedIn()) {
    return true;
  } else {
    inject(NgToastService).error({detail:"ERROR", summary: "Please login Again!!"});
    inject(Router).navigate(['login']);
    return false;
  }
};
