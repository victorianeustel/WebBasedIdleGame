import { Component, OnInit } from '@angular/core';
import { item } from 'src/item';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  items: item[] = [];
  constructor(private itemService: ItemsService) {}

  ngOnInit(): void {
    this.items = this.itemService.itemsArray;
  }
}
