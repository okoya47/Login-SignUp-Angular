import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private pathUrl: string = "https://localhost:44311/api/Users/Users/";
  constructor(private http: HttpClient) { }

  getUsers(){
   return this.http.get<any>(this.pathUrl);
  }
}
