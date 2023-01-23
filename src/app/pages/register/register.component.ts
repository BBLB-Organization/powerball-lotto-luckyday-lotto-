import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from 'src/app/models/Users/users.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser: Users | undefined;
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

  onSubmit() {
    if (this.registerForm.valid) {
      let fakeEmail = this.registerForm.get('email')!.value;
    }
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

  }

}
