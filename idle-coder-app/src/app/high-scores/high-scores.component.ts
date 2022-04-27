import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { highScore } from '../highScore';

@Component({
  selector: 'app-high-scores',
  templateUrl: './high-scores.component.html',
  styleUrls: ['./high-scores.component.css']
})
export class HighScoresComponent implements OnInit {

  constructor(private acctServ: AccountService) { }

  scores: highScore[] = [];

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
    console.log(data);
  });
    this.fetchData();
    this.fetchData();
  }

  fetchData() {
    this.scores=[];
    this.acctServ.getHighScores().subscribe((data) => {
      this.scores = data;
    });
  }
}
