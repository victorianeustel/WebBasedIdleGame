import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-click-button',
  templateUrl: './click-button.component.html',
  styleUrls: ['./click-button.component.css']
})
export class ClickButtonComponent implements OnInit {

  constructor(public accSer : AccountService) { }

  ngOnInit(): void {
  }
  
}
