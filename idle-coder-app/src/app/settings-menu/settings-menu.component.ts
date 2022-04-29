import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { findIndex, timer } from 'rxjs';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { ItemsService } from '../items.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatCheckboxModule } from '@angular/material/checkbox'

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.css']
})
export class SettingsMenuComponent implements OnInit {

  constructor(private cookieService: CookieService, public acctServ: AccountService, private itmServ: ItemsService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  autosaveOn:boolean = false;

  SaveHash: string = '';

  accountList: Account[] = [];

  //index to use for mapping
  index: number = 0;

  new(){
    // this.cookieService.set('SaveHash','');
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
  }

  source = timer(0,1000);
  subscribe = this.source.subscribe(val =>{
    if(this.autosaveOn && val % 60 == 0)
      this.updateAccount();
  });
}
