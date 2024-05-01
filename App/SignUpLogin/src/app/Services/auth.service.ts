import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private pathUrl: string = "https://localhost:44311/api/Users/";
  constructor(private http: HttpClient) { }

  signUp(useObj:any){
        return this.http.post<any>(`${this.pathUrl}Register`, useObj);
  }

  login(useObj:any){
       return this.http.post<any>(`${this.pathUrl}Authenticate`, useObj);
  }
}
