import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private urlServidor = 'https://scorebbtest.herokuapp.com/'
  // private urlServidor = 'https://scorebebe.herokuapp.com/';
    // private urlServidor = 'http://localhost:1337/'
  private _registerUrl = this.urlServidor + 'usuario/signup';
  private _loginUrl = this.urlServidor + 'usuario/login';


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

  getUsuarios() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.getToken()
      })
    };
    return this.http.get<any>(this.urlServidor + 'usuario', httpOptions);
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
}
