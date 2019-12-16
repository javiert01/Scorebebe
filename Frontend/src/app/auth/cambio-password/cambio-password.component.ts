import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { NuevoPasswordDialogComponent } from 'src/app/nuevo-password-dialog/nuevo-password-dialog.component';

@Component({
  selector: 'app-cambio-password',
  templateUrl: './cambio-password.component.html',
  styleUrls: ['./cambio-password.component.css']
})
export class CambioPasswordComponent implements OnInit {

  cambioPasswordForm: FormGroup;
  userName = localStorage.getItem('username');
  userID;
  mensaje_err = '';
  constructor(private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit() {
    this.authService.getUserData(this.userName)
    .subscribe(
      (response) => {
        this.userID = response.id;
        //this.userID = this.addLeadingZero(this.userID,4);

      }
    );
    this.cambioPasswordForm = new FormGroup({
      'passwordActual': new FormControl(null, Validators.required),
      'passwordNuevo': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
      'passwordNuevoConfirma': new FormControl(null, Validators.required, this.equalPasswords.bind(this))
    });

  }

  cambiarPassword() {
    this.authService.cambiarPassword(this.userID.toString(), this.cambioPasswordForm.get('passwordActual').value,
    this.cambioPasswordForm.get('passwordNuevo').value).
    subscribe(
      data => {
        this.openDialog('OK');
      },
      err => {
        if (err.status === 200) {
          this.openDialog('OK');
        } else {
          console.log(err);
          this.mensaje_err = err.error.err;
          this.openDialog('ERROR');
        }
      }
    )
  }

  equalPasswords(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      if (this.cambioPasswordForm.get('passwordNuevo').value !== control.value) {
        resolve({'differentPassword': true});
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
    this.dialog.open(NuevoPasswordDialogComponent, dialogConfig);
  }

}
