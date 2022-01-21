import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Login } from 'src/app/store/app.action';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'progress-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Select(AppState.loginFailed) logInFailed$: Observable<boolean>;

  logInForm: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.logInForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  submit(): void {
    this.store.dispatch(new Login(this.username?.value, this.password?.value));
  }

  get username() {
    return this.logInForm.get('username') as FormControl;
  }

  get password() {
    return this.logInForm.get('password') as FormControl;
  }
}
