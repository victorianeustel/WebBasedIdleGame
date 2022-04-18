import { Component, ViewChild } from '@angular/core';
import { InformationComponent } from '../information/information.component';
import { InstructionsComponent } from '../instructions/instructions.component';
import { StoreComponent } from '../store/store.component';
import { HighScoresComponent } from '../high-scores/high-scores.component';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent  {
  @ViewChild(MatAccordion) accordion: MatAccordion = new MatAccordion;

  constructor() { }

  ngOnInit(): void {
  }
}
