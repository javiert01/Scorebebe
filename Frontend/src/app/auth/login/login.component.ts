import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { RegisterDialogComponent } from 'src/app/register-dialog/register-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mensaje_err = '';
  loginForm: FormGroup;
  loginUserData = {
    'username': '',
    'password': ''
  };
  constructor(private _auth: AuthService, private _router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
  }

  onSignin() {
    this.loginUserData = {
      'username': this.loginForm.get('username').value,
      'password': this.loginForm.get('password').value
    };
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
        this.mensaje_err = err.error.err;
        this.openDialog('ERROR');
      }
    );
  }

  openDialog(respuesta) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '300px';
    dialogConfig.width = '400px';
    dialogConfig.data = {
      mensaje: respuesta,
      mensaje_err: this.mensaje_err
    };
    this.dialog.open(RegisterDialogComponent, dialogConfig);
  }

}

