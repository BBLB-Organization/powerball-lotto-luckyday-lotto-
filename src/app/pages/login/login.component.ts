import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Users } from 'src/app/models/Users/users.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  existingUser: Users | undefined;
  signInForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  },
    { updateOn: 'submit' }
  );

  get email(): string {
    return this.signInForm.get('email')?.value;
  }

  get password(): string {
    return this.signInForm.get('password')?.value;
  }

  onSubmit() {
    if (this.signInForm.valid) {
      let fakeEmail = this.signInForm.get('email')!.value;
      console.log("This is the email: " + fakeEmail);
    }
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

  }

}
