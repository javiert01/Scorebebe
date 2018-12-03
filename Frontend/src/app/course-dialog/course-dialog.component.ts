import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {

  categoria: string;
  descripcion: string;
  puntaje: number;

  constructor(private dialogRef: MatDialogRef<CourseDialogComponent>, @Inject(MAT_DIALOG_DATA) data) { 
    this.categoria = data.categoria;
    this.descripcion = data.descripcion;
    this.puntaje = data.puntaje;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
}

}
