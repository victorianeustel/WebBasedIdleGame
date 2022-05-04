
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from '../account.service';
import { MatInput } from '@angular/material/input';
import { DialogData } from '../settings-menu/settings-menu.component';

@Component({
  selector: 'app-load-dialog',
  templateUrl: './load-dialog.component.html',
  styleUrls: ['./load-dialog.component.css']
})
export class LoadDialogComponent  {

  constructor(
    public dialogRef: MatDialogRef<LoadDialogComponent>,
    private acctServ: AccountService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) { }

  gameID: string = '';

  onNoClick(): void {
    this.dialogRef.close();
  }

  setGameID(inputGameID: string){
    this.gameID = inputGameID;
  }
}
