import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { TokenModelApi } from '../models/token-api.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private toast: NgToastService, private route: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Append your token to the request header here
    const token = this.authService.getToken(); // Replace 'YOUR_TOKEN_HERE' with your actual token
  if(token){
     request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
    // Pass on the modified request
    return next.handle(request).pipe(
      catchError((erri: any)=>{
        if(erri instanceof HttpErrorResponse){
          if(erri.status == 401){
           // this.toast.error({detail:"Warning", summary:"Token is expired, Login again"});
           // this.route.navigate(['login'])

           return this.handleUnauthorizedError(request, next);
          }
        }
        return  throwError(()=> new Error("Some other error occured Level Test!!"))

      })
    );
  }
  handleUnauthorizedError(req: HttpRequest<any>, next: HttpHandler){
      const accessToken = this.authService.getToken()!;
      const refreshToken = this.authService.getRefreshToken()!;

      let tokenApiModel = new TokenModelApi();
      
      tokenApiModel.accessToken = accessToken;
      tokenApiModel.refreshToken = refreshToken;

      return this.authService.renewToken(tokenApiModel)
      .pipe(
        switchMap((data: TokenModelApi)=>{
          this.authService.storeRefreshToken(data.refreshToken);
          this.authService.storeToken(data.accessToken);

          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${data.accessToken}`
            }
          });
          return next.handle(req);
        }),
        catchError((err)=>{
          return throwError(()=>{
            this.toast.error({detail:"Warning", summary:"Token is expired, Login again"});
            this.route.navigate(['login'])
          })
        })
      )
  }

};
