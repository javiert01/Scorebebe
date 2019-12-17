import { Component, OnInit } from '@angular/core';
import { DialogIosComponent } from './dialog-ios/dialog-ios.component';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DialogAdroidComponent } from './dialog-adroid/dialog-adroid.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  openDialogAndroid() {
    const configuracionDialog = new MatDialogConfig();
    configuracionDialog.disableClose = true;
    configuracionDialog.autoFocus = true;
    configuracionDialog.height = '390px';
    configuracionDialog.width = '700px';
    configuracionDialog.data = {
      data: 'data'
    };
    this.dialog.open(DialogAdroidComponent, configuracionDialog);
  }

  openDialogIos() {
    const configuracionDialog = new MatDialogConfig();
    configuracionDialog.disableClose = true;
    configuracionDialog.autoFocus = true;
    configuracionDialog.height = '290px';
    configuracionDialog.width = '700px';
    configuracionDialog.data = {
      data: 'data'
    };
    this.dialog.open(DialogIosComponent, configuracionDialog);
  }
}
