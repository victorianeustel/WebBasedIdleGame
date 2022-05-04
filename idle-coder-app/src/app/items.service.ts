import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { item } from 'src/item';
import { AccountService } from './account.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  http: any;
  static itemsArray: item[];

  constructor(public acctSer: AccountService, private snackBar: MatSnackBar) { }

    //Default items instantiated
    itemsArray: item[] = [
      {name:"Typing Lessons", desc:"Clicks are worth 1 more!", price:50, isIncrementModifier:true, increaseToStat:1, numPurchased:0, purchaseLimit:50},
      {name:"Mouse on a Wheel", desc:"+60 Score per Minute!", price: 50, isIncrementModifier:false, increaseToStat:60, numPurchased:0, purchaseLimit:50},
      {name:"New Keyboard", desc:"Clicks are worth 5 more!", price:150, isIncrementModifier:true, increaseToStat:5, numPurchased:0, purchaseLimit:50},
      {name:"Hamsters on Wheels", desc:"+300 Score per Minute!", price: 200, isIncrementModifier:false, increaseToStat:300, numPurchased:0, purchaseLimit:50},
      {name:"New Computer", desc:"Clicks are worth 200 more!", price:5000, isIncrementModifier:true, increaseToStat:200, numPurchased:0, purchaseLimit:50},
      {name:"Hire a Developer", desc:"+5000 Score per Minute!", price: 7500, isIncrementModifier:false, increaseToStat:1000, numPurchased:0, purchaseLimit:50},
      {name:"Coffee", desc:"Clicks are worth 500 more!", price:10000, isIncrementModifier:true, increaseToStat:500, numPurchased:0, purchaseLimit:50},
    ];

    //purchasing currently does nothing if you do not have enough points to purchase
    purchase(index: number){
      //if enough points to purchase given item
      if(this.acctSer.score >= this.itemsArray[index].price){
        //increase the purchase counter
        this.itemsArray[index].numPurchased += 1;
        //take the points away from the user according to the cost
        this.acctSer.score -= this.itemsArray[index].price;

        this.openSnackBar(this.itemsArray[index].name + " has been added to inventory!")

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

    openSnackBar(message: string) {
      this.snackBar.open(message);
    }
}
