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
  }

  pickNumbers() {
    this.pickedNumbers = [];
  }



  constructor() { }

  ngOnInit(): void {
  }

}
