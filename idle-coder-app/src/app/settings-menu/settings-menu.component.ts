import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.css']
})
export class SettingsMenuComponent implements OnInit {

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
  }
  SaveHash: string = '';

  new(){
    this.cookieService.set('SaveHash','');
  }
  load(){
    try{
      this.SaveHash = this.cookieService.get('SaveHash');
      //Send SaveHash to appropriate load function
    }
    catch{Error}
  }
  //This method could be called by the autoSave method
  save(){
    //Get save hash from save function and set SaveHash equal to it
    this.cookieService.set('SaveHash', this.SaveHash);
  }
}
