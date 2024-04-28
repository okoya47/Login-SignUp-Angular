import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../Helpers/ValidateForm';

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
        username:['', Validators.required],
        password:['', Validators.required]
        
    })
  }

hideShowPass(){
  this.isText = !this.isText;
  this.isText? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
  this.isText? this.type = "text" : this.type = "password";

}

OnSubmit(){
  debugger;
  if(this.loginForm.valid){
    console.log(this.loginForm.value);
  }else{
    console.log("Form is not valid");
    ValidateForm.validateAllFormFields(this.loginForm);
    alert("Your form is fields invalid!");
  }
}

}
