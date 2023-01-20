import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageComponent } from './homepage.component';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
  let fakeNumber: number = 1;
  let fakePickedNumbersList: number[] = [1, 2, 3, 4, 5];
  let mockWindow = {
    location: {
      reload() {
        return 'something'
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomepageComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    component.lotteryHomepageWindow = mockWindow;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //pickNumber() method test region

  it('should pick the correct number when the user clicks the bubble and adds it to the pickedNumbers array', () => {
    component.pickNumber(fakeNumber);
    expect(component.pickedNumbers.length).toBeGreaterThan(0);
  });

  it('should pick the correct number when the user clicks the bubble but since the user clicks the same number, it removes it from the pickedNumbers array', () => {
    component.pickNumber(fakeNumber);
    component.pickNumber(fakeNumber);
    expect(component.pickedNumbers.length).toEqual(0);
  });

  it('should sort the numbers in the pickedNumbers array when the user adds them', () => {
    component.pickNumber(1);
    component.pickNumber(4);
    component.pickNumber(5);
    component.pickNumber(3);
    component.pickNumber(2);
    expect(component.pickedNumbers.length).toBeGreaterThan(0);
  });

  //pickNumber() method test region END

  //playNumbers() method test region

  it('should alert the user if there arent five numbers played yet', () => {
    spyOn(window, "alert");
    component.playNumbers();
    expect(window.alert).toHaveBeenCalledWith("Please pick five numbers to play");
  });

  it('should play the numbers the user wants to play when there are five numbers the user has selected, none of which are the same', () => {
    component.pickedNumbers = fakePickedNumbersList;
    component.playNumbers();
    expect(component.finalComparison).toBeTrue();
  });

  //playNumbers() method test region END

  //clearNumbers() method test region

  it('should clear all numbers in pickedNumbers array when user clicks clear button', () => {
    component.pickedNumbers = fakePickedNumbersList;
    component.clearNumbers();
    expect(component.pickedNumbers.length).toEqual(0);
  });

  it('should clear all selections and reload the webpage for the user to play again', () => {
    component.pickedNumbers = fakePickedNumbersList;
    component.finalComparison = true;
    component.clearNumbers();
    expect(component.randomLotteryNumbersSelected.length).toEqual(0);
  });

  //clearNumbers() method test region END

});
