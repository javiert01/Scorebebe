import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-error-codigos-dialog',
  templateUrl: './error-codigos-dialog.component.html',
  styleUrls: ['./error-codigos-dialog.component.css']
})
export class ErrorCodigosDialogComponent implements OnInit {

  mensaje;
  mensaje_err;

  constructor(private dialogRef: MatDialogRef<ErrorCodigosDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.mensaje = data.mensaje;
    this.mensaje_err = data.mensaje_err;
   }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  openCodeList() {
    this.dialogRef.close('abrir');
  }

}
