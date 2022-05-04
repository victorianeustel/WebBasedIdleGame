import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { findIndex, timer } from 'rxjs';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { ItemsService } from '../items.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadDialogComponent } from '../load-dialog/load-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {MatSlideToggle} from '@angular/material/slide-toggle'

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.css']
})
export class SettingsMenuComponent implements OnInit {

  constructor(private cookieService: CookieService, public acctServ: AccountService, private itmServ: ItemsService, private snackBar: MatSnackBar, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.fetchData();
  }

  autosaveOn:boolean = false;

  SaveHash: string = '';

  accountList: Account[] = [];

  //index to use for mapping
  index: number = 0;

  new(){
    this.acctServ.id = this.acctServ.createID();
    this.acctServ.score = 0;
    this.acctServ.multiplier = 1;
    this.acctServ.perMinute = 0;
    this.itmServ.itemsArray = [
      {name:"Typing Lessons", desc:"Clicks are worth 1 more!", price:50, isIncrementModifier:true, increaseToStat:1, numPurchased:0, purchaseLimit:50},
      {name:"Mouse on a Wheel", desc:"+60 Score per Minute!", price: 50, isIncrementModifier:false, increaseToStat:60, numPurchased:0, purchaseLimit:50},
      {name:"New Keyboard", desc:"Clicks are worth 5 more!", price:150, isIncrementModifier:true, increaseToStat:5, numPurchased:0, purchaseLimit:50},
      {name:"Hamsters on Wheels", desc:"+300 Score per Minute!", price: 200, isIncrementModifier:false, increaseToStat:300, numPurchased:0, purchaseLimit:50},
      {name:"New Computer", desc:"Clicks are worth 200 more!", price:5000, isIncrementModifier:true, increaseToStat:200, numPurchased:0, purchaseLimit:50},
      {name:"Hire a Developer", desc:"+5000 Score per Minute!", price: 7500, isIncrementModifier:false, increaseToStat:1000, numPurchased:0, purchaseLimit:50},
      {name:"Coffee", desc:"Clicks are worth 500 more!", price:10000, isIncrementModifier:true, increaseToStat:500, numPurchased:0, purchaseLimit:50},
    ];
    this.openSnackBar("New account created!");
  }

  load(username: string){
    this.fetchData();

    //map finding account in array that matches user's id
    this.index = this.accountList.map(account => account.id).indexOf(username);

    //set current settings to account loaded settings
    this.acctServ.id = this.acctServ.idList[this.index];
    this.acctServ.score = this.accountList[this.index].score;
    this.acctServ.multiplier = this.accountList[this.index].multiplier;
    this.acctServ.perMinute = this.accountList[this.index].perMinute;
    this.itmServ.itemsArray = this.accountList[this.index].itemInventory;

    try{
      // this.SaveHash = this.cookieService.get('SaveHash');           
      // Send SaveHash to appropriate load function
    }
    catch{Error}

    this.openSnackBar("Game loaded!");
  }

  //This method could be called by the autoSave method
  save(){
    //Get save hash from save function and set SaveHash equal to it
    // this.cookieService.set('SaveHash', this.SaveHash);

    if(this.acctServ.id !=  '') {
      this.updateAccount();
    }
    else{
      const newAcct: Account = {
        id: this.acctServ.createID(),
        score: this.acctServ.score,    
        multiplier: this.acctServ.multiplier,
        perMinute: this.acctServ.perMinute,    
        itemInventory: this.itmServ.itemsArray,
      };

      this.acctServ.id = newAcct.id;
    
      this.acctServ.addAccount(newAcct).subscribe((data) => {
        console.log(data);
      });
    }
    this.fetchData();
    this.openSnackBar("Account saved!    Your game ID is: " + this.acctServ.id)
  }

  fetchData() {
    this.acctServ.getAccounts().subscribe((data) => {
      this.accountList = data;
    });
  }

  updateAccount(){
    this.acctServ.updateSaveFile(this.itmServ.itemsArray);
    this.fetchData();
  }

  autosaveToggle(){
    this.autosaveOn = !this.autosaveOn;
    
    if (this.autosaveOn == true) {
      this.openSnackBar("Autosave turned on!")
    }
    else {
      this.openSnackBar("Autosave turned off!")
    }
  }

  source = timer(0,1000);
  subscribe = this.source.subscribe(val =>{
    if(this.autosaveOn && val % 60 == 0)
      this.updateAccount();
  });

  openSnackBar(message: string) {
    this.snackBar.open(message);

  }

  openLoadDialog(): void {
    const dialogRef = this.dialog.open(LoadDialogComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(gameID => {
      console.log('The dialog was closed');
    });
  }
}
