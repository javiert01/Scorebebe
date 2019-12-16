import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog-cie10',
  templateUrl: './dialog-cie10.component.html',
  styleUrls: ['./dialog-cie10.component.css']
})
export class DialogCie10Component implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogCie10Component>,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.toastr.info('Haga click fuera de la imagen para cerrarla', 'Información!');
  }

  close() {
    this.dialogRef.close();
  }

}
