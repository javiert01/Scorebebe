import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {

  mensaje;
  mensaje_err;

  constructor(private dialogRef: MatDialogRef<RegisterDialogComponent>, @Inject(MAT_DIALOG_DATA) data,
  private router: Router) {
    this.mensaje = data.mensaje;
    this.mensaje_err = data.mensaje_err;
   }

  ngOnInit() {
    console.log(this.mensaje);
  }

  close() {
    if (this.mensaje === 'OK') {
      this.dialogRef.close();
      this.router.navigate(['/login']);
    } else {
      this.dialogRef.close();
    }
  }

}
