import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { CookieService } from 'ngx-cookie-service';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import { AppComponent } from './app.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { InformationComponent } from './information/information.component';
import { ClickButtonComponent } from './click-button/click-button.component';
import { ScoreComponent } from './score/score.component';
import { ItemComponent } from './item/item.component';
import { StoreComponent } from './store/store.component';
import { InventoryComponent } from './inventory/inventory.component';
import { HttpClientModule } from '@angular/common/http';
import {SettingsMenuComponent} from './settings-menu/settings-menu.component';

import { AccountService } from './account.service';
import { ItemsService } from './items.service'
import { HighScoresComponent } from './high-scores/high-scores.component';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    InstructionsComponent,
    InformationComponent,
    ClickButtonComponent,
    ScoreComponent,
    SettingsMenuComponent,
    ItemComponent,
    StoreComponent,
    InventoryComponent,
    HighScoresComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatButtonModule,
    MatCardModule,
    ScrollingModule,
    MatDividerModule,
    HttpClientModule,
  ],
  providers: [AccountService, ItemsService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
