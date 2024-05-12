import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { ApiService } from '../../components/Services/api.service';
import { UserStoreService } from '../../Services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
public users:any = [];
public fullName: string = "";
constructor(private auth: AuthService, private api: ApiService, private userStore: UserStoreService){

}

ngOnInit(): void {
  this.api.getUsers().subscribe(
    res=>{
      this.users = res;
    }
  );
debugger;
  this.userStore.getFirstNameFromStore().subscribe(val =>{
      let FullNameFromPlayload= this.auth.getUserFullNameFromPlayload();
      this.fullName = val || FullNameFromPlayload
  });
  
}
logOut(){
 this.auth.loggingOut();
} 
}

