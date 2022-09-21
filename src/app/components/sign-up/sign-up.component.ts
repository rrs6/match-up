import { UsersService } from './../../services/users.service';
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, NonNullableFormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { AuthenticationService } from 'src/app/services/authentication.service';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if(password && confirmPassword && password !== confirmPassword){
      return{
        passwordsDontMatch: true
      }
    }
    return null;

  };
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  }, {validators: passwordsMatchValidator()});
  constructor(private authService: AuthenticationService, private toast: HotToastService, private router: Router, private userService: UsersService) { }

  ngOnInit(): void {
  }
  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }
  get password() {
    return this.signUpForm.get('password');
  }
  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }
  signUp() {
    const {name, email, password} = this.signUpForm.value;
    if(!this.signUpForm.valid)
      return;
    return this.authService.signUp(email!, password!).pipe(switchMap(({user: {uid}}) => this.userService.addUser({uid, email: email!, displayName: name!})),this.toast.observe({
      success: "Account was created successfully",
      loading: "Signing in",
      error: ({message}) => `${message}`
    })).subscribe( () => {
      this.router.navigate(['/home'])
    });
  }
}
