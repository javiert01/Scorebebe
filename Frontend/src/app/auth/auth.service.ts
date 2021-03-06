import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  // private urlServidor = 'https://scorebbtest.herokuapp.com/'
  private urlServidor = 'https://scorebebe.herokuapp.com/';
  private _registerUrl = this.urlServidor + 'usuario/signup';
  private _loginUrl = this.urlServidor + 'usuario/login';
  helper = new JwtHelperService();


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
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.getToken()
      })
    };
    console.log(httpOptions);
    return this.http.get<any>(this.urlServidor + 'usuario/' + username, httpOptions);
  }

  getUserDataRol(rol: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.getToken()
      })
    };
    return this.http.get<any>(this.urlServidor + 'usuario/' + rol, httpOptions);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isTokenExpired() {
    const token = localStorage.getItem('token');
      if (token !== null) {
        if (this.helper.isTokenExpired(token)) {
          return true;
        } else {
          return false;
        }
      }
  }

  getUsuarios() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.getToken()
      })
    };
    return this.http.get<any>(this.urlServidor + 'usuario?limit=1000', httpOptions);
  }
  setUsuarioActivo(usernameAux) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.getToken()
      })
    };
    const data = {
      username: usernameAux
    };
    return this.http.post(this.urlServidor + 'usuario/actualizaractivo', data, httpOptions);
  }

  sendInformeMail(attachment) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.getToken()
      })
    };
    return this.http.post(this.urlServidor + 'usuario/sendinformemail', attachment, httpOptions);
  }

  postAPIkey(token) {
    return this.http.post(this.urlServidor + 'validate_captcha', token);
  }

  validarUsuario(username) {
    return this.http.post(this.urlServidor + 'usuario/validadorusername', username);
  }

  reestablecerPassword(username) {
    return this.http.post(this.urlServidor + 'password/restaurar', username);
  }

  cambiarPassword(id, passwordActual, newPassword) {
    const params = {
      id: id,
      oldPassword: passwordActual,
      newPassword: newPassword
    };
    return this.http.post(this.urlServidor + 'password/cambio', params);
  }
}
