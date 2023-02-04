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
  statsList: number[] = [187, 35, 30, 5, 0, 0];
  userStats: UserStats = new UserStats(null,"", new Date(), new Date(), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  totalWinningsEarned: number = 0;


  constructor(private userStatsService: UserStatsService) { }

  onReload() {
    let username: string | null = "";
    username = localStorage.getItem("username");

    this.userStatsService.getUserStats(username).subscribe({
      next: (userInfo: UserStats) => {
        this.userStats = {
          id: userInfo.id,
          username: userInfo.username,
          joinedDate: userInfo.joinedDate,
          lastSeenDate: userInfo.lastSeenDate,
          totalMoneySpent: userInfo.totalMoneySpent,
          totalMatchedTwoWinnings: userInfo.totalMatchedTwoWinnings,
          totalMatchedThreeWinnings: userInfo.totalMatchedThreeWinnings,
          totalMatchedFourWinnings: userInfo.totalMatchedFourWinnings,
          totalMatchedFiveWinnings: userInfo.totalMatchedFiveWinnings,
          totalGamesPlayed: userInfo.totalGamesPlayed,
          totalGamesWon: userInfo.totalGamesWon,
          totalGamesWonWhereMatchedTwo: userInfo.totalGamesWonWhereMatchedTwo,
          totalGamesWonWhereMatchedThree: userInfo.totalGamesWonWhereMatchedThree,
          totalGamesWonWhereMatchedFour: userInfo.totalGamesWonWhereMatchedFour,
          totalGamesWonWhereMatchedFive: userInfo.totalGamesWonWhereMatchedFive
        };

        this.statsList = [];
        this.statsList = [this.userStats.totalGamesPlayed, this.userStats.totalGamesWon, this.userStats.totalGamesWonWhereMatchedTwo, this.userStats.totalGamesWonWhereMatchedThree, this.userStats.totalGamesWonWhereMatchedFour, this.userStats.totalGamesWonWhereMatchedFive];

        this.totalWinningsEarned = this.userStats.totalMatchedTwoWinnings + this.userStats.totalMatchedThreeWinnings + this.userStats.totalMatchedFourWinnings + this.userStats.totalMatchedFiveWinnings;

      }
    });

  }


  ngOnInit(): void {
    this.onReload();
  }


}
