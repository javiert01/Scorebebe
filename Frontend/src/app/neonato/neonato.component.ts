import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDatepicker } from '@angular/material';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { NeonatoService } from './neonato.service';
import { Neonato } from './neonato.model';
import { AuthService } from '../auth/auth.service';
import { formularioStateTrigger } from './neonato-animations';
import { DialogCie10Component } from '../dialog-cie10/dialog-cie10.component';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { ErrorCodigosDialogComponent } from '../error-codigos-dialog/error-codigos-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-neonato',
  templateUrl: './neonato.component.html',
  styleUrls: ['./neonato.component.css'],
  animations: [
    formularioStateTrigger
  ],
  encapsulation: ViewEncapsulation.None,
})
export class NeonatoComponent implements OnInit {

  scoreBebeTest: FormGroup;
  mensaje_err;
  contador = 0;
  showDownes = true;
  showSilverman = false;
  mostrarCuadros = false;
  isMobileView;
  categoriaEdad;
  categoriaPeso;
  edadGestionalTotal;
  currentQuestionIndex = 1;
  factoresRiesgoInminente = [
    {id: 'factorRiesgoInminente1',
    idbase: 1,
    value: 'El niño respira débilmente o tiene dificultad respiratoria severa' +
    '(utilizar la escala de Silverman o Downes según la referencia)',
    tipo: 'checkbox'},
    {id: 'factorRiesgoInminente2',
    idbase: [11, 21],
    value: 'Porcentaje de saturación',
    opciones: ['Menor a 92%', 'Mayor a 92%'],
    tipo: 'radio'},
    {id: 'factorRiesgoInminente3',
     idbase: 31,
     value: 'Tiene alguna alteración de su frecuencia respiratoria (<40 o >60 rpm)',
     tipo: 'checkbox'},
    {id: 'factorRiesgoInminente4',
    idbase: 41,
    value: 'Tiene alguna alteración de su temperatura rectal (<36.6 o >38 °C) o temperatura axilar (<36.0 o >37.5 °C)',
    tipo: 'checkbox'},
    {id: 'factorRiesgoInminente5',
    idbase: [51],
    value: 'Se encuentra hipotónico:',
    opciones: ['Presencia de convulsiones'],
    tipo: 'checkbox'},
    {id: 'factorRiesgoInminente6',
    idbase: 61,
    value: 'Se encuentra ictérico antes de las 24 horas o después del cuarto día de vida.',
    tipo: 'checkbox'},
    {id: 'factorRiesgoInminente7',
    idbase: 71,
    value: 'Hipoglucemia (<50mg/dL)',
    tipo: 'checkbox'},
    {id: 'factorRiesgoInminente8',
    idbase: 81,
    value: 'Tiene succión débil',
    tipo: 'checkbox'},
    {id: 'factorRiesgoInminente9',
     idbase: 91,
     value: 'Madre tuvo hidrorrea mayor a 18 horas',
     tipo: 'checkbox'},
    {id: 'factorRiesgoInminente10',
     idbase: 101,
     value: 'Fue necesario reanimación básica o avanzada',
     tipo: 'checkbox'},
    { id: 'factorRiesgoInminente11',
      idbase: 111,
      value: 'Malformaciones severas',
      tipo: 'checkbox'},
    { id: 'factorRiesgoInminente12',
      idbase: 121,
      value: 'Lesiones severas debidas al parto',
      tipo: 'checkbox'}

  ];
  factoresRiesgoAumenta = [
    {id: 'factorRiesgoAumenta1' , idbase: 1, value: 'Madre tuvo polihidramnios'},
    {id: 'factorRiesgoAumenta2' , idbase: 11, value: 'Madre diabética'},
    {id: 'factorRiesgoAumenta3' , idbase: 21, value: 'Madre con trastornos hipertensivos'},
    {id: 'factorRiesgoAumenta4' , idbase: 31, value: 'Madre fallece posterior al parto'},
    {id: 'factorRiesgoAumenta5' , idbase: 41, value: 'Madre tuvo IVU en el embarazo'},
    {id: 'factorRiesgoAumenta6' , idbase: 51, value: 'Madre tuvo cultivo positivo para Streptococcus'},
    {id: 'factorRiesgoAumenta7' ,
    idbase: [61, 71],
    value: 'Edad de la madre:',
    opciones: ['Menor de 15 años', 'Mayor de 40 años'],
    tipo: 'radio'},
    {id: 'factorRiesgoAumenta8' ,
    idbase: [81, 91],
    value: 'Madre con adicciones:',
    opciones: ['Alcohol', 'Cocaína'],
    tipo: 'checkbox'},
    {id: 'factorRiesgoAumenta9' , idbase: 101, value: 'Niño de sexo masculino'},
    {id: 'factorRiesgoAumenta10' ,
    idbase: 111,
    // tslint:disable-next-line: max-line-length
    value: 'Madre con riesgo social (analfabetismo, adicciones, violencia doméstica, vivienda muy lejana a un establecimiento de salud, etc.)'},
    {id: 'factorRiesgoAumenta11' ,
    idbase: [121, 131, 141, 151],
    value: 'Madre presenta:',
    opciones: ['VIH', 'Sífilis', 'Tuberculosis', 'Discapacidades'],
    tipo: 'checkbox'
    },
    {id: 'factorRiesgoAumenta12' , idbase: 161, value: 'Parto en domicilio o por personal no entrenado'},
    {id: 'factorRiesgoAumenta13' , idbase: 171, value: 'Ningún control prenatal'},
    {id: 'factorRiesgoAumenta15' , idbase: 181, value: 'Es embarazo múltiple'}
  ];
  factoresRiesgoReduce = [
    {id: 'factorRiesgoReduce1', idbase: 1, value: 'Es prematuro y recibió dosis completa de maduración pulmonar'},
    {id: 'factorRiesgoReduce2',
     idbase: 11,
     value: 'Es prematuro, pero recibió tratamiento de uteroinhibición hasta alcanzar maduración pulmonar'}
    // tslint:disable-next-line: max-line-length
    // {id: 'factorRiesgoReduce3', idbase: 21, value: 'Madre con trastorno hipertensivo del embarazo sí­ recibió antihipertensivo y sulfato de magnesio'}
  ];

