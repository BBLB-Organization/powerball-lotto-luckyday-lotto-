import { Component, OnInit } from '@angular/core';
import { UserStats } from 'src/app/models/user-stats.model';
import { UserStatsService } from 'src/app/services/user-stats.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  luckyDayLottoNumPicksLength: number = 5;
  numbers = Array.from({ length: 45 }, (_, i) => i + 1);
  numberRows = Array.from({ length: 7 }, (_, i) => this.numbers.slice(i * 7, (i * 7) + 7));
  pickedNumbers: number[] = [];
  randomLotteryNumbersSelected: number[] = [];
  quickPickList: number[] = [];
  userStats: UserStats = new UserStats(null, "", new Date(), new Date(), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

  lotteryHomepageWindow: any;
  randomLotteryNumberFinished: boolean = false;
  quickPickSelectionFinished: boolean = false;
  finalComparison: boolean = false;
  totalNumberOfMatches: number = 0;

  pickNumber(number: number) {
    number = number + 1;  //Fixes the numbers since it's off by one

    //Checks if picked numbers hasn't exceeded 5 and number hasn't been picked twice
    if (this.pickedNumbers.length < this.luckyDayLottoNumPicksLength && !this.pickedNumbers.includes(number)) {
      this.pickedNumbers.push(number);
    }
    //Checks if number has been picked twice
    else if (this.pickedNumbers.includes(number)) {
      this.pickedNumbers = this.pickedNumbers.filter(a => a != number);
    }
    this.pickedNumbers = this.pickedNumbers.sort((n1, n2) => n1 - n2);
  }

  playNumbers() {
    if (this.pickedNumbers.length != 5) {
      alert("Please pick five numbers to play");
    }
    else {
      this.totalNumberOfMatches = 0;
      this.userStats.totalMoneySpent = this.userStats.totalMoneySpent + 1;
      this.userStats.totalGamesPlayed = this.userStats.totalGamesPlayed + 1;
      this.finalComparison = true;
      let matchedTwoWinnings = 1;
      let matchedThreeWinnings = 15;
      let matchedFourWinnings = 200;
      let matchedFiveWinnings = 500000;
      //console.log("This is current user stats: " + this.userStats.username);
      for (let number of this.pickedNumbers) {
        if (this.randomLotteryNumbersSelected.includes(number)) {
          this.totalNumberOfMatches = this.totalNumberOfMatches + 1;
        }
      }

      if (this.totalNumberOfMatches == 2) {
        this.userStats.totalGamesWon = this.userStats.totalGamesWon + 1;
        this.userStats.totalGamesWonWhereMatchedTwo = this.userStats.totalGamesWonWhereMatchedTwo + 1;
        this.userStats.totalMatchedTwoWinnings = this.userStats.totalMatchedTwoWinnings + matchedTwoWinnings;
      }
      else if (this.totalNumberOfMatches == 3) {
        this.userStats.totalGamesWon = this.userStats.totalGamesWon + 1;
        this.userStats.totalGamesWonWhereMatchedThree = this.userStats.totalGamesWonWhereMatchedThree + 1;
        this.userStats.totalMatchedThreeWinnings = this.userStats.totalMatchedThreeWinnings + matchedThreeWinnings;
      }
      else if (this.totalNumberOfMatches == 4) {
        this.userStats.totalGamesWon = this.userStats.totalGamesWon + 1;
        this.userStats.totalGamesWonWhereMatchedFour = this.userStats.totalGamesWonWhereMatchedFour + 1;
        this.userStats.totalMatchedFourWinnings = this.userStats.totalMatchedFourWinnings + matchedFourWinnings;
      }
      else if (this.totalNumberOfMatches == 5) {
        this.userStats.totalGamesWon = this.userStats.totalGamesWon + 1;
        this.userStats.totalGamesWonWhereMatchedFive = this.userStats.totalGamesWonWhereMatchedFive + 1;
        this.userStats.totalMatchedFiveWinnings = this.userStats.totalMatchedFiveWinnings + matchedFiveWinnings;
      }

      let updatedUserStats = this.prepareSave();
      this.userStatsService.updateUserStats(updatedUserStats).subscribe();
    }
  }

  clearNumbers() {
    this.pickedNumbers = [];
    if (this.finalComparison) {
      this.randomLotteryNumbersSelected = [];
      this.lotteryHomepageWindow.location.reload();
    }
  }

  getRandom() {
    let randomWithinRange = this.randomNumberGenerator();
    if (this.randomLotteryNumbersSelected.includes(randomWithinRange)) {
      return;
    }
    else {
      this.randomLotteryNumbersSelected.push(randomWithinRange);
      if (this.randomLotteryNumbersSelected.length == 5) {
        this.randomLotteryNumberFinished = true;
      }
    }
  }

  quickPick() {
    this.quickPickList = [];
    if (this.quickPickSelectionFinished) {
      this.quickPickSelectionFinished = false;
    }
    do {
      let randomWithinRange = this.randomNumberGenerator();
      if (this.quickPickList.includes(randomWithinRange)) {
        continue;
      }
      else {
        this.quickPickList.push(randomWithinRange);
        if (this.quickPickList.length == 5) {
          this.quickPickSelectionFinished = true;
        }
      }
    } while (!this.quickPickSelectionFinished);
    this.quickPickList = this.quickPickList.sort((n1, n2) => n1 - n2);
    this.pickedNumbers = this.quickPickList;
  }

  randomNumberGenerator(): number {
    const minNumber: number = 1;
    const maxNumber: number = 45;
    const floatRandom = Math.random()
    const difference = maxNumber - minNumber;
    // random between 0 and the difference
    const random = Math.round(difference * floatRandom);
    const randomWithinRange = random + minNumber;
    return randomWithinRange;
  }

  constructor(private userStatsService: UserStatsService) {
    this.lotteryHomepageWindow = window;
  }

  ngOnInit(): void {
    this.onReload();
    do {
      this.getRandom();
    } while (!this.randomLotteryNumberFinished);
    this.randomLotteryNumbersSelected = this.randomLotteryNumbersSelected.sort((n1, n2) => n1 - n2);
  }

  prepareSave() {
    return new UserStats(
      this.userStats.id,
      this.userStats.username,
      this.userStats.joinedDate,
      this.userStats.lastSeenDate,
      this.userStats.totalMoneySpent,
      this.userStats.totalMatchedTwoWinnings,
      this.userStats.totalMatchedThreeWinnings,
      this.userStats.totalMatchedFourWinnings,
      this.userStats.totalMatchedFiveWinnings,
      this.userStats.totalGamesPlayed,
      this.userStats.totalGamesWon,
      this.userStats.totalGamesWonWhereMatchedTwo,
      this.userStats.totalGamesWonWhereMatchedThree,
      this.userStats.totalGamesWonWhereMatchedFour,
      this.userStats.totalGamesWonWhereMatchedFive
    )
  }

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

      }
    });
  }


}
