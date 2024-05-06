import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private pathUrl: string = "https://localhost:44311/api/Users/";
  constructor(private http: HttpClient, private route: Router) { }

  signUp(useObj:any){
        return this.http.post<any>(`${this.pathUrl}Register`, useObj);
  }

  login(useObj:any){
       return this.http.post<any>(`${this.pathUrl}Authenticate`, useObj);
  }
  loggingOut(){
    localStorage.removeItem("token");
    this.route.navigate(['login']);
  }
  storeToken(tokenValue: string){
    localStorage.setItem("token", tokenValue);
  }

  getToken(){
    localStorage.getItem("token");
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem("token");
  }
}