  comorbilidades = [
    {id: 'comor1', idbase: 1, value: 'Trastornos relacionados con la asfixia', score: 15},
    {id: 'comor2', idbase: 11, value: 'Malformaciones', score: 14},
    {id: 'comor3', idbase: 21, value: 'Enfermedades relacionadas con la prematuridad', score: 13},
    {id: 'comor4', idbase: 31, value: 'Enfermedades infecciosas', score: 9},
    {id: 'comor5', idbase: 41, value: 'Cualquier otro trastorno no clasificado en categorías anteriores', score: 11}
  ];
  total = 0;
  categoria = '';
  descripcion = '';
  neonato: Neonato;
  userName = localStorage.getItem('username');
  userID;
  nombreUser;
  mailUser;
  neonatoID;
  showFormulario = [];
  mensaje = false;
  mostrarInstrucciones = false;
  mostrarFormulario = false;
  mostrarDesc = true;
  mostrarIntro = true;
  mostrarLogo = true;
  terminado = false;
  formComorbilidades;
  formControlsInminente = [];
  formControlsAumenta = [];
  formControlsReduce;
  formsControlInminenteOpciones = [];
  formsControlAumentaOpciones = [];
  @ViewChild('instrucciones', { static: false }) public instrucciones: ElementRef;
  @ViewChild('picker', {static: false}) picker: MatDatepicker<Date>;

  constructor(private dialog: MatDialog, private neonatoService: NeonatoService,
    public authService: AuthService, private fb: FormBuilder,
    private toastr: ToastrService) {
   }

