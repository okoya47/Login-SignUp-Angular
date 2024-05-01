import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../Helpers/ValidateForm';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

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
loginForm!: FormGroup

constructor(private formBuild: FormBuilder, private auth: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.loginForm = this.formBuild.group({
        username:['', Validators.required],
        password:['', Validators.required]
        
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
        this.router.navigate(['dashboard']);
        alert(res.message)
      }, 
      error: (err)=>{
        alert(err?.error.message)
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
