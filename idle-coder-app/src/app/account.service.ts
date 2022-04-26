import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from './account';
import { ItemsService } from './items.service';
import { findIndex, map } from 'rxjs';
import { item } from 'src/item';

//GLOBALLY ACCESSABLE

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  constructor(private http: HttpClient,) { }

  //User's current score; defaults to 0
  score: number = 0;

  //User's current multiplier; defaults to 1
  multiplier: number = 1;

  //User's current Score per Minute; defaults to 0
  perMinute: number = 0;

  //This method should be called whenever the button is clicked
  incrementScore() {
    this.score += this.multiplier;
  }

  //This method should be called whenever an item is bought that increases the multiplier, and passed a number to add to the current multiplier based on that item
  multiplierIncrease(add: number){
    this.multiplier += add;
  }

  //This method should be called whenever an item is bought that increases the current score per minute, and passed a number to add to the current rate based on that item
  perMinuteIncrease(add: number){
    this.perMinute += add;
  }

  acct: Account = {
    id : '',
    score: 0,
    multiplier: 0,
    itemInventory: [],
  }

  accountList: Account[] = [];

  index: number = 0;

  //test string to load account from db
  username: string = 'test2';

  //add new account to database
  addAccount(newAcct: Account ) {
    return this.http.post(
      'https://idle-coder-app-default-rtdb.firebaseio.com/'+ 'accounts.json',
      newAcct
    );
  }

  //get accounts from database
  getAccounts(){
    return this.http
    .get<Account[]>
      ('https://idle-coder-app-default-rtdb.firebaseio.com/' + 'accounts.json')
      .pipe(
        map((responseData) => {
          const accountList: Account[] = [];
          for (const key in responseData) accountList.push(responseData[key]);

          return accountList;
        })
      );
  }

  updateAccount(acct: Account){

  }

}
