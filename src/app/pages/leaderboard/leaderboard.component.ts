import { Component, OnInit } from '@angular/core';
import { Leaderboard } from 'src/app/models/Leaderboard/leaderboard';
import { PageOfItems } from 'src/app/models/PageOfItems/page-of-items';
import { LeaderboardService } from 'src/app/services/LeaderboardService/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  constructor(private leaderboardService: LeaderboardService){}
  initPageNumber = 0;
  hasNext: boolean = true;
  totalElements: number = 0;
  individualLeaderboard: Leaderboard[] = [];

  ngOnInit(){
    this.loadLeaderboard();
  }

  loadLeaderboard(){
    this.leaderboardService.getLeaderboard(this.initPageNumber).subscribe((res)=>{
      console.log(...res.list)
      this.individualLeaderboard.push(...res.list);
      this.hasNext = res.hasNext;
      this.totalElements = res.totalElements;
    });
  }

}
