import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material';

import { AppComponent } from './app.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { NeonatoComponent } from './neonato/neonato.component';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { HttpModule } from '@angular/http';
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
    SelectedDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule

  ],
  providers: [NeonatoService, AuthGuard, AuthService, NoLoginGuard, AdminGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [CourseDialogComponent]
})
export class AppModule { }
