import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../Helpers/ValidateForm';
import { AuthService } from '../../Services/auth.service';
import { Route, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  title: string ="This is the string";
  type:string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signUpForm!: FormGroup

  constructor(private formBuild: FormBuilder, private auth: AuthService, private router: Router, private Toast: NgToastService,) {}
  ngOnInit(): void {
    this.signUpForm = this.formBuild.group({
        firstname:['', Validators.required],
        lastname:['', Validators.required],
        email:['', Validators.required],
        username:['', Validators.required],
        password:['', Validators.required]
    })
  }

hideShowPass(){
  this.isText = !this.isText;
  this.isText? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
  this.isText? this.type = "text" : this.type = "password";

}

signIn(){
  debugger;
  if(this.signUpForm.valid){
    console.log(this.signUpForm.value);
    debugger;
    this.auth.signUp(this.signUpForm.value).subscribe({
      
       next: (res)=>{
        this.signUpForm.reset();
        this.router.navigate(['login']);
        alert(res.message);
       },
       error:(err)=>{
        debugger;
        alert(err?.error.message)
        this.Toast.error({detail:"ERROR", summary:"Something went wrong seriously!!", duration: 5000});
        
       }
    })
  }else{
    console.log("Form is not valid");
    ValidateForm.validateAllFormFields(this.signUpForm);
    alert("Your form is fields invalid!");
  }
}
}