  ngOnInit() {
    this.formComorbilidades = this.comorbilidades.map(control => new FormControl(false));
    this.formControlsReduce = this.factoresRiesgoReduce.map(control => new FormControl(false));
    let j = 0;
    for (let i = 0; i < this.factoresRiesgoInminente.length; i++) {
      if (this.factoresRiesgoInminente[i].opciones !== undefined) {
        this.formsControlInminenteOpciones.push(this.factoresRiesgoInminente[i].opciones.map(control => new FormControl(false)));
        this.formControlsInminente.push(new FormArray(this.formsControlInminenteOpciones[j]));
        j++;
      } else {
        this.formControlsInminente.push(new FormControl(false));
      }
    }
    j = 0;
    for (let i = 0; i < this.factoresRiesgoAumenta.length; i++) {
      if (this.factoresRiesgoAumenta[i].opciones !== undefined) {
        this.formsControlAumentaOpciones.push(this.factoresRiesgoAumenta[i].opciones.map(control => new FormControl(false)));
        this.formControlsAumenta.push(new FormArray(this.formsControlAumentaOpciones[j]));
        j++;
      } else {
        this.formControlsAumenta.push(new FormControl(false));
      }
    }
    this.scoreBebeTest = this.fb.group({
      'sexo': new FormControl('masculino'),
      'fechaNacimiento': new FormControl(null , Validators.required),
      'horaNacimiento': new FormControl(null, Validators.required),
      'nombreApellido': new FormControl(null, Validators.required),
      'pesoNacimiento': new FormControl(null , Validators.required),
      'edadGestionalEntero': new FormControl(null , [Validators.required, Validators.min(0)]),
      'edadGestionalDecimal': new FormControl(0, Validators.required),
      'nivelAtencion': new FormControl('primer'),
      'factorRiesgoInminente': new FormArray(this.formControlsInminente),
      'factorRiesgoIncrementa': new FormArray(this.formControlsAumenta),
      'factorRiesgoReduce': new FormArray(this.formControlsReduce),
      'centil': new FormControl('centil1'),
      'apgar': new FormControl('apgar1'),
      'parto': new FormControl('parto1'),
      'codigosComor': new FormControl(null),
      'comorbilidades': new FormArray(this.formComorbilidades),
      'comor': new FormControl('')
    });

    console.log(this.scoreBebeTest);

    this.authService.getUserData(this.userName)
    .subscribe(
      (response) => {
        this.userID = response.id;
        //this.userID = this.addLeadingZero(this.userID,4);
        this.nombreUser = response.nombre;
        this.mailUser = response.email;

      }
    );

    this.showFormulario[0] = true;
    for (let i = 1; i < 6; i++) {
      this.showFormulario[i] = false;
    }
    

    this.formData().valueChanges
    .subscribe(
      (data) => {
        console.log(this.formData());
        this.terminado = false;
        for (const value of data) {
          if (Array.isArray(value)) {
            for (let i = 0;  i < value.length; i++) {
              if (value[i]) {
                this.terminado = true;
                break;
              }
            }
          } else {
            if (value) {
              this.terminado = true;
              break;
            }
          }
        }
      }
    );


    this.scoreBebeTest.get('comor').valueChanges
    .subscribe(
      (value) => {
        if (value) {
          const auxArray = [false, false, false, false, false];
          this.comorbilidadData().disable();
          this.comorbilidadData().setValue(auxArray);

        } else {
          this.comorbilidadData().enable();

        }
      }
    );

  }

  onGotoInicioInstr() {
    this.contador++;
    this.mostrarLogo = true;
    this.mostrarDesc = false;
    this.mostrarIntro = false;
    this.mostrarInstrucciones = true;
    this.mostrarFormulario = false;
    this.showFormulario[0] = true;
    for (let i = 1; i < 6; i++) {
      this.showFormulario[i] = false;
    }
    this.scoreBebeTest.reset();
    this.scoreBebeTest.get('sexo').setValue('femenino');
    this.scoreBebeTest.get('nivelAtencion').setValue('primer');
    this.scoreBebeTest.get('centil').setValue('centil1');
    this.scoreBebeTest.get('apgar').setValue('apgar1');
    this.scoreBebeTest.get('parto').setValue('parto1');
  }


  continueFormulario(index) {
    if (this.authService.isTokenExpired()) {
      this.authService.logoutUser();
    } else {
      this.currentQuestionIndex = index + 1;
      this.showFormulario[index] = false;
      this.showFormulario[index + 1] = true;
      window.scroll(0, 0);
    }

  }

  returnFormulario(index) {
    this.currentQuestionIndex = index - 1;
    this.showFormulario[index] = false;
    this.showFormulario[index - 1] = true;
    console.log('valores inminentes seleccionados', this.getFactoresRiesgoInmintente());
    window.scroll(0, 0);
  }

  showIntro() {
    this.mostrarDesc = false;
    this.mostrarIntro = true;

  }

