import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-load-dialog',
  templateUrl: './load-dialog.component.html',
  styleUrls: ['./load-dialog.component.css']
})
export class LoadDialogComponent  {

  constructor(
    public dialogRef: MatDialogRef<LoadDialogComponent>,
    private acctServ: AccountService,
    ) { }

  gameID: String = '';

  onNoClick(): void {
    this.dialogRef.close();
  }
// create fnction to read from file and return string id
}
