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
      'nombreApellido': new FormControl(null, Validators.required),
      'fechaCalculo': new FormControl(this.getCurrentDate()),
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
    const coeficiente = 3;

    switch(this.scoreBebeTest.get('edad').value) {
      case 'edad1':
      score = 1.0;
      this.total = score * coeficiente;
      break;
      case 'edad2':
      score = 0.86993
      this.total = score * coeficiente;
      break;
      case 'edad3':
      score = 0.82705;
      this.total = score * coeficiente;
      break;
      case 'edad4':
      score = 0.76828;
      this.total = score * coeficiente;
      break;
      case 'edad5':
      score = 0.78451;
      this.total = score * coeficiente;
      break;
      case 'edad6':
      score = 0.93737;
      this.total = score * coeficiente;
      break;
      default:
      break;
    }
    switch(this.scoreBebeTest.get('peso').value) {
      case 'peso1':
      score = 1.0;
      this.total = this.total + (score * coeficiente);
      break;
      case 'peso2':
      score = 0.82946;
      this.total = this.total + (score * coeficiente);
      break;
      case 'peso3':
      score = 0.78473;
      this.total = this.total + (score * coeficiente);
      break;
      case 'peso4':
      score = 0.87666;
      this.total = this.total + (score * coeficiente);
      break;
      case 'peso5':
      score = 0.91240;
      this.total = this.total + (score * coeficiente);
      break;
      case 'peso6':
      score = 0.79316;
      this.total = this.total + (score * coeficiente);
      break;
      default:
      break;
    }

    switch(this.scoreBebeTest.get('centil').value) {
      case 'centil1':
      score = 1.0;
      this.total = this.total + (score * coeficiente);
      break;
      case 'centil2':
      score = 1.11808;
      this.total = this.total + (score * coeficiente);
      break;
      case 'centil3':
      score = 0.95414;
      this.total = this.total + (score * coeficiente);
      break;
      default:
      break;
    }

    switch(this.scoreBebeTest.get('apgar').value) {
      case 'apgar1':
      score = 1.0
      this.total = this.total + (score * coeficiente);
      break;
      case 'apgar2':
      score = 1.24861
      this.total = this.total + (score * coeficiente);
      break;
      case 'apgar3':
      score = 2.30867
      this.total = this.total + (score * coeficiente);
      break;
      default:
      break;

    }

    switch(this.scoreBebeTest.get('parto').value) {
      case 'parto1':
      score = 1.0
      this.total = this.total + (score * coeficiente);
      break;
      case 'parto2':
      score = 1.13613
      this.total = this.total + (score * coeficiente);
      break;
      case 'parto3':
      score = 0.83775
      this.total = this.total + (score * coeficiente);
      break;
      case 'parto4':
      score = 0.93283
      this.total = this.total + (score * coeficiente);
      break;
      default:
      break;
    }

    switch(this.scoreBebeTest.get('comor').value) {
      case 'comor1':
      score = 1.0
      this.total = this.total + (score * coeficiente);
      break;
      case 'comor2':
      score = 0.92668
      this.total = this.total + (score * coeficiente);
      break;
      case 'comor3':
      score = 0.85989
      this.total = this.total + (score * coeficiente);
      break;
      case 'comor4':
      score = 0.57650
      this.total = this.total + (score * coeficiente);
      break;
      case 'comor5':
      score = 0.74698
      this.total = this.total + (score * coeficiente);
      break;
      case 'comor6':
      score = 0
      this.total = this.total + (score * coeficiente);
      break;
      default:
      break;
    }

    if (this.total >= 15.3) {
      this.categoria = 'A';
      this.descripcion = 'Riesgo muy alto'
    } else if(this.total >= 14.5) {
      this.categoria = 'B';
      this.descripcion = 'Riesgo alto'
    } else if (this.total >= 12.6) {
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
      fechaCalculo: this.scoreBebeTest.get('fechaCalculo').value,
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
