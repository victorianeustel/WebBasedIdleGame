import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { findIndex, timer } from 'rxjs';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { ItemsService } from '../items.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { HttpClient } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadDialogComponent } from '../load-dialog/load-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {MatSlideToggle} from '@angular/material/slide-toggle'

export interface DialogData {
  gameID: string;
}

import { LoadDialogComponent } from '../load-dialog/load-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {MatSlideToggle} from '@angular/material/slide-toggle'

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.css']
})
export class SettingsMenuComponent implements OnInit {

  constructor(private cookieService: CookieService, public acctServ: AccountService, private itmServ: ItemsService, private snackBar: MatSnackBar, private dialog: MatDialog,) {}
  ngOnInit(): void {
    this.fetchData();
  }

  autosaveOn: boolean = false;


  SaveHash: string = '';

  gameID: string = '';

  accountList: Account[] = [];

  tempID: string = '';
  saveData: string = '';

  saveID: string = '';

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

  load(username: string) {
    this.tempID = this.acctServ.id;
    if (username != '' && username != null) {
      try {
        this.fetchData();
        console.log("Loaded from text field")
        //map finding account in array that matches user's id
        this.index = this.accountList.map(account => account.id).indexOf(username);

        //set current settings to account loaded settings
        this.acctServ.id = this.acctServ.idList[this.index];
        this.acctServ.score = this.accountList[this.index].score;
        this.acctServ.multiplier = this.accountList[this.index].multiplier;
        this.acctServ.perMinute = this.accountList[this.index].perMinute;
        this.itmServ.itemsArray = this.accountList[this.index].itemInventory;
      }
      catch {
        console.log("Tried to load an invalid savehash from text field.")
        this.acctServ.id = this.tempID;
      }
    }
    else {
      // try {
      this.SaveHash = this.cookieService.get('SaveHash');
      if (this.SaveHash != '') {

        //maybe this should be moved to account.service?
        this.http.patch("https://idle-coder-app-default-rtdb.firebaseio.com/accounts/" + this.SaveHash + ".json",
          {
            "id": this.SaveHash,
            "itemInventory": this.itmServ.itemsArray,
            "multiplier": this.acctServ.multiplier,
            "perMinute": this.acctServ.perMinute,
            "score": this.acctServ.score,
          })

        this.index = this.accountList.map(account => account.id).indexOf(this.SaveHash);
        console.log("SaveHash loaded from cookie");
        console.log(this.SaveHash);
        //set current settings to account loaded settings
        this.acctServ.id = this.acctServ.idList[this.index];
        this.acctServ.score = this.accountList[this.index].score;
        this.acctServ.multiplier = this.accountList[this.index].multiplier;
        this.acctServ.perMinute = this.accountList[this.index].perMinute;
        this.itmServ.itemsArray = this.accountList[this.index].itemInventory;
      }
      else {
        console.log("No cookie found.")
        this.acctServ.id = this.tempID;
      }
      // }
      // catch { 
      //   console.log("Tried to load an invalid savehash from cookie.")
      //   this.acctServ.id = this.tempID;
      //  }
    }
    //catch{Error}

    this.openSnackBar("Game loaded!");
  }
//load from file
  loadFromFile(){
    
  }
  //This method could be called by the autoSave method
  save() {
    //Get save hash from save function and set SaveHash equal to it
    this.cookieService.set('SaveHash', this.SaveHash);

    if (this.acctServ.id != '') {
      this.updateAccount();
    }
    else {
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

  saveToFile(){
    this.saveID = this.acctServ.id + ".txt";
    
    const newAcct: Account = {
      id: this.acctServ.createID(),
      score: this.acctServ.score,
      multiplier: this.acctServ.multiplier,
      perMinute: this.acctServ.perMinute,
      itemInventory: this.itmServ.itemsArray,
    };

    this.saveData = JSON.stringify(newAcct);
    var element = document.createElement('a');
    element.setAttribute('href','data:text/plain;charset=utf-8, ' + encodeURIComponent(this.saveData));
    element.setAttribute('download', this.saveID);
    document.body.appendChild(element);
    element.click();
  }

  fetchData() {
    this.acctServ.getAccounts().subscribe((data) => {
      this.accountList = data;
    });
  }

  updateAccount() {
    this.acctServ.updateSaveFile(this.itmServ.itemsArray);
    this.cookieService.set('SaveHash', this.acctServ.id, 365)
    this.fetchData();
  }

  autosaveToggle() {
    this.autosaveOn = !this.autosaveOn;
    
    if (this.autosaveOn == true) {
      this.openSnackBar("Autosave turned on!")
    }
    else {
      this.openSnackBar("Autosave turned off!")
    }
  }

  source = timer(0, 1000);
  subscribe = this.source.subscribe(val => {
    if (this.autosaveOn && val % 60 == 0)
      this.updateAccount();
  });

  openSnackBar(message: string) {
    this.snackBar.open(message);

  }

  openLoadDialog(): void {
    const dialogRef = this.dialog.open(LoadDialogComponent, {
      width: '260px',
      data: {gameID: this.gameID,},
    });

    dialogRef.afterClosed().subscribe(gameID => {
      console.log('The dialog was closed');
      this.gameID = gameID;
      this.load(gameID);
    });


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