  reiniciarTest() {
    this.scoreBebeTest.reset();
    this.scoreBebeTest.get('sexo').setValue('femenino');
    this.scoreBebeTest.get('nivelAtencion').setValue('primer');
    this.scoreBebeTest.get('centil').setValue('centil1');
    this.scoreBebeTest.get('apgar').setValue('apgar1');
    this.scoreBebeTest.get('parto').setValue('parto1');
    this.scoreBebeTest.get('edadGestionalDecimal').setValue(0);
    this.contador++;
    this.mostrarLogo = false;
    this.mostrarDesc = false;
    this.mostrarIntro = false;
    this.mostrarInstrucciones = false;
    this.mostrarFormulario = true;
    this.showFormulario[0] = true;
    for (let i = 1; i < 6; i++) {
      this.showFormulario[i] = false;
    }
    window.scroll(0, 0);
  }

  showInstrucciones() {
    this.contador++;
    this.mostrarIntro = false;
    this.mostrarFormulario = false;
    this.mostrarLogo = true;
    this.mostrarInstrucciones = true;
  }

  showForm() {
    if (this.authService.isTokenExpired()) {
      this.authService.logoutUser();
    } else {
      this.mostrarLogo = false;
      this.mostrarInstrucciones = false;
      this.mostrarFormulario = true;
      window.scroll(0, 0);
    }
  }

  addLeadingZero(x, pad) {
    let contador = 1;
    let numero = x;
    if (x === undefined) {
      x = 1;
    }
    if (x > 10) {
      while (numero > 11) {
        numero = numero - 10;
        contador++;
      }
      x = x - (9 * contador);
    }
    let s = String(x);
    while (s.length < (pad || 2)) {s = '0' + s; }
    return s;
  }

  moveToStructure(): void {
    this.instrucciones.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
  }

  formData() {
    return <FormArray>this.scoreBebeTest.get('factorRiesgoInminente');
  }

  saturacionData() {
    return <FormArray>this.scoreBebeTest.get('factorRiesgoInminente').get('1');
  }


  comorbilidadData() {
    return <FormArray>this.scoreBebeTest.get('comorbilidades');
  }

