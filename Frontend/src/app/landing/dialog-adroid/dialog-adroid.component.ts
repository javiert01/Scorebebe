import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { LandingComponent } from "../landing.component";

@Component({
  selector: "app-dialog-adroid",
  templateUrl: "./dialog-adroid.component.html",
  styleUrls: ["./dialog-adroid.component.css"]
})
export class DialogAdroidComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<LandingComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {}

  ngOnInit() {}
  close() {
    this.dialogRef.close();
  }
}
