import { NgModule } from '@angular/core';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './screens/login/login.component';
import { PasswordInputComponent } from './presenters/password-input/password-input.component';
import { TextInputComponent } from './presenters/text-input/text-input.component';
import { AuthInterceptor } from './lib/interceptors/auth.interceptor/auth.interceptor';
import { ErrorInterceptor } from './lib/interceptors/error.interceptor/error.interceptor';
import { FormatInterceptor } from './lib/interceptors/format.interceptor/format.interceptor';
import { RegistrationComponent } from './screens/registration/registration.component';
import { NavigationComponent } from './screens/navigation/navigation.component';
import { AppState } from './store/app.state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { UserComponent } from './screens/user/user.component';
import { StrengthValuesComponent } from './screens/strength-values/strength-values.component';
import { StrengthValueState } from './screens/strength-values/store/strength-value.state';
import { ExercisesComponent } from './screens/exercises/exercises.component';
import { ExerciseState } from './screens/exercises/store/exercise.state';
import { ExerciseGroupComponent } from './screens/exercises/exercise-group/exercise-group.component';
import { ExerciseEditFormComponent } from './screens/exercises/exercise-edit-form/exercise-edit-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PasswordInputComponent,
    TextInputComponent,
    RegistrationComponent,
    NavigationComponent,
    UserComponent,
    StrengthValuesComponent,
    ExercisesComponent,
    ExerciseGroupComponent,
    ExerciseEditFormComponent
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
    MatExpansionModule,
    MatBottomSheetModule,
    MatCardModule,
    MatMenuModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
    NgxsModule.forRoot([AppState, StrengthValueState, ExerciseState], {
      developmentMode: !environment.production
    }),
    NgxsStoragePluginModule.forRoot({
      key: [AppState, StrengthValueState, ExerciseState]
    }),
    NgxsRouterPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot({ disabled: environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      name: 'smart-forester-redux',
      disabled: environment.production
    })
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
    { provide: 'API_URL', useValue: environment.apiEndpoint },
    {
      provide: APP_BASE_HREF,
      useFactory: (s: PlatformLocation) => s.getBaseHrefFromDOM(),
      deps: [PlatformLocation]
    }
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: FormatInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
