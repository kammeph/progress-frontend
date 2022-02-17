import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ChangeLocale, Register } from 'src/app/store/app.action';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'progress-register',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  @Select(AppState.registrationSuccess)
  registrationSuccess$: Observable<boolean>;
  @Select(AppState.registrationFailed) registrationFailed$: Observable<boolean>;
  registerForm: FormGroup;

  constructor(private store: Store, private fb: FormBuilder, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordRepeat: ['', [Validators.required]]
    });
  }

  get username() {
    return this.registerForm.get('username') as FormControl;
  }

  get password() {
    return this.registerForm.get('password') as FormControl;
  }

  get passwordRepeat() {
    return this.registerForm.get('passwordRepeat') as FormControl;
  }

  submit() {
    this.store.dispatch(new Register(this.username?.value, this.password?.value));
  }

  changeLocale(locale: string) {
    this.store.dispatch(new ChangeLocale(locale));
  }
}
