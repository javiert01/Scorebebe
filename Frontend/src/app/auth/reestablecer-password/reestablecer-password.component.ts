import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CambioPasswordDialogComponent } from 'src/app/cambio-password-dialog/cambio-password-dialog.component';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-reestablecer-password',
  templateUrl: './reestablecer-password.component.html',
  styleUrls: ['./reestablecer-password.component.css']
})
export class ReestablecerPasswordComponent implements OnInit, OnDestroy {

 //  @ViewChild('recaptcha', {static: true }) recaptchaElement: ElementRef;
  @ViewChild('reestablecerButton', {static: true}) reestablecerBtn: ElementRef;
  reestablecerForm: FormGroup;
  activated;
  usuarioExiste = false;
  continuarCaptcha = false;
  captchaSubscription: Subscription;
  formChangesSubscription: Subscription;
  mensaje_err = '';
  constructor(private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit() {

    this.reestablecerForm = new FormGroup({
      'username': new FormControl(null, Validators.required)
    });
    this.formChangesSubscription = this.reestablecerForm.get('username').valueChanges
    .subscribe(
      (value) => {
        this.validarUsuario(value);
      }
    );

  }

  onReestablecerPassword() {
    const usernameEmail = {
      usernameEmail: this.reestablecerForm.get('username').value
    };
    this.authService.reestablecerPassword(usernameEmail)
    .subscribe(
      data => {
        this.openDialog('OK');
      },
      err => {
        if (err.status === 200) {
          this.openDialog('OK');
        } else {
          this.mensaje_err = err.error.err;
          this.openDialog('ERROR');
        }
      }
    );
  }

  resolved(captchaResponse: string) {
    if (captchaResponse) {
      const token = {
        token: captchaResponse
      };
      this.captchaSubscription = this.authService.postAPIkey(token)
      .subscribe(
        data => {
          this.activated = data['success'];
          if (this.activated) {
            this.reestablecerBtn.nativeElement.className = 'btn btn-success enviar-btn-ok';
            this.reestablecerBtn.nativeElement.disabled = false;
          }
        });
    }
}

/*  addRecaptchaScript() {
    console.log('adding script');
    window['grecaptchaCallback'] = () => {
      this.renderReCaptcha();
    }

    (function(d, s, id, obj){
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return;}
      js = d.createElement(s); js.id = id;
      js.src = 'https://www.google.com/recaptcha/api.js?onload=grecaptchaCallback&amp;render=explicit';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'recaptcha-jssdk', this));

  }

  renderReCaptcha() {
    console.log('rendering recaptcha');
    window['grecaptcha'].render(this.recaptchaElement.nativeElement, {
      'sitekey' : '6LceVsUUAAAAAF4pC59ByZgrCPwC8uscNEUhPNI9',
      'callback': (response) => {
        const token = {
          token: response
        };
        this.captchaSubscription = this.authService.postAPIkey(token)
        .subscribe(data => {
          this.activated = data['success'];
          if (this.activated) {
            this.reestablecerBtn.nativeElement.className = 'btn btn-success enviar-btn-ok';
            this.reestablecerBtn.nativeElement.disabled = false;
          }
        });
      }
    });
  }*/

  validarUsuario(username) {
    const param = {
      param: username
    };
    this.authService.validarUsuario(param)
    .subscribe(data => {
      this.usuarioExiste = data['usernameValido'];
    });
  }

  onContinueCaptcha() {
    this.continuarCaptcha = true;
  }

  openDialog(respuesta) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '300px';
    dialogConfig.width = '400px';
    dialogConfig.data = {
      mensaje: respuesta,
      mensaje_err: this.mensaje_err
    };
    this.dialog.open(CambioPasswordDialogComponent, dialogConfig);
  }

  ngOnDestroy() {
    if (this.captchaSubscription) {
      this.captchaSubscription.unsubscribe();
    }
    if(this.formChangesSubscription) {
      this.formChangesSubscription.unsubscribe();
    }
  }



}
