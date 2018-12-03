import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Http , HttpModule} from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

    private urlServidor = 'http://66.96.147.96'
  private _registerUrl = this.urlServidor+':1337/usuario/signup';
  private _loginUrl = this.urlServidor+':1337/usuario/login';

  constructor(private http: HttpClient, private _router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }
  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('rol');
    localStorage.removeItem('username');
    this._router.navigate(['/homepage']);

  }

  getUserData(username: string) {
    return this.http.get<any>(this.urlServidor+':1337/usuario/' + username);
  }

  getUserDataRol(rol: string) {
    return this.http.get<any>(this.urlServidor+':1337/usuario/' + rol);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUsuarios() {
    return this.http.get<any>(this.urlServidor+':1337/usuario');
  }

  setUsuarioActivo(username) {
    return this.http.patch(this.urlServidor+':1337/usuario/actualizaractivo', username);
  }

}