import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario/usuario.model';
import { AuthService } from '../auth/auth.service';
import { Neonato } from '../neonato/neonato.model';
import { NeonatoService } from '../neonato/neonato.service';

@Component({
  selector: 'app-resultados-test',
  templateUrl: './resultados-test.component.html',
  styleUrls: ['./resultados-test.component.css']
})
export class ResultadosTestComponent implements OnInit {

  usuarios : Usuario[];
  neonatos: Neonato[];
  
  constructor(private authService: AuthService, private neonatoService: NeonatoService) { }

  ngOnInit() {
    this.authService.getUsuarios().subscribe(
      (response) => this.usuarios = response
    );
    this.neonatoService.getNeonatos().subscribe(
      (response) => this.neonatos = response
    );

  }

 


}
