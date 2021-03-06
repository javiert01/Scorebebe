import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-disclaimer-dialog',
  templateUrl: './disclaimer-dialog.component.html',
  styleUrls: ['./disclaimer-dialog.component.css']
})
export class DisclaimerDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DisclaimerDialogComponent>) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
