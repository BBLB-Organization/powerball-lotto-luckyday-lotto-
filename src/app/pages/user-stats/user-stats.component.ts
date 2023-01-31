import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.css']
})
export class UserStatsComponent implements OnInit {

  listOfCardTitles: string [] = ["TOTAL GAMES PLAYED","TOTAL GAMES WON", "MATCHED 2 BALLS", "MATCHED 3 BALLS", "MATCHED 4 BALLS", "JACKPOT!"];
  tempNumberList : number [] = [187, 35, 30, 5, 0, 0];


  constructor(){}


  ngOnInit(): void {
  }
  

}
