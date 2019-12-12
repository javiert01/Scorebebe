import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { NoLoginGuard } from './auth/no-login-guard';
import { NeonatoComponent } from "./neonato/neonato.component";
import { NgModule } from "@angular/core";
import { HomepageComponent } from "./homepage/homepage.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import { AdminGuard } from "./auth/admin.guard";
import { ActivarUsuariosComponent } from "./activar-usuarios/activar-usuarios.component";
import { ResultadosTestComponent } from "./resultados-test/resultados-test.component";
import { AdminpageComponent } from "./adminpage/adminpage.component";
import { ReestablecerPasswordComponent } from './auth/reestablecer-password/reestablecer-password.component';
import { CambioPasswordComponent } from './auth/cambio-password/cambio-password.component';
import { InfoGruposCieComponent } from './info-grupos-cie/info-grupos-cie.component';


const appRoutes: Routes = [
    { path: '', redirectTo: '/homepage', pathMatch: 'full'},
    { path: 'homepage', component: HomepageComponent, canActivate: [NoLoginGuard]},
    { path: 'signup', component: SignUpComponent, canActivate: [NoLoginGuard]},
    { path: 'login' , component: LoginComponent, canActivate: [NoLoginGuard]},
    { path: 'reestablecer-password' , component: ReestablecerPasswordComponent, canActivate: [NoLoginGuard]},
    { path: 'test', canActivate: [AuthGuard], component: NeonatoComponent},
    { path: 'cambio-password/:id', canActivate: [AuthGuard], component: CambioPasswordComponent},
    { path: 'info-grupos-cie', component: InfoGruposCieComponent},
    { path: 'admin-page', component: AdminpageComponent, canActivate: [AdminGuard]},
    { path: 'activar-usuarios', component: ActivarUsuariosComponent, canActivate: [AdminGuard]},
    { path: 'resultados-test', component: ResultadosTestComponent, canActivate: [AdminGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
