import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Usuario } from '../usuario/usuario.model';
import { Http } from '@angular/http';

@Component({
  selector: 'app-activar-usuarios',
  templateUrl: './activar-usuarios.component.html',
  styleUrls: ['./activar-usuarios.component.css']
})
export class ActivarUsuariosComponent implements OnInit {

  usuarios : Usuario[];
  
  constructor(public authService: AuthService, private http:Http) { }

  ngOnInit() {
    this.authService.getUsuarios().subscribe(
      (response) => this.usuarios = response
    );
  }

  onActivarUsuario(username) {
    console.log(username);
    this.authService.setUsuarioActivo(username).subscribe(
      (response) => console.log(response)
    )
  }



}
