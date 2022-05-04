import { Component } from '@angular/core';
import { item } from 'src/item';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent{
  constructor(public itmServ: ItemsService) {}
}