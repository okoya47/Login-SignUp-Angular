import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

constructor(private formBuild: FormBuilder) {}
  ngOnInit(): void {
    this.loginForm = this.formBuild.group({
        password:['', Validators.required],
        username:['', Validators.required]
    })
  }

hideShowPass(){
  this.isText = !this.isText;
  this.isText? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
  this.isText? this.type = "text" : this.type = "password";

}

OnSubmit(){
  if(this.loginForm.invalid){
    console.log(this.loginForm.value);
  }else{
    console.log("Form is not valid");
  }
}
}
