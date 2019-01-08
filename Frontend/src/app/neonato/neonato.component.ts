import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { NeonatoService } from './neonato.service';
import { Neonato } from './neonato.model';
import { AuthService } from '../auth/auth.service';
import { formularioStateTrigger } from './neonato-animations';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-neonato',
  templateUrl: './neonato.component.html',
  styleUrls: ['./neonato.component.css'],
  animations: [
    formularioStateTrigger
  ]
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
  showFormulario = [];
  mensaje = false;
  mostrarInstrucciones = false;
  mostrarFormulario = false;
  mostrarDesc = true;
  @ViewChild('instrucciones') public instrucciones:ElementRef;


  constructor(private dialog: MatDialog, private neonatoService: NeonatoService, private authService: AuthService) { }

  ngOnInit() {
    this.scoreBebeTest = new FormGroup({
      'sexo': new FormControl('masculino'),
      'fechaNacimiento': new FormControl(null , Validators.required),
      'nombreApellido': new FormControl(null, Validators.required),
      'pesoNacimiento': new FormControl(null , Validators.required),
      'edadGestional': new FormControl(null , Validators.required),
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
        this.userID = this.addLeadingZero(this.userID,4)
      }
    );
    
    this.showFormulario[0] = true;
    for(let i = 1; i<10; i++) {
      this.showFormulario[i] = false;
    }
  }

  viewForm(){
    console.log(this.scoreBebeTest);
  }

  continueFormulario(index) {
    this.showFormulario[index] = false;
    this.showFormulario[index + 1] = true;
  }

  returnFormulario(index){
    this.showFormulario[index] = false;
    this.showFormulario[index - 1] = true;
  }

  showInstrucciones(){
    this.mostrarDesc = false;
    this.mostrarInstrucciones = true; 
  }

  showForm(){
    this.mostrarInstrucciones = false;
    this.mostrarFormulario = true;
  }

  addLeadingZero(x, pad){
    let contador = 1;
    let numero = x;
    if(x === undefined) {
      x = 1;
    }
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

  async showTestResult() {
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
    await this.crearNeonato();
    await this.neonatoService.getNeonatoIngresado()
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

  getNombreCentil(centil) {
    let nombreCentil = "";
    switch(centil){
      case 'centil1':
      nombreCentil = "percentil entre 5 y 95";
      case 'centil2':
      nombreCentil = "percentil menor a 5";
      case 'centil3':
      nombreCentil = "percentil mayor a 95";
      default:
      break;
    }
    return nombreCentil;
  }

  getNombreParto(parto) {
    let nombreParto = "";
    switch(parto){
      case 'parto1':
      nombreParto = "Cesárea";
      case 'parto2':
      nombreParto = "Parto vaginal eutocico";
      case 'parto3':
      nombreParto = "Parto distoco vaginal";
      default:
      break;
    }
    return nombreParto;
  }

  getApgar(apgar) {
    let nombreApgar = "";
    switch(apgar){
      case 'apgar1':
      nombreApgar = "Tranquilizante (7 a 10), n (%)";
      case 'apgar2':
      nombreApgar = "Moderado (4 a 6), n (%)";
      case 'apgar3':
      nombreApgar = "Bajo (0 a 3), n (%)";
      default:
      break;
    }
    return nombreApgar;
  }

  getComorbilidad(comorbilidad) {
    let nombreComorbilidad = "";
    switch(comorbilidad){
      case 'comor1':
      nombreComorbilidad = "Trastornos relacionados con la asfixia";
      case 'comor2':
      nombreComorbilidad = "Malformaciones";
      case 'comor3':
      nombreComorbilidad = "Enfermedades relacionadas con la prematuridad";
      case 'comor4':
      nombreComorbilidad = "Enfermedades infecciosas";
      case 'comor5':
      nombreComorbilidad = "Cualquier otro trastorno no clasificado en categorías anteriores";
      case 'comor6':
      nombreComorbilidad = "(Sin comorbilidades todavía)";
      default:
      break;
    }
    return nombreComorbilidad;
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
    this.neonatoID = this.addLeadingZero(this.neonatoID, 4);
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '200px';
    dialogConfig.width = '400px';
    dialogConfig.data = {
      categoria: this.categoria,
      id: this.neonatoID,
      puntaje: this.total,
      nombreApellido: this.scoreBebeTest.get('nombreApellido').value,
      riesgo: this.getNivelRiesgo(this.categoria),
      fechaNacimiento: this.scoreBebeTest.get('fechaNacimiento').value,
      edadGestional: this.scoreBebeTest.get('edadGestional').value,
      pesoNacimiento: this.scoreBebeTest.get('pesoNacimiento').value,
      centil: this.getNombreCentil(this.scoreBebeTest.get('centil').value),
      parto: this.getNombreParto(this.scoreBebeTest.get('parto').value),
      apgar: this.getApgar(this.scoreBebeTest.get('apgar').value),
      comor: this.getComorbilidad(this.scoreBebeTest.get('comor').value),
      factorRiesgoInminente: this.scoreBebeTest.get('factorRiesgoInminente').value,
      factorRiesgoIncrementa: this.scoreBebeTest.get('factorRiesgoIncrementa').value,
      factorRiesgoReduce: this.scoreBebeTest.get('factorRiesgoReduce').value,
      nivelAtencion: this.scoreBebeTest.get('nivelAtencion').value,
    }
    this.dialog.open(CourseDialogComponent, dialogConfig);
  }

  getNivelRiesgo(categoria){
    let nivelRiesgo = "";
    switch(categoria) {
      case 'A':
      nivelRiesgo = 'muy alto';
      break;
      case 'B':
      nivelRiesgo = 'alto';
      break;
      case 'C':
      nivelRiesgo = 'moderado';
      break;
      case 'D':
      nivelRiesgo = 'bajo';
      break;
      default:
      break;
    }
    return nivelRiesgo;
  }

  crearNeonato() {
    this.neonato = {
      nombreApellido: this.scoreBebeTest.get('nombreApellido').value,  
      fechaCalculo: this.getCurrentDate(),
      sexo: this.scoreBebeTest.get('sexo').value,
      fechaNacimiento: this.scoreBebeTest.get('fechaNacimiento').value,
      edadGestional: this.scoreBebeTest.get('edadGestional').value,
      nivelAtencion: this.scoreBebeTest.get('nivelAtencion').value,
      factorRiesgoInminente: this.scoreBebeTest.get('factorRiesgoInminente').value,
      factorRiesgoAumenta: this.scoreBebeTest.get('factorRiesgoIncrementa').value,
      factorRiesgoReduce: this.scoreBebeTest.get('factorRiesgoReduce').value,
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
