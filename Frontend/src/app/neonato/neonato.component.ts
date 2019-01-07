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
        this.userID = this.addLeadingZero(this.userID,8)
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
    this.neonatoID = this.addLeadingZero(this.neonatoID, 8);
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '200px';
    dialogConfig.width = '400px';
    dialogConfig.data = {
      categoria: this.categoria,
      id: this.neonatoID,
      puntaje: this.total,
      nombreApellido: this.scoreBebeTest.get('nombreApellido').value,
      riesgo: this.getNivelRiesgo(this.categoria)
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

  crearPDF() {
    let doc = new jsPDF();
    console.log('hola');
    let imgHeaderData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA2YAAABvCAYAAACHMtOrAAAAAXNSR0IArs4'+
                        'c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAMHHSURBVHhe7J0FgBVV+8alTGw/E7u7' +
                        'Oz67/ewWlFAMLEywW2lERFAQEFC6OxZ2Ybu7u7sT7vN/njN3du8uiwIu/hXnWV7u3JlzzpyZOzP3/O57znv2gCNHj' +
                        'hw5cuTIkSNHjhz9beXysN1XDpg5cuTIkSNHjhw5cuTobysLyRwwc+TIkSNHjhw5cuTIkaO/XC5yWH1DEwpKqlBQWsX3W7' +
                        'TW2rgbygEzR44cOXLkyJEjqiN/j992We1v2XZ6R47+vdq8ZQuy8koxbUkQpi8LQn1jE9fuvneLA2aOHDly5MiRo91OarY1ul' +
                        'yo2LwFxY2bm62oia80ra/fYnWOssW3qOV/5U1bUMbt1WwUbtZP9m5pqYHvK7mtlKYyGtqUYaep4jaVUbp5M8r5qrKauN4zra0tX' +
                        'F/HclSeyi3l/pWnts3+HTn6t2kz74Ok9AIMn7QGIyavRV19o3vL7ikHzBw5cuTIkSNHu50EQSm1DZiRX4ZhaYW0Agw1VogRmUWYlFM' +
                        'Gr9JqZLGhJ4BTB6kygpt3WQ0mZJfiB9qy4koUNugXekuCsISaevxaUI7vskswNa8UoZW1BLwtBrhUTi7Tq4xp3O/YnBJ8m12M8TmlmF' +
                        'NQgaCKGhQ0Npm6Sfq/jnlTWc/lJZWYlFtqyh3LfU/k8uKiSkRW1aOMINmcQ3mtN44c7fYSmCVnFGDEz2swcuo61Hrcj7ujHDBz5MiRI0' +
                        'eOHO12qmWDbnFhJW70S8Ihi0NoQbRgWigOXRqKHisjcdWmBHycnI/oqjrUEJBiq+vwWkwWt0UYezQkFb6EKXtUSwUBaQYh63KfOByxLBRnekXj05Q8FBO2' +
                        'lF/lfJ1aiCt9E3H8mkgcsSIc/1kehqP4esraaNwamIwh6YWIJdzJWycP2abyarwRn4PzvWNxzKoIHL6CtjwcR3P/Z6yPxf3h6ZhCAMxjg3SzxtcYM4foyNFuL' +
                        'F3kLjQJzNILMNIDzHbny98BM0eOHDly5MjRbqcaNujm5Zfj4g2x2GO2H/aY5UvzQydj/thjph+6zPbHCYSmt+KyEUmoCq6oRc+QFHSd44c9meemjXFYU1qJLYQh' +
                        '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' +
                        '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' +
                        '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' + 
                        'fUfGTDsoFjCaNbna+2+2zHdP6P9weWlVoNPUd/Tg6YWWrkpaRgCwrG0D+mCOf6ZeFgb3mhsnCEdxaO98nCSbQTaIqo2Gx677bj3HasTzZ60LSs+cquJiR9l14JjTlT419wJk9SVm2jmYD52oAcU+6JbvMsc1umfci0fBTrJ8/ZYbRz/bLN2CsFFlH5Fgi1/KnhIyhR5MAF+dZ4J0WAlPdOINK6qd+yrP+VV/e8vDZaY2/VbagxTj+kl2NOTqXxmuk4Nd5N48zCKhrMPtU1UGPP6g3pyKz/rSXJftdSX0stoNg6tdbJs7fZBCVRAA0F8VAdt/6zvHZ5BMWFBOL1hGR5rex9aVn103xsi2gKxKFukxuKFUjDE/bs/bd9Z62xliR7u+c6T9nrLROoK5iHAngo+qL1bG1rkntZn4H7c5DZS/b7FpPavnf0T5c8ZisjMnDjB3PR6U5N1Cyo8jBBVisbhn0f+BZ3fr4Ic4PTsCQ03XjEBGCdCWad7HTKKzC7l2D2pQ1mmzE5pxRnriWYzdxkQZWBMsFXADrJ87UoGF2Xh6LbinB0WRGBvdZEYq9loeg0P5AWZMFaKyiT+RPM/LE/0wjMAtn4M/cZ71NHjjpWvK4aq9CYuRqVKx5B2W8XomzWxbRLUDaTrzMvase03r19Vtv17nUqY/alKGc55b+di7JpJ6Lsl2Npx6G8XTvevGp7GZdLph6PiDFnYDDB7PhTnsQhx/fEYSf0wqkXvYQnBozBiImLMGjIDFxz7wf4z8nPmO2HHCfr5Tbr/aG0w7n9glvexksf/4wPhv2Kmx/8GEcw/aG048/tj3ufGYqRE5fgh+mr8MOMVRjnNi1r3fjpK92m9yutdL964YeZ3pg0Z5MJ2V9YXGH9KLuT6liPmQfY7OUFPE4YS6q1Ii0qoMfbqcClQQQ2b3cURKXdAdhoNnceAdq5IcBPhVZEx507DdZ8akMyLHBsd387YfKYXRLhgo8bzFr+Wr76W9e39RY9eNeXu3ApAbQ5IEibffyeCebUFfTnfBcqPRp4jnZODpi1vkIF+wpGobFCVwXm4kTC11MRhfiajf6RqWUYbqy8lWnCYZl5n8JlmpZH0hTeXGOhNBZJXc8UCGNtcY151XuNOVtaUM10VtmjmHek21ROc7luU5lap8APmjdM9mxkIc7YlI2bgnPNnGOqv47DuitbJLDSNkWYfIXw2SuqyEx4rEm0p2RVmnFcyqOrwEIWS1qn8hTsIq5KHh1581ukcjVeaizPmcBI0ClT6PwRaRXmNbm60Uw4LYDSRN32s73tviSrDlbtW8zznSWTjgXJM/cjAVMREgXW6qaoHWgfJgf/Y/X57BFANuFH1lMRJ9X90C5DYKmpCW7mZ/5IeAGeIdw+zfI+SSpDaHmDuwujVV4LJlp/7r24rUX2GnOMXGjeajZ45OZ/8jIqbP47CcWEwioDtmabe7vMvDF5+Odeqb+W+jRvdW+30m99hh3909VAWNqYkIt7v16CzvcQzIzXyw1WbhCzzPKU7fO/kTj26QnoP24tQjOKEJNdgnem+uCc5yfjlGd+xFFPjMM+9422AO12ghmX//flEgSltAUzt3dMUDUvEHsuCcH+KyNwsFc0TvVNxBlByTg+MBmXhKXhbP8kHMj13ddGY8+lodiD6feYY+W1jFDH1wMXBOFJ5gurqDX3onXBuw/UkaOOEK+phtpqpIWvx6Jhz2DKwGsw5c3r3PZfj2XLJpvXa41N5bJM6+1X235h3l/e+i+m0n4eeC3Gv3INfnj5Kow3djUmeNorsmu4fA23tdjYl67Dl8/ehDcfvxmvPUZ7/Ba8ThvY6za82fcO2p1485k78PoT2uZO47bXZSY9tz91N97ocy/eeu4BvNH3Xua/G68/eSdee/IO2p14vdc9XH+fZf1a7M1+99P0ei/3JbsPA7nutRf7YsCgEXjx018x8Os5+HHGBmRkF1vfLTupjveYEQgEBSf4A7MITNXuho+qWNzoMh6clxOB0wKsSIRmXJdgQuBhw8e2lm2z19EEQBdHAJsqrF/zd0zKYI0nGZEFHEWQabWfHTGPOpl6cZ3GrfmoXvq+3w61nCkLzDZWuHB5kKsFYnfEWId9+Xl8lgnkN1pH6mjn5YDZ1tI1mkqQUATAi/2y8TmhTOHiNamzwqIn1vCVluR+lRdI6xMILQIfBbtQOHp1FZQZUOGrvFQKkX4TG/+KmBdeaUUEVCNc6ao2a4ySQs1vNgBh9mXKtspvWbYmmFYAixiWMZpAd3VADgayzETu3/Jo2bLuO4FBHsFL0fz6EeTGE04iKxrMPFkKOiEok8dM3Q4V6EJBPgST9lgueROn5lQStMrhU1pnwuWr3tqmboR+XKfgHTYU6rg2cp0Cn8gTZELkVzYQ7uRNs2BIx6p9KLKkpieQJ01jbBW9UiAnEFQ+2+vXfLfzReOy1OVP50mwqLD0L/HzWl5YY+qlc656qT7yVJoxaywnnfubyLQCOAGdSlRddLxvxJbgRQKZ5v1KYj6d80yWr3OgNAI+hfBXvbRfgZ3WVZnP2Xq2KZ3Oo7qH6tzIE6bjUfk6dtVZ9dB+9aoIkTrfCuqhedDe52e4gvCqc6T8uhZ0Leo41E1T67QPXU+ql9YpQqe6rKo8nRx9cf6ZL09Hf39pLKjm/eo9ZpWBKANmAjEbztzW5e4ROPyJH3D94NkYMGE9Jq6LRXxeGdKKKjA3OAXfrozCsKXheP7HDTjztRnocr9V1l7ymH2xGIHNYFbS4jETXC0IRLflYTjeJw5XhqbijsgMvJ9WgK+yivE+wW9UbileS8nHQ7HZuC48HccwXeflhDPms6DM9pj54dBFQXguPA3xNfXmJwRHjjpaehzW1NUjMCwRH3zxC3q/MAK9XxrttlEeZq+zrM+LbtMyt8vsbc9w/dMvjMTj/Ybi9sc+w3k3vIkjzuiLw07sRetp7D9c3pYp3RFMc9nFj+LbAdch++cTUTr1eNoJKJ1yPIqnHEc71lgJl0un0n7hNm036ay0ZdPPQNmca1G6+EGULHsKxcufRsmKXihZ+TRKV/WmPYPSlc9w3dMo5npjy23jOmOey0rXB4U+HyIv2Re5haXIL64w3Rkb+f31Z7RLxphpXNSjcUBsjfUlbL4Ezf8WPGXWuzCuwGXGQJ3gC2tsV3twYZsNPO1sM4Eu/FyYVaSxIPZetl9KXcsv8aGZrj/nMbPr6K6ngPFygpkme94eMLNq3lJ/nafpBNvTCbjN8Lojxnrsyc/jLX4umnqgpWRHOyMHzLa+hrSsKIEKk3+ebzZuD8nH4PgSfJFUakKRW6blUgNtn+uV6zT59M8EHkGF7WGR9KoG9DAClAJ9HOSVgQtYriLuqeFtNaJlVrANeW9+zarEVyxT5X7hYdb7UnzBfX2RWIaP2JC/n/XTBNPfpJab+aus4vif/Yziq7pPypulCZrVfbJlYmtLWlJD37u4zoRoV7CSz5MICQQdNfxX8bV/dCEeCs3HO3ElZh41jYcSUEzicXyUUIoP43n8rLciOQo0N5bWmpDvPnwVAKqL4AaWLyASCC7Jr+KxlDBfCaYxnwCkuTyukykEvYCGxTXX0wKsRm6rMsf/KfctoNJcaKsJh4Ifhdcfm16G9xKKzbxfCkWv9Wmsx0+ZlQSzGjO+TiXqnAuc3uJxDeI+4wmQmmBc480sENKYQGsS7h8zyvEBz83X/BwEcII+la0JuBUZUQE3FERG500QmERo/DmjEu+xbM0JN51wq7oLNgVs8qZ+ys/yQx6H5l7TjwGKrKjPQiCrcyFY+yBRURYrDSwK9jQXmkL4axJ0XYeLWY49Obej3V96vsTnluG1iRuw/0NjCVNuGLO7I/J9lztH4KheP6LnmDX42TsBU73jMZ0WmlaIEELdmFWR+Hh2ID6dF4J+P67HGW8QzB781uTd697RuKddMPNF5/mB2HN5OA7dEIdrwtLxNoFsWkE5Aipq4VdZh9Vl1djE5YDKWmwsr8XnBLWLQ1JwxMZY7LsyHJ0XBFlgNsuPYOaLwxcH46WoDKTUNpj7W0/OlqenI0cdo818blZU1yElqwixyXmITck3FpeiZdusdWZZaZK5LLO3J+ciIiEH/pHpWOUbhynz/fD+8Pm4q89oHHvl2+iiCZ6PVJj6bZnGibntqGfQ5ehncPq5j2PMgGtRPd0Ov9+D5h6H9jvj06woj8wz51RrfJv/60DcD9aYuQI/NjoigTICS3l8G0twv2qbzH5vb7PMVZ0GV2Mlz1zH3YsdCmb7EwTkLVPo+ckFCqrBqpq6Wl/s1sPEWqcxVJoEeVwecAMB7SgCWncCmubykrepNWi4A4R4wo/btL8ehJcFxVaZOyLVRTWr438fpgKH/ZkxZp714nuB2aVmjJm6fW1p1bjblkxXG6ZTfRQp8ml+7ge4vZCeZW9l7W3je4HZ2wbMnAf4n5UDZu1LHh/NuXWJXy4uor3Ehv/HbBwLAmSafPpjGRvVH8m0zEb9TDa8NSGxrnfzTKDp+ld4fIXEP8Y7E/sRzDT+TPNYyYtlXcXWn9IWqMFO8BGAaRLkTxLKaWXcH0GMMKZ92qZ6XUQou9Qvz8z/pWh87d2T8k5NzanC8zHFZoJmeVwsWbXU/2rYK4S94Or7zHK8GluEN2jyhK0qrMUALj8aXoAPuV+NxQol/GjC5meiCjEkucya04twpHm15IUTkH1LkPEuqzMh5AcxnyZDTq5uMPOf9YkoIOQVG7iYn1Nt5jZT+H1N1D2Z6z7nOX0hstjMu2a6P7r/NC/cRMLVQ2Yag2KMIWg+GV6IJ2gCSIW812eiunyVUopX4orMuQ8qrzfeOQvM7K6MlodUMP0GP7+nIwoxnce/kse7qqgasVXWNAfyUgrCe7LOX/FVUKjJqQVKo9Mq8H16hfH6qcyJ/Bw+ILgF8PxoIu3fsqowjmkEfeoWq/MroNPE0s9EFuJVngONLdNn2ZvlLydwKcS9xuz153aBpbq6vkww/oHnU+d2HT+n56OLedwFBsw2ldQRCrf+3B3tntLzJaukCp/OCjAesRaPGU2QRtvvvtG47cP5+MkrFl/MD8ZFr/yCq1+fjuGLwzBkWQROeH4y9rp7BPYmhO1590h0Nl42lTEUe903imC2yAPMSk3wj86Eqb3lKfNLxBWEshcS87GypBI+ZVUYTQB7LCYL10ek4wm+js0sxqayGqwurcaX3PZITCbO8k8k1IU1Bw7pTOuxNIT3RjZyGhrN/ejI0a6Svhr1/fhHpmBQag+pZ0bj5s2oq280c4Zl5ZbCPywVk+duwuuf/YYbH/wax573Krof2xddjtTk0DQCVysjfFlGGNOr1rnhrKsBs8fw3csCs+PcsCVrHb2xdURHwZt7WzPECdBOB5Zca0WJjPkOyFkHVCSzMUOIaFK0vHoePOHF3GUy0zKn2cvWX8t2y+yljlCHg9leBJLHY4AoHp9+7bQPo+UALNnv9B2ZVOfCqHwXehJErw0FTiWkHUIgkSdNgNMWOGyTt+xA7vPuWCCC+zMOsx2SGl1bUM6MT8a7sN/6ttEhd8A86iWzPWbry61JaeWVE3C1Z9pWxToU82Qk81ysLAVeSbKiUO7hefye+2hv323W7cNz81EGkOd0ZfzTcsCsfckr41NSi/tCC/BAWL6BEzXQ9Uu1vCjtmxVgQg92/ucuybpG5SH6gLBwnHcWuhPMFDhEc3YJ2LS9ramc9vah/dum7nkrCqtxe0gu7g7JJ0jYUR9VgtRSYqWAgUCgyYnVqFdXubZS+fLiaM41dUOcQsB4PaYIs3It2JxLkNDcWTFVDaa7ntK8Q9iQJ0fzksn7py6FbxCW1vHceRMWxqSr0VbPPI0EMwIGAUbzh73MeghU1P1TX35baAIkAVg8y1eof0HW5zxnP3Cf2r/Oqz4XgZe8doJBAYw8YRNYh2cJNprAeU5+FY+zCN8ThgSa8to9S6hRV0F55Gwws7syGjBjOa+wPtcE5JqJqQcy/6sEulksT90t5/BVXrkZPCfytOn06bmcy+MezWP6nsCkz1hlKo3GJCr4icbjaV4yzUOmoCMC4/cJ2PJMfkPY+pTp4gl9uraWEMjeYx3kWdTxDyNU/kYALOE+VLa6n+qcyfO5rriG8FmC2TwmnTPVx+OSc7SbS/dCYXktvl0SjpP7TrLAzECVZZ1oBzz4LR4ZshQT18eh35hVOOqR73DeC5Px0ewAfExQO7LPj+h0yzfMO9TK72F7Eeq2AjN5zOb4Y5+VEbgqJBXDsoqxsriSzwVNmp+GQ1aEYd/l4TjKOw5HrI7EkSvC8VhoGuYVlGNjOe/l9CJcHJiEzky3x3wFA/FFl9l+OH1lOEakFqDCRHzTRexcyI7+/2S+Z/j9VlVTj7zCckQlZGPtxhj8/JsP3vxsJm56ZAiOJox1U0TEQ5+yoiM2Q5mnR8wNYp5mYK0lTVfCmjxm3w24DtUzNBeaB4QZ6PJ437xeQCY4o/1mw5l7vSa2/pU2+xTLi+b7EiHtWyuiZHEoXFUZcDWU8curjgfa+n5r/85rf+3OqsPB7EjCxA95MPNn6YOzsaxFngdgL7MxxbR5DUBgFTAln2BCgL0uEjgj0IWjNrlwsLflPTqA+ziQr4fy/SkBwFOEudVlbHzxG7ftnrZHypHGc38FIcpAYFvA2UmT1+/MIGBophX6fnGxDO3agiJeIwUuDM1x4ZlE4KJgt/dRZdn12QZ8bau+8iQe6gNMyAW/MFrOuKOdkwNm7UtnQp6J1+KKTdREAYfpdmht3m4JJARseXWb8UGCBWb7eWXiWILZl2yYq+uh0qiRr7Kte922bYtZCHWb8VVqOS7YlI2X2OAXMHl66jylhv80NuIVcVLd+NQ1r0XWD02CxF9yqvAaG/+a1PplgsjT4fnNXsB5BIZxhBB1sVOwCnneFDBD3QflgRMULuPy6wQaQZy6+H1HmPApqzV1G5RUhpHMv7CgGv1Yjx8ISFWECu1ff+r+qDyfs8xBBK8PWIc+UQVmXJu6U+q5K6DcwDTvxMo7WWXqUc2G4zTC44uEqZk8xkkEo97yRLH+HyQU43Wu1+eowCNx1Y34KasKC3kOBKvat9WVsQFvcJ+vRBcbmFNXwZSaBhQ2aGJrQpEBzhIzobXSW2cNZuydwExeQqVTmQKzLwlVG3ncawjL8t69wf2rzo8Q9HVcy3kO5OmaxHOgbrPqAin4V7dGAZzOqYLNaLJzHbOOU/XXROb6HNYIOAmeGr+nudJa1N6n72h3ky7BCl6fMzcm4vLXZrR4u+4kZLnhbO97R+Kad37DqOUR+GldLF74fh2e/XY1flwXQ4vFDe/PRY8nx2P/+75FZxPZ0crXLphlE8zWRaHLwkC2U2JxfWQGJhLI/MurMSA6E4cuCUG3RcE4wiceF0Sk4zS/BHRbEoyDFofgwZAU/Jpfjm8JdzdFZqK7Tyw6LwsxY9W60S5aH4Nf8srMD0OOHO1qtfeE1HdLI69zhYTPKShDeGwG5q0IwaejFuHR/t/j4ps/xDFnv4J9evRDp/8QxGQKU9/s/dL7XmYiaMHWnsf0Reej+3B7W2uBMlkXA2ZPWB6zGW6PWXM3RYGY+72nmfVMaya1FpC5Ic2YtgvYbOP22acCi64A1j0MBA0CEicDeWxEVxJuNHG25nUzkVB3/f3XoWB2IGHpRsJUCOGq9UD07T8QpZQXqbARCKvmeSoh3BD0BmYA/Qlr/Qgu/VOAtwk8vxB4kmo1gJ75TCNg+/djS2O5FnMfpxPydmos1++YuhIe6Qscz7JP+B1TWPtj/ICDNZ3AOjeQ2WbDl6e1t80zD63TKqAHy1xE8NP5cfTn5IBZ+9Idp8AME9ggv9o/By+wkR9V0WC8O9q6PXelvFrZBAqNGdM4KXUBPNYnE/t6peMEgpk8JgIOmQDNMxLftmS260uEaQPL6vFYRCHO3piN0YQXM2eZlcxdjl2aFWBEHi6NMfsqpcwEkxBgWOWpW7ILfmXygBVjSFoZ1hMINL5roDxmBDPNRzY3r8p0uYuttELrryR0KIiJuuTJe6cgGPJWCUI0/kllfGvArM4NZqUGzBSgQ2A2lPsRzKgO4sQsngNFntSYquUscx3hROPcNFZMkGyOmyYYeSu2GJOzKkzXQXnu1U3zBcKpPFzTuPwuIUvj1vyZNoj712cnkDVdGQlmC1i/tmD2No/9g/hSpBHKjBeP62UKQGK8jSxfXjw1IFVnXQoaq6dzP5bnRWBbzrRTWb66oS7iudBnLmgWbC0nDL7Oen1EQF3J/X+ZXGo8kMon8NK4NHnB5DHzIngpwueKwloTEEVeOnn83uS5UfRGeT0FZptK68115ujfp9qGJqyKzMIdH89Ht7tGusFqSDNgdbpzGA559Dvc+uE8fD0vGDM2JmBRSDrC0osQmlaEKd4J+GROkAny8Z/H3XOaufMaMPuyDZh5RWPPZaE4OSgFzybnYUFxBSbnluEC3wTstyIMB3H7GaFpuDo6C+eGp+KwTXE4YE0Uzt0Yj+HphVhWUoX+iXk4MTAJe64MM3Od7T0/ELf6J2FteY37RyXnWnb010nXnLopKrhFSHQ6Zi4OxHvfzMX9vUfhvP8OxiGnvoA9CVCd5BXT3GHuOcOMyUOmV27rfMTThLa+OPrcASbfGdcNxj4n9bfSGAjjq6BMcOYJZlxnxpjZYGbPgWYAq625vWKzTgAWXgSsuss9sfXZXM+88pbJ7PSCMplZFqQp74nAgvOB1fcAAW8C8ROB3A1s7KSyMVjJ79gd//F5R9RhYNaPYHY0AeOHDvTQqAw1RBrYDq6mqVyNW9OrAn2YL35eMH9GKm8g634IobIt3HSY/R7wdQQMtgNnmmD6SkKyf5XVoHL05+SA2bal+1Dd8e4LzTdeM4FKGRvelnTtucHGvG8tbVG3NnmbZmVXmQiI6sp4jE8WwSzDzFv2dUqpmZR5KRvwCoRRYMaHmczbLFfSekUHVPCQi32zcUtQrmnUGy9Yu5kU3l6h+RsxjjD0dFg+vmOjXvN2pdU2GO+QwHE1y5A35xcep8L5C8TeIABZYNaEWQSDzwgc8ubk1DYZMHw/odR0y' + 
                        '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' + 
                        '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' + 
                        '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'
    doc.setFontSize(24);
    doc.addImage(imgHeaderData, 'png', 15, 10, 180, 20);
    doc.text("Informe Neonato", 75, 50);
    doc.setFontSize(11);
    doc.text("Neonato "+this.scoreBebeTest.get('nombreApellido').value+" nacido el "+this.scoreBebeTest.get('fechaNacimiento').value+", de "+this.scoreBebeTest.get('edadGestional').value+" semanas de edad gestacional, con un peso de "+this.scoreBebeTest.get("pesoNacimiento").value+" gramos,",15,70);
    doc.text("lo que equivale a un "+this.getNombreCentil(this.scoreBebeTest.get('centil').value)+" de peso para la edad gestacional.",15,75);
    doc.text("- Nace por "+this.getNombreParto(this.scoreBebeTest.get("parto").value), 15,85);
    doc.text("- Con un apgar "+this.getApgar(this.scoreBebeTest.get("apgar").value)+" a los 5 minutos", 15,90);
    doc.text("- Y desarrolla la siguiente comorbilidad: "+this.getComorbilidad(this.scoreBebeTest.get("comor").value), 15,95);
    doc.text("- Le corresponde una categoría de riesgo "+this.categoria+" lo que quiere decir riesgo "+this.getNivelRiesgo(this.categoria)+" de eventos adversos",15,100);
    doc.text("neonatales.",15,105);
    doc.setFontStyle("bold");
    doc.text("Intervención",15,115);
    doc.setFontStyle("normal");
    if(this.scoreBebeTest.get('factorRiesgoInminente').value || this.scoreBebeTest.get('factorRiesgoIncrementa').value || this.scoreBebeTest.get('factorRiesgoReduce').value){
      doc.text("Debe estabilizar inmediatamente y/o activar la gestión de la transferencia, conforme su nivel de atención",15,120);
      doc.text("("+this.scoreBebeTest.get("nivelAtencion").value+").",15,125);
    } else {
      doc.text("No tiene factores de riesgo, y en vista de que Usted se encuentra en el nivel "+this.scoreBebeTest.get("nivelAtencion").value+" le corresponde:",15,120);
      switch(this.categoria) {
        case 'A':
        if(this.scoreBebeTest.get('nivelAtencion').value === 'primero' || this.scoreBebeTest.get('nivelAtencion').value === 'segundo') {
          doc.text("A: primer nivel o segundo nivel: estabilización utilizando las normas del MSP y transferencia a cuidados ",15,125);
          doc.text("intensivos neonatales",15,130)
        } else {
          doc.text("A: tercer nivel: ingreso a cuidados intensivos neonatales",15,125);
        }
        break;
        case 'B':
        if(this.scoreBebeTest.get('nivelAtencion').value === 'primero'){
          doc.text("B: primer nivel: transferencia al siguiente nivel de atención acompañado por médico especialista ",15,125);
          doc.text("en transporte neonatal",15,130);
        }else if(this.scoreBebeTest.get('nivelAtencion').value === 'segundo'){
          doc.text("B: segundo nivel: considerar transferencia al siguiente nivel de atención, acompañado por especialista ",15,125);
          doc.text("en transporte neonatal",15,130);
        }else {
          doc.text("B: tercer nivel: interconsulta a neonatología y considerar ingreso a cuidados intensivos neonatales",15,125);
        }
        break;
        case 'C':
        if(this.scoreBebeTest.get('nivelAtencion').value === 'primero'){
          doc.text("C: primer nivel: signos vitales conforme la norma, está estable y ha cumplido al menos 48 horas de vida,",15,125);
          doc.text(" brinde alta de calidad y control en 3 días",15,130);
        }else if(this.scoreBebeTest.get('nivelAtencion').value === 'segundo'){
          doc.text("C: segundo nivel: signos vitales conforme la norma, está estable y ha cumplido al menos 48 horas de vida,",15,125);
          doc.text("brinde alta de calidad y control en 3 días",15,130);
        }else {
          doc.text("C: tercer nivel: signos vitales conforme la norma, está estable y ha cumplido al menos 48 horas de vida,",15,125);  
          doc.text("brinde alta de calidad y control en 3 días",15,130);   
        }
        break;
        case 'D':
        if(this.scoreBebeTest.get('nivelAtencion').value === 'primero'){
          doc.text("D: primer nivel: signos vitales conforme la norma, está estable y ha cumplido al menos 48 horas de vida,",15,125);
          doc.text("brinde alta de calidad y control en 3 días",15,130);
        }else if(this.scoreBebeTest.get('nivelAtencion').value === 'segundo'){
          doc.text("D: segundo nivel: signos vitales conforme la norma, está estable y ha cumplido al menos 48 horas de vida,",15,125);
          doc.text("brinde alta de calidad y control en 3 días",15,130);
        }else {
          doc.text("D: tercer nivel: signos vitales conforme la norma, está estable y ha cumplido al menos 48 horas de vida,",15,125);
          doc.text("brinde alta de calidad y control en 3 días",15,130);          
        }
        break;
        default:
        break;
      }
    }
    doc.save('Informe Neonato '+this.neonatoID+'.pdf');
  }

}
