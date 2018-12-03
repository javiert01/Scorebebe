import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../usuario/usuario.model';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  registerUserData: Usuario = {
    nombre: '',
    institucion: '',
    username: '',
    password: '',
    email: '',
    rol: 'normal',
    activo: false

  };

  constructor(private _auth: AuthService) {
   }

  ngOnInit() {
  }


  registerUser(form: NgForm) {
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => {
        console.log('Espera tu mail confirmando tu activación de la cuenta')
      },
      err => {
        if (err.status === 200) {
          console.log('Hubo un error, vuelve a intentarlo después')
        }
       }
    );
  }

}
