import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenModelApi } from '../models/token-api.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private pathUrl: string = "https://localhost:44311/api/Users/";

  private userLoad: any;
  constructor(private http: HttpClient, private route: Router) { 
    this.userLoad = this.decodedToken();
  }

  signUp(useObj:any){
    debugger;
        return this.http.post<any>(`${this.pathUrl}Register`, useObj);
  }

  login(useObj:any){
    debugger;
       return this.http.post<any>(`${this.pathUrl}Authenticate`, useObj);
  }
  loggingOut(){
    localStorage.removeItem("token");
    this.route.navigate(['login']);
  }
  storeToken(tokenValue: string){
    localStorage.setItem("token", tokenValue);
  }

  storeRefreshToken(tokenValue: string){
    localStorage.setItem("RefreshToken", tokenValue);
  }

  getRefreshToken(){
    return localStorage.getItem("RefreshToken");
   }

  getToken(){
   return localStorage.getItem("token");
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem("token");
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();

    const token = this.getToken()!;

    console.log(jwtHelper.decodeToken(token));

    return jwtHelper.decodeToken(token);
  }
  
  getUserFullNameFromPlayload(){
    if(this.userLoad){
      debugger;
      return this.userLoad.name;
    }
  }

  getUserRoleFromPlayload(){
    if(this.userLoad){
      return this.userLoad.role;
    }
  }

  renewToken(tokenApi: TokenModelApi){
    return this.http.post<any>(`${this.pathUrl}Refresh`, tokenApi)
    
  }
}
