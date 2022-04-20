import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { item } from 'src/item';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  http: any;
  static itemsArray: item[];

  constructor(public acctSer: AccountService) { }

    //Default items instantiated
    itemsArray: item[] = [
      {name:"Typing Lessons", desc:"Clicks are worth 1 more!", price:50, isIncrementModifier:true, increaseToStat:1, numPurchased:0, purchaseLimit:50},
      {name:"New Keyboard", desc:"Clicks are worth 5 more!", price:150, isIncrementModifier:true, increaseToStat:5, numPurchased:0, purchaseLimit:50},
      {name:"New Computer", desc:"Clicks are worth 200 more!", price:5000, isIncrementModifier:true, increaseToStat:200, numPurchased:0, purchaseLimit:50},
      {name:"Hire Developer", desc:"Clicks are worth 500 more!", price:10000, isIncrementModifier:true, increaseToStat:500, numPurchased:0, purchaseLimit:50},

    ];

    //purchasing currently does nothing if you do not have enough points to purchase
    purchase(index: number){
      //if enough points to purchase given item
      if(this.acctSer.score >= this.itemsArray[index].price){
        //increase the purchase counter
        this.itemsArray[index].numPurchased += 1;
        //take the points away from the user according to the cost
        this.acctSer.score -= this.itemsArray[index].price;

        /*START: POTENTIAL INCLUSION --- SCALING COSTS ---
        
        this.itemsArray[index].price += Math.round(this.itemsArray[index].price * this.itemsArray[index].numPurchased * .01); 

        END: --- SCALING COSTS ---*/

        //if item increases the button multiplier, add increase to current multiplier
        //else add increase to current score per minute
        if(this.itemsArray[index].isIncrementModifier)
          this.acctSer.multiplierIncrease(this.itemsArray[index].increaseToStat);
        else
          this.acctSer.perMinuteIncrease(this.itemsArray[index].increaseToStat);
      }
    }
}
