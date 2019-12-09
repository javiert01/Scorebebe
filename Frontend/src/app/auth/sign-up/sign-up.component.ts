import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../usuario/usuario.model';
import { AuthService } from '../auth.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { RegisterDialogComponent } from 'src/app/register-dialog/register-dialog.component';
import { Observable } from 'rxjs';
import { DisclaimerDialogComponent } from 'src/app/disclaimer-dialog/disclaimer-dialog.component';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup;
  mensaje_err = '';
  registerUserData: Usuario = {
    nombre: '',
    institucion: '',
    username: '',
    password: '',
    email: '',
    rol: 'normal',
    activo: false

  };

  constructor(private _auth: AuthService, private dialog: MatDialog) {
   }

  ngOnInit() {
    window.scroll(0, 200);
    this.signupForm = new FormGroup({
      'nombre': new FormControl(null, Validators.required),
      'institucion': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'password-confirm': new FormControl(null, Validators.required, this.equalPasswords.bind(this)),
      'aceptarCondiciones': new FormControl(null, Validators.required, this.isChecked.bind(this))
    });
    console.log(this.signupForm);
  }

  registerUser() {
    this.registerUserData.nombre = this.signupForm.get('nombre').value;
    this.registerUserData.username = this.signupForm.get('username').value;
    this.registerUserData.institucion = this.signupForm.get('institucion').value;
    this.registerUserData.password = this.signupForm.get('password').value;
    this.registerUserData.email = this.signupForm.get('email').value;
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => {
        this.openDialog('OK');
      },
      err => {
        if (err.status === 200) {
          this.openDialog('OK');
        } else {
          this.mensaje_err = err.error.err;
          this.openDialog('ERROR');
        }
        // this.openDialog()
       }
    );
  }

  equalPasswords(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      if (this.signupForm.get('password').value !== control.value) {
        resolve({'differentPassword': true});
      } else {
        resolve(null);
      }
    });
    return promise;
  }

  isChecked(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
    if (this.signupForm.get('aceptarCondiciones').value !== true) {
        resolve({'isChecked': true});
      } else {
        resolve(null);
      }
    });
    return promise;
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

  openDisclaimerDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '800px';
    dialogConfig.width = '600px';
    this.dialog.open(DisclaimerDialogComponent, dialogConfig);
  }

}
