import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LandingComponent } from '../landing.component';

@Component({
  selector: "app-dialog-ios",
  templateUrl: "./dialog-ios.component.html",
  styleUrls: ["./dialog-ios.component.css"]
})
export class DialogIosComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<LandingComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {}

  ngOnInit() {}
  close() {
    this.dialogRef.close();
  }
}
