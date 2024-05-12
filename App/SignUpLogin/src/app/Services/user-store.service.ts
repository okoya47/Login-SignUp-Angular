import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private fullName$ = new BehaviorSubject("");
  private role$ = new BehaviorSubject("");
  constructor() { }

  getRoleFromStore(){
   return this.role$.asObservable();
  }

  setRoleForStoeName(role: string){
    this.role$.next(role);
  }

  getFirstNameFromStore(){
    return this.fullName$.asObservable();
   }

  setFirstNameForStoeName(role: string){
    this.fullName$.next(role);
  }
}
