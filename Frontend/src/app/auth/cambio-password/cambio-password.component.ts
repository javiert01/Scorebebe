import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cambio-password',
  templateUrl: './cambio-password.component.html',
  styleUrls: ['./cambio-password.component.css']
})
export class CambioPasswordComponent implements OnInit {

  cambioPasswordForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.cambioPasswordForm = new FormGroup({
      'passwordActual': new FormControl(null, Validators.required),
      'passwordNuevo': new FormControl(null, Validators.required),
      'passwordNuevoConfirma': new FormControl(null, Validators.required, this.equalPasswords.bind(this))
    });
  }

  cambiarPassword() {
    console.log(this.cambioPasswordForm);
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

}
