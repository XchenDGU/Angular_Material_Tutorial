import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-mat-confirm-dialog',
  templateUrl: './mat-confirm-dialog.component.html',
  styles: []
})
export class MatConfirmDialogComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<MatConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }
  
  ngOnInit() {
  }

  closeDialog(){
    this.dialogRef.close(false);
  }
}