  async showTestResult() {
    if (this.authService.isTokenExpired()) {
      this.authService.logoutUser();
    } else {
      let score = 0;
      const decimal = this.scoreBebeTest.get('edadGestionalDecimal').value;
      const entero = this.scoreBebeTest.get('edadGestionalEntero').value;
      const edadIngresadaString = entero + '.' + decimal;
      this.edadGestionalTotal = parseFloat(edadIngresadaString);
      if (this.edadGestionalTotal < 28) {
        this.categoriaEdad = 'edad1';
        score = 17;
        this.total = score;
      } else if (this.edadGestionalTotal >= 28 && this.edadGestionalTotal < 32) {
        this.categoriaEdad = 'edad2';
        score = 16;
        this.total = score;
      } else if (this.edadGestionalTotal >= 32 && this.edadGestionalTotal < 35) {
        this.categoriaEdad = 'edad3';
        score = 15;
        this.total = score;
      } else if (this.edadGestionalTotal >= 35 && this.edadGestionalTotal < 37) {
        this.categoriaEdad = 'edad4';
        score = 14;
        this.total = score;
      } else if (this.edadGestionalTotal >= 37 && this.edadGestionalTotal < 38) {
        this.categoriaEdad = 'edad5';
        score = 11;
        this.total = score;
      } else if (this.edadGestionalTotal >= 38 && this.edadGestionalTotal < 41) {
        this.categoriaEdad = 'edad6';
        score = 11;
        this.total = score;
      } else if (this.edadGestionalTotal >= 41) {
        this.categoriaEdad = 'edad7';
        score = 14;
        this.total = score;
      }

      const pesoIngresado = this.scoreBebeTest.get('pesoNacimiento').value;
      if (pesoIngresado < 750) {
        this.categoriaPeso = 'peso1';
        score = 18;
        this.total = this.total + (score);
      } else if (pesoIngresado >= 750 && pesoIngresado < 1000) {
        this.categoriaPeso = 'peso2';
        score = 17;
        this.total = this.total + (score);
      } else if (pesoIngresado >= 1000 && pesoIngresado < 1500) {
        this.categoriaPeso = 'peso3';
        score = 16;
        this.total = this.total + (score);
      } else if (pesoIngresado >= 1500 && pesoIngresado < 2000) {
        this.categoriaPeso = 'peso4';
        score = 15;
        this.total = this.total + (score);
      } else if (pesoIngresado >= 2000 && pesoIngresado < 2500) {
        this.categoriaPeso = 'peso5';
        score = 14;
        this.total = this.total + (score);
      } else if (pesoIngresado >= 2500 && pesoIngresado < 4000) {
        this.categoriaPeso = 'peso6';
        score = 11;
        this.total = this.total + (score);
      } else if (pesoIngresado > 4000) {
        this.categoriaPeso = 'peso7';
        score = 12;
        this.total = this.total + (score);
      }

      switch (this.scoreBebeTest.get('centil').value) {
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

      switch (this.scoreBebeTest.get('apgar').value) {
        case 'apgar1':
        score = 15;
        this.total = this.total + (score);
        break;
        case 'apgar2':
        score = 19;
        this.total = this.total + (score);
        break;
        case 'apgar3':
        score = 35;
        this.total = this.total + (score);
        break;
        default:
        break;

      }

      switch (this.scoreBebeTest.get('parto').value) {
        case 'parto1':
        score = 15;
        this.total = this.total + (score);
        break;
        case 'parto2':
        score = 15;
        this.total = this.total + (score);
        break;
        case 'parto3':
        score = 19;
        this.total = this.total + (score);
        break;
        default:
        break;
      }

      if (this.scoreBebeTest.get('comor').value) {
        this.total = this.total + 0;
      } else {
        for (let i = 0; i < this.getScoreComorbilidades().length; i++) {
          this.total = this.total + this.getScoreComorbilidades()[i];
        }
      }

      if (this.total >= 77) {
        this.categoria = 'A';
        this.descripcion = 'Riesgo alto (<=77 puntos)';
      } else if (this.total >= 72) {
        this.categoria = 'B';
        this.descripcion = 'Riesgo moderado (72 a <77 puntos)';
      } else if (this.total >= 68) {
        this.categoria = 'C';
        this.descripcion = 'Riesgo bajo (68 a <72 puntos)';
      } else {
        this.categoria = 'D';
        this.descripcion = 'Riesgo muy bajo (<68 puntos)';
      }
      this.crearNeonato();
      }
  }

  getNombreCentil(centil) {
    let nombreCentil = '';
    switch (centil) {
      case 'centil1':
      nombreCentil = 'percentil entre 5 y 95';
      break;
      case 'centil2':
      nombreCentil = 'percentil menor a 5';
      break;
      case 'centil3':
      nombreCentil = 'percentil mayor a 95';
      break;
      default:
      break;
    }
    return nombreCentil;
  }

  getNombreParto(parto) {
    let nombreParto = '';
    switch (String(parto)) {
      case 'parto1':
      nombreParto = 'Cesárea';
      break;
      case 'parto2':
      nombreParto = 'Parto vaginal eutócico';
      break;
      case 'parto3':
      nombreParto = 'Parto distócico vaginal';
      break;
      default:
      break;
    }
    return nombreParto;
  }

  getApgar(apgar) {
    let nombreApgar = '';
    switch (apgar) {
      case 'apgar1':
      nombreApgar = 'Tranquilizante (7 a 10)';
      break;
      case 'apgar2':
      nombreApgar = 'Moderado (4 a 6)';
      break;
      case 'apgar3':
      nombreApgar = 'Bajo (0 a 3)';
      break;
      default:
      break;
    }
    return nombreApgar;
  }

  getComorbilidad(comorbilidad) {
    let nombreComorbilidad = '';
    switch (comorbilidad) {
      case 'comor1':
      nombreComorbilidad = 'Trastornos relacionados con la asfixia';
      break;
      case 'comor2':
      nombreComorbilidad = 'Malformaciones';
      break;
      case 'comor3':
      nombreComorbilidad = 'Enfermedades relacionadas con la prematuridad';
      break;
      case 'comor4':
      nombreComorbilidad = 'Enfermedades infecciosas';
      break;
      case 'comor5':
      nombreComorbilidad = 'Cualquier otro trastorno no clasificado en categorías anteriores';
      break;
      case 'comor6':
      nombreComorbilidad = '(Sin comorbilidades)';
      break;
      default:
      break;
    }
    return nombreComorbilidad;
  }

  parseDate(dateInput) {
    const date = new Date(dateInput);
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    let ddstring = dd.toString();
    let mmstring = mm.toString();

    if (dd < 10) {
      ddstring = '0' + dd.toString();
    }

    if (mm < 10) {
      mmstring = '0' + mm.toString();
    }

    let parseDate = date.toString();
    parseDate  = yyyy + '-' + mmstring + '-' + ddstring;
    return parseDate;
  }

  getCurrentDate() {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1; //January is 0!
    const yyyy = today.getFullYear();

    if (dd < 10) {
      let ddstring = dd.toString();
      ddstring = '0' + dd.toString();
    }

    if (mm < 10) {
      let mmstring = mm.toString();
      mmstring = '0' + mm.toString();
    }

    let todaystring = today.toString();
    todaystring  = dd + '/' + mm + '/' + yyyy;
    return todaystring;
  }

  openDialogDiagnosticos() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '600px';
    dialogConfig.width = '600px';
    dialogConfig.position = {
      top : '60'
    };
    this.dialog.open(DialogCie10Component, dialogConfig);
  }

