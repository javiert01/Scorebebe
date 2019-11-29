import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material';

import { AppComponent } from './app.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { NeonatoComponent } from './neonato/neonato.component';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { NoLoginGuard } from './auth/no-login-guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptorService } from './auth/token-interceptor.service';
import { AdminGuard } from './auth/admin.guard';
import { NeonatoService } from './neonato/neonato.service';
import { HomepageComponent } from './homepage/homepage.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { ActivarUsuariosComponent } from './activar-usuarios/activar-usuarios.component';
import { ResultadosTestComponent } from './resultados-test/resultados-test.component';
import { SelectedDirective } from './shared/selected.directive';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import {NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DisclaimerDialogComponent } from './disclaimer-dialog/disclaimer-dialog.component';
import { ReestablecerPasswordComponent } from './auth/reestablecer-password/reestablecer-password.component';


@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    NeonatoComponent,
    CourseDialogComponent,
    SignUpComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    AdminpageComponent,
    ActivarUsuariosComponent,
    ResultadosTestComponent,
    SelectedDirective,
    RegisterDialogComponent,
    DisclaimerDialogComponent,
    ReestablecerPasswordComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxMaterialTimepickerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })

  ],
  providers: [NeonatoService, AuthGuard, AuthService, NoLoginGuard, AdminGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [CourseDialogComponent, RegisterDialogComponent, DisclaimerDialogComponent]
})
export class AppModule { }
