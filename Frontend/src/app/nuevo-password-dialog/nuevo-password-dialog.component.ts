import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-password-dialog',
  templateUrl: './nuevo-password-dialog.component.html',
  styleUrls: ['./nuevo-password-dialog.component.css']
})
export class NuevoPasswordDialogComponent implements OnInit {

  mensaje;
  mensaje_err;

  constructor(private dialogRef: MatDialogRef<NuevoPasswordDialogComponent>, @Inject(MAT_DIALOG_DATA) data,
  private router: Router) {
    this.mensaje = data.mensaje;
    this.mensaje_err = data.mensaje_err;
   }

  ngOnInit() {
  }

  close() {
    if (this.mensaje === 'OK') {
      this.dialogRef.close();
      this.router.navigate(['/test']);
    } else {
      this.dialogRef.close();
    }
  }

}
