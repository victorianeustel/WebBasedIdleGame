import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from './account';
import { ItemsService } from './items.service';
import { findIndex, map, timer } from 'rxjs';
import { item } from 'src/item';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { highScore } from './highScore';

//GLOBALLY ACCESSABLE

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  constructor(private http: HttpClient) { }

  //user's id
  id: string = '';

  //User's current score; defaults to 0
  score: number = 0;

  //User's current multiplier; defaults to 1
  multiplier: number = 1;

  //User's current Score per Minute; defaults to 0
  perMinute: number = 0;

  //Boolean for auto-save enabled/disabled
  autosaveOn: boolean = false;

  //Timer Initialization, emits values every second
  source = timer(0,1000);
  subscribe = this.source.subscribe(val =>{
    //Increase score
    this.score += Math.round(this.perMinute/60);
    //Call autosave function every 60 seconds
    if(val % 60 == 0 && this.autosaveOn){
      //AUTOSAVE CODE HERE
    }
  });

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
    id : this.createID(),
    score: this.score,
    multiplier: this.multiplier,
    perMinute: this.perMinute,
    itemInventory: ItemsService.itemsArray,
  }

  highScoresList: highScore[] = []

  accountList: Account[] = [];

  idList: string[] = [];

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
          this.idList = [];
          for (const key in responseData)
           accountList.push(responseData[key]);
          for (const key in responseData)
            this.idList.push(key);

          // console.log(key in responseData);
          return accountList;
        })
      );
  }

  createID(){
      var uniqueID = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
      for (var i = 0; i < 20; i++)
        uniqueID += possible.charAt(Math.floor(Math.random() * possible.length));
    
      return uniqueID;
  }

  addHighScore(highScore: highScore) {
    return this.http.post(
      'https://idle-coder-app-default-rtdb.firebaseio.com/'+ 'highscores.json',
      highScore
    );
  }

  getHighScores(){
    return this.http
    .get<highScore[]>
      ('https://idle-coder-app-default-rtdb.firebaseio.com/' + 'highscores.json')
      .pipe(
        map((responseData) => {
          for (const key in responseData)
           this.highScoresList.push(responseData[key]);
          
           return this.highScoresList;
        })
      );
  }
}