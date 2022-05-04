import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { highScore } from '../highScore';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatInput } from '@angular/material/input';


@Component({
  selector: 'app-high-scores',
  templateUrl: './high-scores.component.html',
  styleUrls: ['./high-scores.component.css']
})
export class HighScoresComponent implements OnInit {

  constructor(private acctServ: AccountService, private _snackBar: MatSnackBar) { }

  scores: highScore[] = [];
  columns: string[] = ['position', 'name', 'score'];

  ngOnInit(): void {
    this.fetchData();
  }

  scoreRecord: highScore = {
    name: '',
    score: this.acctServ.score,
  }

  addHighScore(name:string){
    this.scoreRecord = {name: name, score: this.acctServ.score}
    this.acctServ.addHighScore(this.scoreRecord).subscribe((data) => {
      this.fetchData();
    });
    this.openSnackBar("High score added!", "close")

  }

  fetchData() {
    this.scores=[];
    this.acctServ.getHighScores().subscribe((data) => {
      data.sort((a, b) => b.score - a.score);
      this.scores = data;
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
       duration: 3500,
    });
 } 
}
