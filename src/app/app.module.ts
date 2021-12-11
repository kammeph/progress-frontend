import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './screens/login/login.component';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './state/app.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PasswordInputComponent } from './presenters/password-input/password-input.component';
import { TextInputComponent } from './presenters/text-input/text-input.component';
import { AuthInterceptor } from './lib/interceptors/auth.interceptor/auth.interceptor';
import { ErrorInterceptor } from './lib/interceptors/error.interceptor/error.interceptor';
import { FormatInterceptor } from './lib/interceptors/format.interceptor/format.interceptor';
import { RegistrationComponent } from './screens/registration/registration.component';
import { logInReducer } from './screens/login/state/login.reducer';
import { registrationReducer } from './screens/registration/state/registration.reducer';
import { appReducer } from './state/app.reducer';
import { LogInEffects } from './screens/login/state/login.effects';
import { RegistrationEffects } from './screens/registration/state/registration.effects';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PasswordInputComponent,
    TextInputComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSelectModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    StoreModule.forRoot({ app: appReducer, login: logInReducer, registration: registrationReducer }),
    EffectsModule.forRoot([AppEffects, LogInEffects, RegistrationEffects]),
    BrowserAnimationsModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: FormatInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
