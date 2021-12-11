import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { tryRegister } from './state/registration.actions';
import { selectRegistrationFailed, selectRegistrationSuccess } from './state/registration.selectors';

@Component({
  selector: 'progress-register',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationSuccess$: Observable<boolean>;
  registrationFailed$: Observable<boolean>;
  registerForm: FormGroup;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [ Validators.required ]],
      password: ['', [ Validators.required ]],
      passwordRepeat: ['', [Validators.required]]
    })
  }

  get username() {
    return this.registerForm.get('username') as FormControl;
  }

  get password() {
    return this.registerForm.get('password') as FormControl;
  }

  get passwordRepeat() {
    return this.registerForm.get('passwordRepeat') as FormControl
  }

  submit() {
    this.store.select(selectRegistrationSuccess).pipe(
      tap(() => this.snackBar.open('Erfolgreich registriert', undefined, { duration: 3000 }))
    ).subscribe();
    this.store.select(selectRegistrationFailed).pipe(
      tap(() => this.snackBar.open('Registrierung fehlgeschlagen', undefined, { duration: 3000 }))
    );
    this.store.dispatch(tryRegister({
      username: this.username.value,
      password: this.password.value
    }));
  }

}
