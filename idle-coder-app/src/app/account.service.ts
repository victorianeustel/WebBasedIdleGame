import { Injectable } from '@angular/core';


//GLOBALLY ACCESSABLE


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }

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

}
