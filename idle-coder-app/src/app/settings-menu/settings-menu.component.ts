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
import { Variable } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.css']
})
export class SettingsMenuComponent implements OnInit {


  constructor(private cookieService: CookieService, public acctServ: AccountService, private itmServ: ItemsService, private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.fetchData();
  }

  autosaveOn: boolean = false;


  SaveHash: string = '';

  accountList: Account[] = [];

  tempID: string = '';
  saveData: string = '';

  saveID: string = '';

  //index to use for mapping
  index: number = 0;

  new() {
    //Reloading automatically clears all values
    window.location.reload();
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

  openFile(event: any){
    var input = event.target;

    if (input.files.length == 0) return;

    var fileReader = new FileReader();

    fileReader.onload = (e) => {
      let inputText = e.target?.result;
      // Do the rest of the processing
      let accountJSON = JSON.parse(inputText!.toString());
      console.log(accountJSON);
    }

    fileReader.readAsText(input.files[0]);
  }
}
