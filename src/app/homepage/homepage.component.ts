import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  luckyDayLottoNumPicksLength: number = 5;
  numbers = Array.from({length: 49}, (_, i) => i + 1);
  numberRows = Array.from({length: 7}, (_, i) => this.numbers.slice(i*7, (i*7)+7));
  pickedNumbers: number[] = [];

  pickNumber(number: number) {
    if (this.pickedNumbers.length < this.luckyDayLottoNumPicksLength) {
        this.pickedNumbers.push(number + 1);
    }
  }

  pickNumbers() {
    this.pickedNumbers = [];
  }



  constructor() { }

  ngOnInit(): void {
  }

}
