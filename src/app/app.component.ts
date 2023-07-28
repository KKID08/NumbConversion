import { Component } from '@angular/core';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './app.component.dark.css'],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }, { provide: LocationStrategy, useClass: HashLocationStrategy },]
  
})
export class AppComponent {
  fromSystem: string = 'binary';
  toSystem: string = 'decimal';
  userAnswer: string = '';
  minDecimalValue: number = 1;
  maxDecimalValue: number = 10;
  numberToConvert: string = this.generateRandomNumber();
  feedback: string = '';
  darkMode: boolean = false;
  languageGerman: boolean = false;
  isSpinning: boolean[] = [false, false];

  toggleLanguage() {
    // Start spinning animation
    this.isSpinning[0] = true;

    // Stop spinning after 1 second (adjust duration as needed)
    setTimeout(() => {
      this.languageGerman = !this.languageGerman;
    }, 255);

    setTimeout(() => {
      this.isSpinning[0] = false;
    }, 255);
  }

  toggleDarkMode() {// Start spinning animation
    this.isSpinning[1] = true;

    // Stop spinning after 1 second (adjust duration as needed)
    setTimeout(() => {
      this.darkMode = !this.darkMode;
    }, 255);

    setTimeout(() => {
      this.isSpinning[1] = false;
    }, 255);
  }

  updateNumberToConvert() {
    if (this.minDecimalValue <= 0 || this.maxDecimalValue <= 0) {
      // Reset values if either min or max is zero or negative
      this.minDecimalValue = 1;
      this.maxDecimalValue = 10;
      this.numberToConvert = this.generateRandomNumber();
    } else {
      // Generate a new random number within the valid range
      this.numberToConvert = this.generateRandomNumber();
    }
  }
  
  generateRandomNumber(): string {
    const decimalNumber = Math.floor(
      Math.random() * (this.maxDecimalValue - this.minDecimalValue + 1) + this.minDecimalValue
    );

    if (this.fromSystem === 'binary') {
      return decimalNumber.toString(2) + '₂';
    } else if (this.fromSystem === 'hexadecimal') {
      return decimalNumber.toString(16).toUpperCase() + '₁₆';
    } else {
      return decimalNumber.toString() + '₁₀';
    }
  }

  getAnswer(): string {
    let decimalNum: number = 0;
    if (this.fromSystem === 'binary') {
      decimalNum = parseInt(this.numberToConvert, 2);
    } else if (this.fromSystem === 'hexadecimal') {
      decimalNum = parseInt(this.numberToConvert, 16);
    } else {
      decimalNum = parseInt(this.numberToConvert, 10);
    }

    if (this.toSystem === 'binary') {
      return decimalNum.toString(2) + '₂';
    } else if (this.toSystem === 'hexadecimal') {
      return decimalNum.toString(16).toUpperCase() + '₁₆';
    } else {
      return decimalNum.toString() + '₁₀';
    }
  }

  checkAnswer() {
    if(this.userAnswer === '') return;

    let realUserAwswer = this.userAnswer;
    if (this.toSystem === 'binary') {
      realUserAwswer += '₂';
    } else if (this.toSystem === 'hexadecimal') {
      realUserAwswer += '₁₆';
    } else {
      realUserAwswer += '₁₀';
    }

    if (realUserAwswer.replace(/^0+/, '') === this.getAnswer()) {
      this.feedback = 'Correct!';

      let isEqual = true;
      // Generate a new random number after checking the answer
      while (isEqual)
      {
        let rnd = this.generateRandomNumber();
        if (this.numberToConvert != rnd || this.minDecimalValue == this.maxDecimalValue)
        {
          isEqual = false;
          this.numberToConvert = rnd;
        }
      }
    } else {
      this.feedback = 'Incorrect!';
    }

    // Clear the user's answer
    this.userAnswer = '';
  }

  fromSystemChange() {
    // Generate a new random number when the 'fromSystem' is changed
    this.numberToConvert = this.generateRandomNumber();
  }
}
