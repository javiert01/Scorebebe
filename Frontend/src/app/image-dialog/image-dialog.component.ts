import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.css']
})
export class ImageDialogComponent implements OnInit {

  img;

  constructor(private dialogRef: MatDialogRef<ImageDialogComponent>, @Inject(MAT_DIALOG_DATA) data,
  private toastr: ToastrService) {
    this.img = data.img;
   }

  ngOnInit() {
    this.toastr.info('Haga click fuera de la imagen para cerrarla', 'Información!');
  }

  close() {
    this.dialogRef.close();
  }

}
