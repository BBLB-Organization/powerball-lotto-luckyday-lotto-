import { Component, OnInit } from '@angular/core';
import { UserStats } from 'src/app/models/user-stats.model';
import { UserStatsService } from 'src/app/services/user-stats.service';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.css']
})
export class UserStatsComponent implements OnInit {

  listOfCardTitles: string[] = ["TOTAL GAMES PLAYED", "TOTAL GAMES WON", "MATCHED 2 BALLS", "MATCHED 3 BALLS", "MATCHED 4 BALLS", "JACKPOT!"];
  tempNumberList: number[] = [187, 35, 30, 5, 0, 0];
  userStats!: UserStats;


  constructor(private userStatsService: UserStatsService) { }


  ngOnInit(): void {
    let username: string | null = "";
    username = localStorage.getItem("username");
    this.userStatsService.getUserStats(username).subscribe({
      next: (userInfo: UserStats) => {
        this.userStats.joinedDate
      }
    });
  }


}
