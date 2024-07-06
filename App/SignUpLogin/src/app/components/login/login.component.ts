import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../Helpers/ValidateForm';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserStoreService } from '../../Services/user-store.service';
import { ResetPasswordService } from '../../Services/reset-password.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
title: string ="This is the string";
type:string = "password";
isText: boolean = false;
eyeIcon: string = "fa-eye-slash";
loginForm!: FormGroup;
resetPasswordEmail!: string;
isValidEmail!: boolean;

constructor(
  private formBuild: FormBuilder,
  private auth: AuthService,
  private router: Router, 
  private Toast: NgToastService,
  private userStore: UserStoreService,
  private resetService : ResetPasswordService
 ) {}
  ngOnInit(): void {
    this.loginForm = this.formBuild.group({
        username:['', Validators.required],
        password:['', Validators.required]
        
    })
  }
checkEmailIsValid(event: string){
  const value = event;
  const pattrn = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  this.isValidEmail = pattrn.test(value);

  return this.isValidEmail;

}

confirmSend(){
  if(this.checkEmailIsValid(this.resetPasswordEmail)){
    console.log(this.resetPasswordEmail);
    
  }
  // API call goes here
  this.resetService.sendResetPassword(this.resetPasswordEmail).subscribe({
    next:(res)=>{
      this.Toast.success({detail:"SUCCESS", summary:"Reset success", duration: 5000});
      this.resetPasswordEmail = "";
      const closeBu = document.getElementById("closebtn");
      closeBu?.click();
    },
    error:(err)=>{
      this.Toast.error({detail:"ERROR", summary:"Email is not sent!!", duration: 5000});
    }
  })
}

hideShowPass(){
  this.isText = !this.isText;
  this.isText? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
  this.isText? this.type = "text" : this.type = "password";

}

OnLogin(){
  debugger;
  if(this.loginForm.valid){
    debugger;
    this.auth.login(this.loginForm.value).subscribe({
    
      next: (res)=>{
        this.loginForm.reset();
        this.auth.storeToken(res.accessToken);
        this.auth.storeRefreshToken(res.refreshToken);
        let userToken = this.auth.decodedToken();
        this.userStore.setFirstNameForStoeName(userToken.name);
        this.userStore.setRoleForStoeName(userToken.role);
        this.Toast.success({detail:"SUCCESS", summary:res.message, duration: 5000});
        this.router.navigate(['dashboard']);
        
      }, 
      error: (err)=>{
        this.Toast.error({detail:"ERROR", summary:"Something went wrong seriously!!", duration: 5000});
      }
    });
    
    console.log(this.loginForm.value);
    
  }else{
    console.log("Form is not valid");
    ValidateForm.validateAllFormFields(this.loginForm);
    alert("Your form is fields invalid!");
  }
}
}
