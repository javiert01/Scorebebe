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
  categorias = ['A','B','C','D'];
  idusuario;
  
  constructor(private authService: AuthService, private neonatoService: NeonatoService) { }

  ngOnInit() {
    this.authService.getUsuarios().subscribe(
      (response) => this.usuarios = response
    );
    this.neonatoService.getNeonatos().subscribe(
      (response) => this.neonatos = response
    );

  }

  onGetUserId(id) {
    this.idusuario = id;
    console.log(this.idusuario);
  }

  getNeonatosId() {
    if(this.idusuario > 0) {
      this.neonatoService.getNeonatoIdUsuario(this.idusuario)
      .subscribe(
      (response) => {
        this.neonatos = response;
      })
    } else {
      this.neonatoService.getNeonatos().subscribe(
        (response) => this.neonatos = response
      );
    }
    
  }

  cambiarNombreCatEdad(cat){
    let nombreCambiado = '';
    switch(cat){
      case 'edad1':
      nombreCambiado = '1 (Extremadamente prematuro (< 28 semanas),n(%))';
      break;
      case 'edad2':
      nombreCambiado = '2 (Muy prematuro (28 a < 32 semanas), n (%))';
      break;
      case 'edad3':
      nombreCambiado = '3 (Prematuro moderado (32 a < 37 semanas), n (%))';
      break;
      case 'edad4':
      nombreCambiado = '4 (A término temprano (37 a < 39 semanas), n (%))';
      break;
      case 'edad5':
      nombreCambiado = '5 (A término completo (39 a < 41 semanas), n (%))';
      break;
      case 'edad6':
      nombreCambiado = '(6 Post término (≥ 41 semanas), n (%))';
      break;
      default:
      break;
    }
    return nombreCambiado;
  }

  cambiarNombreCatPeso(cat){
    let nombreCambiado = '';
    switch(cat){
      case 'peso1':
      nombreCambiado = '1 (< 750 g al nacer)';
      break;
      case 'peso2':
      nombreCambiado = '2 (750 a < 1000 g al nacer)';
      break;
      case 'peso3':
      nombreCambiado = '3 (1000 a < 1500g al nacer)';
      break;
      case 'peso4':
      nombreCambiado = '4 (1500 a < 2500g al nacer)';
      break;
      case 'peso5':
      nombreCambiado = '5 (2500 a < 4000g al nacer)';
      break;
      case 'peso6':
      nombreCambiado = '6 (4000 o más g al nacer)';
      break;
      default:
      break;
    }
    return nombreCambiado;
  }

  cambiarNombreCatPesoEdad(cat){
    let nombreCambiado = '';
    switch(cat){
      case 'centil1':
      nombreCambiado = '1 (Percentil 5 al 95)';
      break;
      case 'centil2':
      nombreCambiado = '2 (< Percentil 5)';
      break;
      case 'centil3':
      nombreCambiado = '3 (> Percentil 95)';
      break;
      default:
      break;
    }
    return nombreCambiado;
  }

  cambiarNombreCatApgar(cat){
    let nombreCambiado = '';
    switch(cat){
      case 'apgar1':
      nombreCambiado = '1 (Tranquilizante (7 a 10), n (%))';
      break;
      case 'apgar2':
      nombreCambiado = '2 (Moderado (4 a 6), n (%))';
      break;
      case 'apgar3':
      nombreCambiado = '3 (Bajo (0 a 3), n (%))';
      break;
      default:
      break;
    }
    return nombreCambiado;
  }

  cambiarNombreTipoParto(cat){
    let nombreCambiado = '';
    switch(cat){
      case 'parto1':
      nombreCambiado = '1 (Parto vaginal eutocico)';
      break;
      case 'parto2':
      nombreCambiado = '2 (Parto distoco vaginal)';
      break;
      case 'parto3':
      nombreCambiado = '3 (Cesárea electiva)';
      break;
      default:
      break;
    }
    return nombreCambiado;
  }

  cambiarNombreComorbilidad(cat){
    let nombreCambiado = '';
    switch(cat){
      case 'comor1':
      nombreCambiado = '1 (Trastornos relacionados con la asfixia)';
      break;
      case 'comor2':
      nombreCambiado = '2 (Malformaciones)';
      break;
      case 'comor3':
      nombreCambiado = '3 (Enfermedades relacionadas con la prematuridad)';
      break;
      case 'comor4':
      nombreCambiado = '4 (Enfermedades infecciosas)';
      break;
      case 'comor5':
      nombreCambiado = '5 (Cualquier otro trastorno no clasificado en categorías anteriores)';
      break;
      case 'comor6':
      nombreCambiado = '6 (Sin comorbilidades todavía)';
      break;
      default:
      break;
    }
    return nombreCambiado;
  }

  addLeadingZero(x, pad){
    let contador = 1;
    let numero = x;
    if(x > 10) {
      while(numero > 11){
        numero = numero - 10;
        contador++;
      }
      x = x - (9 * contador);
    }
    let s = String(x);
    while (s.length < (pad || 2)) {s = "0" + s;}
    return s;
  }

  getNumeroNeonatosCat(cat) {
    let numero = 0;
    for (let neonato of this.neonatos){
      if(neonato.catRiesgo === cat){
        numero = numero + 1;
      }
    }
    return numero;
  }

 


}
