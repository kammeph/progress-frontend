import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tryLogIn } from 'src/app/state/app.action';
import { getTryLogIn, getAccessToken } from 'src/app/state/app.selectors';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/app.models';

@Component({
  selector: 'progress-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  tryLogIn$: Observable<boolean>;
  accessToken$: Observable<string>;
  user$: Observable<User>;

  constructor(private store: Store, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [ Validators.required ]],
      password: ['', [ Validators.required ]]
    })
  }

  submit(): void {
    this.tryLogIn$ = this.store.pipe(
      select(getTryLogIn)
    )

    this.accessToken$ = this.store.pipe(
      select(getAccessToken)
    )

    this.store.dispatch(tryLogIn(this.loginForm.value));
  }

  get username() {
    return this.loginForm.get('username') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }
}
