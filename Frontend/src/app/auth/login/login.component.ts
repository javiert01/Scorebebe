import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {
    'username': '',
    'password': ''
  };
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
       localStorage.setItem('token', res.token);
       localStorage.setItem('username', this.loginUserData['username']);
       const nombre: string = this.loginUserData['username'];
       this._auth.getUserData(nombre)
       .subscribe(
         (user) => {
          localStorage.setItem('rol', user.rol);
          if (user.rol === 'Administrador') {
          this._router.navigate(['/admin-page']);
          } else {
          this._router.navigate(['/test']);
          }
        },
        (error) => console.log('existe un error')
       );
      },

      err => {
      }
    );
  }

}

