import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/Users/users.model';
import { UserService } from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser?: Users;
  registerForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  },
    { updateOn: 'submit' }
  );

  get firstName(): string { return this.registerForm.get('firstName')?.value; }
  get lastName(): string { return this.registerForm.get('lastName')?.value; }
  get username(): string { return this.registerForm.get('username')?.value; }
  get email(): string { return this.registerForm.get('email')?.value; }
  get password(): string { return this.registerForm.get('password')?.value; }

  prepareSave(): Users {
    return new Users(
      null,
      this.username,
      this.email,
      this.password,
      "",
      ""
    )
  }

  registerUser(): void {
    if (this.registerForm.valid) {
      let registeredUser = this.prepareSave();
      console.log(registeredUser);
      this.userService.registerUser(registeredUser).subscribe();
      this.router.navigate(['/homepage']);
    }
  }

  constructor(
    private fb: FormBuilder, 
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {

  }

}
