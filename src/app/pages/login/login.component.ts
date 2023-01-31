import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/Users/users.model';
import { UserService } from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginPageWindow: any;

  existingUser?: Users;
  accessToken: string = "";
  signInForm: FormGroup = this.fb.group({
    emailAddress: ['', Validators.required],
    password: ['', Validators.required]
  },
    { updateOn: 'submit' }
  );

  get emailAddress(): string { return this.signInForm.get('emailAddress')?.value; }

  get password(): string { return this.signInForm.get('password')?.value; }

  prepareSignIn(): Users {
    return new Users(
      null,
      "",
      this.emailAddress,
      this.password,
      "",
      ""
    )
  }

  login() {
    if (this.signInForm.valid) {
      let userLoggingIn = this.prepareSignIn();
      this.userService.checkLoginCredentials(userLoggingIn).subscribe({
        next: (token: string) => {
          this.accessToken = token;
          localStorage.setItem("accessToken", token);
          this.loginPageWindow.location.reload();
        }
      }
      );



    }
  }

  goToRegisterPage() {
    this.router.navigate(['register']);
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService) {
    this.loginPageWindow = window;
  }

  ngOnInit(): void {
    if (localStorage.getItem("accessToken") != null) {
      this.router.navigate(['homepage']);
    }
  }

}
