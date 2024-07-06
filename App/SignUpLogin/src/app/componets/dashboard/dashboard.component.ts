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
public role: string = "";
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

  this.userStore.getRoleFromStore().subscribe(val =>{
    let RoleFromPlayload= this.auth.getUserRoleFromPlayload();
    this.role = val || RoleFromPlayload
});
  
}
logOut(){
 this.auth.loggingOut();
} 
}