  openDialogImg(mensaje) {
    const newWindowWidth = window.innerWidth;
    if ( newWindowWidth > 600) {
        this.isMobileView = false;
    } else {
        this.isMobileView = true;
    }
    if (this.isMobileView) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.height = '300px';
      dialogConfig.width = '600px';
      dialogConfig.data = {
        img: mensaje
      };
      this.dialog.open(ImageDialogComponent, dialogConfig);
    }

  }

  openDialogErrorCodigo(mensaje) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '450px';
    dialogConfig.width = '400px';
    dialogConfig.data = {
      mensaje: mensaje,
      mensaje_err: this.mensaje_err
    };
    const dialogRef = this.dialog.open(ErrorCodigosDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if (data === 'abrir') {
          this.openDialogDiagnosticos();
        }
      }
    );
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '200px';
    dialogConfig.width = '400px';
    const decimal = this.scoreBebeTest.get('edadGestionalDecimal').value;
    const entero = this.scoreBebeTest.get('edadGestionalEntero').value;
    const edadIngresadaString = entero + '.' + decimal;
    this.edadGestionalTotal = parseFloat(edadIngresadaString);
    dialogConfig.data = {
      categoria: this.categoria,
      id: this.neonatoID,
      puntaje: this.total,
      nombreApellido: this.scoreBebeTest.get('nombreApellido').value,
      riesgo: this.getNivelRiesgo(this.categoria),
      fechaNacimiento: this.parseDate(this.scoreBebeTest.get('fechaNacimiento').value),
      horaNacimiento: this.scoreBebeTest.get('horaNacimiento').value,
      edadGestional: this.edadGestionalTotal,
      pesoNacimiento: this.scoreBebeTest.get('pesoNacimiento').value,
      centil: this.getNombreCentil(this.scoreBebeTest.get('centil').value),
      parto: this.getNombreParto(this.scoreBebeTest.get('parto').value),
      apgar: this.getApgar(this.scoreBebeTest.get('apgar').value),
      comor: this.scoreBebeTest.get('comor').value,
      factorRiesgoInminente: this.getTrueorFalse(this.scoreBebeTest.get('factorRiesgoInminente').value),
      factorRiesgoIncrementa: this.getTrueorFalse(this.scoreBebeTest.get('factorRiesgoIncrementa').value),
      factorRiesgoReduce: this.getTrueorFalse(this.scoreBebeTest.get('factorRiesgoReduce').value),
      factoresRiesgoInminente: this.getFactoresRiesgoInmintente(),
      factoresRiesgoAumenta: this.getFactoresRiesgoIncrementa(),
      factoresRiesgoReduce: this.getFactoresRiesgoReduce(),
      comorbilidades: this.getComorbilidades(),
      nivelAtencion: this.scoreBebeTest.get('nivelAtencion').value,
      nombreUsuario: this.nombreUser,
      emailUsuario: this.mailUser
    };
    this.dialog.open(CourseDialogComponent, dialogConfig);
  }

  getNivelRiesgo(categoria) {
    let nivelRiesgo = '';
    switch (categoria) {
      case 'A':
      nivelRiesgo = 'alto';
      break;
      case 'B':
      nivelRiesgo = 'moderado';
      break;
      case 'C':
      nivelRiesgo = 'bajo';
      break;
      case 'D':
      nivelRiesgo = 'muy bajo';
      break;
      default:
      break;
    }
    return nivelRiesgo;
  }

  crearNeonato() {
    const decimal = this.scoreBebeTest.get('edadGestionalDecimal').value;
    const entero = this.scoreBebeTest.get('edadGestionalEntero').value;
    const edadIngresadaString = entero + '.' + decimal;
    this.edadGestionalTotal = parseFloat(edadIngresadaString);
    this.neonato = {
      nombreApellido: this.scoreBebeTest.get('nombreApellido').value,
      fechaCalculo: this.getCurrentDate(),
      sexo: this.scoreBebeTest.get('sexo').value,
      fechaNacimiento: this.parseDate(this.scoreBebeTest.get('fechaNacimiento').value),
      horaNacimiento: this.scoreBebeTest.get('horaNacimiento').value,
      edadGestional: this.edadGestionalTotal,
      nivelAtencion: this.scoreBebeTest.get('nivelAtencion').value,
      factoresRiesgoInminente: this.getIDBaseFactoresInminente(),
      factoresRiesgoAumenta: this.getIDBaseFactoresAumenta(),
      factoresRiesgoReduce: this.getIDBaseFactoresReduce(),
      peso: this.scoreBebeTest.get('pesoNacimiento').value,
      catEdadGestional: this.categoriaEdad,
      catPeso: this.categoriaPeso,
      catPesoEdadGestional: this.scoreBebeTest.get('centil').value,
      catApgar: this.scoreBebeTest.get('apgar').value,
      catTipoParto: this.scoreBebeTest.get('parto').value,
      comorbilidades: this.mensajeComor(this.scoreBebeTest.get('comor').value),
      scoreTotal: this.total,
      catRiesgo: this.categoria,
      ID_USUARIO: this.userID
    };

    this.neonatoService.addNeonato(this.neonato).subscribe(
      (response) => {
      this.neonatoID = this.addLeadingZero(response.id, 5);
      this.openDialog();
    });
  }

  getFactoresRiesgoIncrementa() {
    const factoresRiesgoSeleccionados = [];
    const selecciones = this.scoreBebeTest.get('factorRiesgoIncrementa').value;
    for (let i = 0; i < selecciones.length; i++) {
      if (Array.isArray(selecciones[i])) {
        for (let j = 0; j < selecciones[i].length; j++) {
          if (selecciones[i][j]) {
            factoresRiesgoSeleccionados.push(this.factoresRiesgoAumenta[i].value + ' ' + this.factoresRiesgoAumenta[i].opciones[j]);
          }
        }
      } else {
        if (selecciones[i]) {
          factoresRiesgoSeleccionados.push(this.factoresRiesgoAumenta[i].value);
        }
      }
    }

   return factoresRiesgoSeleccionados;
  }

  getFactoresRiesgoInmintente() {
    const factoresRiesgoSeleccionados = [];
    const selecciones = this.scoreBebeTest.get('factorRiesgoInminente').value;
    for (let i = 0; i < selecciones.length; i++) {
      if (Array.isArray(selecciones[i])) {
        for (let j = 0; j < selecciones[i].length; j++) {
          if (selecciones[i][j]) {
            factoresRiesgoSeleccionados.push(this.factoresRiesgoInminente[i].value + ' ' + this.factoresRiesgoInminente[i].opciones[j]);
          }
        }
      } else {
        if (selecciones[i]) {
          factoresRiesgoSeleccionados.push(this.factoresRiesgoInminente[i].value);
        }
      }
    }

    return factoresRiesgoSeleccionados;
  }

  getFactoresRiesgoReduce() {
    const factoresRiesgoSeleccionados = this.scoreBebeTest.get('factorRiesgoReduce').value
    .map((v, i) => v ? this.factoresRiesgoReduce[i].value : null)
    .filter(v => v !== null);

    return factoresRiesgoSeleccionados;
  }

  getComorbilidades() {
    const comorbilidadesSeleccionadas = this.scoreBebeTest.get('comorbilidades').value
    .map((v, i) => v ? this.comorbilidades[i].value : null)
    .filter(v => v !== null);

    return comorbilidadesSeleccionadas;
  }

  getIDBaseComorbilidades() {
    const comorbilidadesSeleccionadas = this.scoreBebeTest.get('comorbilidades').value
    .map((v, i) => v ? this.comorbilidades[i].idbase : null)
    .filter(v => v !== null);

    return comorbilidadesSeleccionadas;
  }

  getIDBaseFactoresInminente() {
    const factoresInminente = [];
    const selecciones = this.scoreBebeTest.get('factorRiesgoInminente').value;
    for (let i = 0; i < selecciones.length; i++) {
      if (Array.isArray(selecciones[i])) {
        for (let j = 0; j < selecciones[i].length; j++) {
          if (selecciones[i][j]) {
            factoresInminente.push(this.factoresRiesgoInminente[i].idbase[j]);
          }
        }
      } else {
        if (selecciones[i]) {
          factoresInminente.push(this.factoresRiesgoInminente[i].idbase);
        }
      }
    }

    return factoresInminente;
  }

  getIDBaseFactoresAumenta() {
    const factoresAumenta = [];
    const selecciones = this.scoreBebeTest.get('factorRiesgoIncrementa').value;
    for (let i = 0; i < selecciones.length; i++) {
      if (Array.isArray(selecciones[i])) {
        for (let j = 0; j < selecciones[i].length; j++) {
          if (selecciones[i][j]) {
            factoresAumenta.push(this.factoresRiesgoAumenta[i].idbase[j]);
          }
        }
      } else {
        if (selecciones[i]) {
          factoresAumenta.push(this.factoresRiesgoAumenta[i].idbase);
        }
      }
    }
    return factoresAumenta;
  }

  getIDBaseFactoresReduce() {
    const factoresReduce = this.scoreBebeTest.get('factorRiesgoReduce').value
    .map((v, i) => v ? this.factoresRiesgoReduce[i].idbase : null)
    .filter(v => v !== null);

    return factoresReduce;
  }

  getScoreComorbilidades() {
    const comorbilidadesSeleccionadas = this.scoreBebeTest.get('comorbilidades').value
    .map((v, i) => v ? this.comorbilidades[i].score : null)
    .filter(v => v !== null);

    return comorbilidadesSeleccionadas;
  }

  getTrueorFalse(factoresDeRiesgo) {
    let resultado = false;
    for (let i = 0; i < factoresDeRiesgo.length; i++) {
      if (Array.isArray(factoresDeRiesgo[i])) {
        for (let j = 0; j < factoresDeRiesgo[i].length; j++) {
          if (factoresDeRiesgo[i][j]) {
            resultado = true;
            return resultado;
          }
        }
      } else {
        if (factoresDeRiesgo[i] === true ) {
          resultado = true;
          return resultado;
        }
      }
    }
    return resultado;
  }

  finalizarTest() {
    this.crearNeonato();
  }

  mensajeComor(aux) {
    let mensaje;
    if (aux) {
      mensaje = [51];
    } else {
      mensaje = this.getIDBaseComorbilidades();
    }
    return mensaje;
  }

  enviarIDsDiagnostico() {
    let ids = [];
    let idsGrupo = [];
    const valueTextArea = this.scoreBebeTest.get('codigosComor').value;
    ids = valueTextArea.toUpperCase().replace(/\s/g, '').split(',');
    this.neonatoService.getIDGruposComorbilidades(ids)
    .subscribe(
      (data) => {
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            if (!idsGrupo.includes(data[i].grupo)) {
              idsGrupo.push(data[i].grupo);
            }
          }
        }
        const arrayAux = [false, false, false, false, false];
        for (let j = 0; j < idsGrupo.length; j++) {
          for (let k = 0; k < this.comorbilidades.length; k++) {
            if (this.comorbilidades[k].idbase === idsGrupo[j]) {
              arrayAux[k] = true;
              this.comorbilidadData().setValue(arrayAux);
            }
          }
        }
      },
      (err) => {
        this.mensaje_err = err.error.err;
        this.openDialogErrorCodigo('ERROR');
      }
    );
  }

  isTextAreaValid() {
    return this.scoreBebeTest.get('codigosComor').value === '' || this.scoreBebeTest.get('codigosComor').value === null;
  }

  openCuadros() {
    const newWindowWidth = window.innerWidth;
    if ( newWindowWidth > 600) {
        this.isMobileView = false;
    } else {
        this.isMobileView = true;
    }
    if (this.isMobileView) {
      this.toastr.info('Haga click en la imagen para hacer zoom', 'Información!');
    }
    this.mostrarCuadros = true;
  }
  hideCuadros() {
    this.mostrarCuadros = false;
  }

  mostrarDownes() {
    this.showDownes = true;
    this.showSilverman = false;
  }
  mostrarSilverman() {
    this.showDownes = false;
    this.showSilverman = true;
  }

}
