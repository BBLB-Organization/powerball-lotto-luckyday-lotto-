import { Component, OnInit } from '@angular/core';

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

  lotteryHomepageWindow : any;
  randomLotteryNumberFinished: boolean = false;
  finalComparison : boolean = false;

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
    this.pickedNumbers = this.pickedNumbers.sort((n1,n2) => n1 - n2);
  }

  playNumbers(){
    if(this.pickedNumbers.length != 5){
      alert("Please pick five numbers to play");
    }
    else{
      this.finalComparison = true;
    }
  }

  clearNumbers() {
    this.pickedNumbers = [];
    if(this.finalComparison){
      this.randomLotteryNumbersSelected = [];
      this.lotteryHomepageWindow.location.reload();
    }
  }

  getRandom() {
    const minNumber: number = 1;
    const maxNumber: number = 45;
    const floatRandom = Math.random()
    const difference = maxNumber - minNumber;
    // random between 0 and the difference
    const random = Math.round(difference * floatRandom)
    const randomWithinRange = random + minNumber;
    console.log(randomWithinRange);
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

  constructor() {
    this.lotteryHomepageWindow = window;
   }

  ngOnInit(): void {
    do {
      this.getRandom();
    } while (!this.randomLotteryNumberFinished);
    this.randomLotteryNumbersSelected = this.randomLotteryNumbersSelected.sort((n1,n2) => n1 - n2);
    console.log(this.randomLotteryNumbersSelected);
  }

}
