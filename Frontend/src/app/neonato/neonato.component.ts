import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { NeonatoService } from './neonato.service';
import { Neonato } from './neonato.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-neonato',
  templateUrl: './neonato.component.html',
  styleUrls: ['./neonato.component.css']
})
export class NeonatoComponent implements OnInit {

  scoreBebeTest: FormGroup;

  total = 0;
  categoria = '';
  descripcion = '';
  neonato: Neonato;
  userName = localStorage.getItem('username');
  userID;
  neonatoID;
  @ViewChild('instrucciones') public instrucciones:ElementRef;


  constructor(private dialog: MatDialog, private neonatoService: NeonatoService, private authService: AuthService) { }

  ngOnInit() {
    this.scoreBebeTest = new FormGroup({
      'sexo': new FormControl('masculino'),
      'fechaNacimiento': new FormControl(null),
      'nombreApellido': new FormControl(null, Validators.required),
      'pesoNacimiento': new FormControl(null),
      'edadGestional': new FormControl(null),
      'nivelAtencion': new FormControl('primero'),
      'factorRiesgoInminente': new FormControl(false),
      'factorRiesgoIncrementa': new FormControl(false),
      'factorRiesgoReduce': new FormControl(false),
      'edad': new FormControl('edad1'),
      'peso': new FormControl('peso1'),
      'centil': new FormControl('centil1'),
      'apgar': new FormControl('apgar1'),
      'parto': new FormControl('parto1'),
      'comor': new FormControl ('comor1')
    });
    this.userName = localStorage.getItem('username');

    this.authService.getUserData(this.userName)
    .subscribe(
      (response) => {
        this.userID = response.id;
        this.userID = this.addLeadingZero(this.userID,8)
      }
    );
  }

  viewForm(){
    console.log(this.scoreBebeTest);
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

  moveToStructure():void {
    this.instrucciones.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
}

  showTestResult() {
    let score = 0;

    switch(this.scoreBebeTest.get('edad').value) {
      case 'edad1':
      score = 15;
      this.total = score;
      break;
      case 'edad2':
      score = 13
      this.total = score;
      break;
      case 'edad3':
      score = 12;
      this.total = score;
      break;
      case 'edad4':
      score = 11;
      this.total = score;
      break;
      case 'edad5':
      score = 12;
      this.total = score;
      break;
      case 'edad6':
      score = 14;
      this.total = score;
      break;
      default:
      break;
    }
    switch(this.scoreBebeTest.get('peso').value) {
      case 'peso1':
      score = 15;
      this.total = this.total + (score);
      break;
      case 'peso2':
      score = 12;
      this.total = this.total + (score);
      break;
      case 'peso3':
      score = 12;
      this.total = this.total + (score);
      break;
      case 'peso4':
      score = 11;
      this.total = this.total + (score);
      break;
      case 'peso5':
      score = 11;
      this.total = this.total + (score);
      break;
      case 'peso6':
      score = 12;
      this.total = this.total + (score);
      break;
      default:
      break;
    }

    switch(this.scoreBebeTest.get('centil').value) {
      case 'centil1':
      score = 15;
      this.total = this.total + (score);
      break;
      case 'centil2':
      score = 17;
      this.total = this.total + (score);
      break;
      case 'centil3':
      score = 14;
      this.total = this.total + (score);
      break;
      default:
      break;
    }

    switch(this.scoreBebeTest.get('apgar').value) {
      case 'apgar1':
      score = 15
      this.total = this.total + (score);
      break;
      case 'apgar2':
      score = 19
      this.total = this.total + (score);
      break;
      case 'apgar3':
      score = 35
      this.total = this.total + (score);
      break;
      default:
      break;

    }

    switch(this.scoreBebeTest.get('parto').value) {
      case 'parto1':
      score = 15
      this.total = this.total + (score);
      break;
      case 'parto2':
      score = 15
      this.total = this.total + (score);
      break;
      case 'parto3':
      score = 19
      this.total = this.total + (score);
      break;
      default:
      break;
    }

    switch(this.scoreBebeTest.get('comor').value) {
      case 'comor1':
      score = 15
      this.total = this.total + (score);
      break;
      case 'comor2':
      score = 14
      this.total = this.total + (score);
      break;
      case 'comor3':
      score = 13
      this.total = this.total + (score);
      break;
      case 'comor4':
      score = 9
      this.total = this.total + (score);
      break;
      case 'comor5':
      score = 11
      this.total = this.total + (score);
      break;
      case 'comor6':
      score = 0
      this.total = this.total + (score);
      break;
      default:
      break;
    }

    if (this.total >= 77) {
      this.categoria = 'A';
      this.descripcion = 'Riesgo muy alto'
    } else if(this.total >= 72) {
      this.categoria = 'B';
      this.descripcion = 'Riesgo alto'
    } else if (this.total >= 64) {
      this.categoria = 'C';
      this.descripcion = 'Riesgo moderado'
    } else {
      this.categoria = 'D';
      this.descripcion = 'Riesgo bajo'
    }
    this.crearNeonato();
    this.neonatoService.getNeonatoIngresado()
    .subscribe((
      response => {
        console.log(response);
        this.neonatoID = response.id;
      }
    ));
    setTimeout(
      () => {
        this.openDialog();
      }, 1000);
    
    
  }

  getCurrentDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();

    if(dd<10) { 
      let ddstring = dd.toString();
      ddstring = '0'+ dd.toString();
    } 

    if(mm<10) {
      let mmstring = mm.toString();
      mmstring = '0'+ mm.toString();
    } 

    let todaystring = today.toString();
    todaystring  = dd + '/' + mm + '/' + yyyy;
    return todaystring;
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    this.neonatoID = this.addLeadingZero(this.neonatoID, 8);
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '200px';
    dialogConfig.width = '400px';
    dialogConfig.data = {
      categoria: this.categoria,
      id: this.neonatoID,
      puntaje: this.total
    }
    this.dialog.open(CourseDialogComponent, dialogConfig);
  }

  crearNeonato() {
    this.neonato = {
      nombreApellido: this.scoreBebeTest.get('nombreApellido').value,  
      fechaCalculo: this.getCurrentDate(),
      sexo: this.scoreBebeTest.get('sexo').value,
      fechaNacimiento: this.scoreBebeTest.get('fechaNacimiento').value,
      edadGestional: this.scoreBebeTest.get('edadGestional').value,
      nivelAtencion: this.scoreBebeTest.get('nivelAtencion').value,
      factoresRiesgo: this.scoreBebeTest.get('factorRiesgoInminente').value,
      peso: this.scoreBebeTest.get('pesoNacimiento').value,
      catEdadGestional: this.scoreBebeTest.get('edad').value,
      catPeso: this.scoreBebeTest.get('peso').value,
      catPesoEdadGestional: this.scoreBebeTest.get('centil').value,
      catApgar: this.scoreBebeTest.get('apgar').value,
      catTipoParto: this.scoreBebeTest.get('parto').value,
      catComorbilidades: this.scoreBebeTest.get('comor').value,
      scoreTotal: this.total,
      catRiesgo: this.categoria,
      ID_USUARIO: this.userID
    }

    this.neonatoService.addNeonato(this.neonato).subscribe(
      (response) => {
      console.log(response);
    });
  }

}
