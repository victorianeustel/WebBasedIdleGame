import { Injectable } from '@angular/core';
import { item } from 'src/item';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(public acctSer: AccountService) { }

    //Default items instantiated
    itemsArray: item[] = [
      {name:"Typing Lessons", desc:"Clicks Worth 1 More!", price:50, isIncrementModifier:true, increaseToStat:1, isPurchased:false},
      {name:"New Keyboard", desc:"Clicks Worth 2 More!", price:150, isIncrementModifier:true, increaseToStat:1, isPurchased:false},
      {name:"New Computer", desc:"Clicks Worth 100 More!", price:5000, isIncrementModifier:true, increaseToStat:100, isPurchased:false}
    ];

    //purchasing currently does nothing if you do not have enough points to purchase
    purchase(index: number){
      //if enough points to purchase given item
      if(this.acctSer.score >= this.itemsArray[index].price){
        //set the item to the purchased status
        this.itemsArray[index].isPurchased = true;
        //take the points away from the user according to the cost
        this.acctSer.score -= this.itemsArray[index].price;
        //if item increases the button multiplier, add increase to current multiplier
        //else add increase to current score per minute
        if(this.itemsArray[index].isIncrementModifier)
          this.acctSer.multiplierIncrease(this.itemsArray[index].increaseToStat);
        else
          this.acctSer.perMinuteIncrease(this.itemsArray[index].increaseToStat);
      }
    }
}
