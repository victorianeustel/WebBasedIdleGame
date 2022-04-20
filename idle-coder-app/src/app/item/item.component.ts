import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { ItemsService } from '../items.service';
import { item } from 'src/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(public acctServ: AccountService, public itmServ: ItemsService) { }

  ngOnInit(): void {
  }

  @Input() index = 0;
}
