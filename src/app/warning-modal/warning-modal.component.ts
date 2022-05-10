import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-warning-modal',
  templateUrl: './warning-modal.component.html',
  styleUrls: ['./warning-modal.component.css']
})
export class WarningModalComponent {
  @Input() warning: string;
  constructor(public dialogRef: MatDialogRef<WarningModalComponent>) { }

  closeDialog(){
    this.dialogRef.close()
  }
}
