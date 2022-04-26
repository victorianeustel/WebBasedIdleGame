import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { findIndex } from 'rxjs';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.css']
})
export class SettingsMenuComponent implements OnInit {

  constructor(private cookieService: CookieService, private acctServ: AccountService, private itmServ: ItemsService) {}

  ngOnInit(): void {
    this.fetchData();
  }

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
    this.acctServ.score = this.accountList[this.index].score;
    this.acctServ.multiplier = this.accountList[this.index].multiplier;
    this.itmServ.itemsArray = this.accountList[this.index].itemInventory;

    try{
      // this.SaveHash = this.cookieService.get('SaveHash');           
      // Send SaveHash to appropriate load function
    }
    catch{Error}
  }

  //This method could be called by the autoSave method
  save(id: string){
    //Get save hash from save function and set SaveHash equal to it
    // this.cookieService.set('SaveHash', this.SaveHash);
    const newAcct: Account = {
      id: id,
      score: this.acctServ.score,    
      multiplier: this.acctServ.multiplier,    
      itemInventory: this.itmServ.itemsArray,
    };
    
    this.acctServ.addAccount(newAcct).subscribe((data) => {
      console.log(data);
    });

    this.fetchData();
  }

  fetchData() {
    this.acctServ.getAccounts().subscribe((data) => {
      this.accountList = data;
    });
  }
}
