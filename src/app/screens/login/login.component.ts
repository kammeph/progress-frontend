import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { selectLogInFailed } from './state/login.selectors';
import { tryLogIn } from './state/login.actions';

@Component({
  selector: 'progress-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logInForm: FormGroup;
  logInFailed$: Observable<boolean>;
  accessToken$: Observable<string>;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.logInForm = this.fb.group({
      username: ['', [ Validators.required ]],
      password: ['', [ Validators.required ]]
    })
  }

  submit(): void {
    this.logInFailed$ = this.store.select(selectLogInFailed).pipe(
      tap((logInFailed) => {
        if (logInFailed)
          this.logInForm.reset();
        for (let control in this.logInForm.controls) {
          this.logInForm.controls[control].setErrors(null);
        }
      }),
    );
    this.store.dispatch(tryLogIn(this.logInForm.value));
  }

  get username() {
    return this.logInForm.get('username') as FormControl;
  }

  get password() {
    return this.logInForm.get('password') as FormControl;
  }
}
