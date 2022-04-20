import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { ItemsService } from '../items.service';
import { item } from 'src/item';



@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  constructor(public acctServ: AccountService, public itmServ: ItemsService) { }

  items: item[] = [];

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.items = this.itmServ.itemsArray;
  }
}
