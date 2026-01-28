import { stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline/promises";
import { Level } from "../models/Level";
import { Guess } from "../models/Guess";

export class ConsoleView {
  private rl: readline.Interface;
  constructor() {
    this.rl = readline.createInterface({ input, output });
  }

  displayWelcome() {
    console.clear();
    console.log("Welcome to the Number Guessing Game!");

    console.log("I'm thinking of a number between 1 and 100.\n");
  }

  displayDifficultyMenu() {
    console.log("Please select the difficulty level:");
    console.log("1. Easy (10 chances)");
    console.log("2. Medium (5 chances)");
    console.log("3. Hard (3 chances)");
  }

  async selectDifficulty(): Promise<Level> {
    this.displayDifficultyMenu();
    let level: Level | undefined;
    while (!level) {
      const input = await this.rl.question("Enter your choice: ");
      level = this.parseLevel(input);

      if (!level) {
        console.log("**Invalid choice, choose from 1-3!**");
      }
    }
    return level;
  }

  private parseLevel(input: string): Level | undefined {
    switch (input) {
      case "1":
        return Level.easy;
      case "2":
        return Level.medium;
      case "3":
        return Level.hard;
      default:
        return undefined;
    }
  }

  displayGameStart(level: Level, remainingAttempts: number): void {
    console.log(`\nGreat!, You have selected the ${level} difficulty level.`);
    console.log(
      `You have ${remainingAttempts} chances to guess the correct number.\n`,
    );
    console.log("Let's start the game!");
  }

  async getGuess(): Promise<number | null> {
    const input = await this.rl.question("Enter your guess: ");
    const guess = Number(input);
    if (isNaN(guess) || input.trim() === "") {
      console.log("This is not a valid number! Please try again.");
      return null;
    }
    if (guess < 1 || guess > 100) {
      console.log("Please guess a number between 1 and 100.");
      return null;
    }
    return guess;
  }

  displayFeedback(result: Guess, guess: number) {
    if (result === Guess.tooHigh) {
      console.log(`Incorrect! The number is less than ${guess}`);
    } else {
      console.log(`Incorrect! The number is greater than ${guess}`);
    }
  }

  displayWin(attempts: number): void {
    console.log(
      `Congratulations! You guessed the correct number in ${attempts} attempts.`,
    );
  }

  displayLoss(targetNumber: number): void {
    console.log("\nGame over! You've run out of chances.");
    console.log(`The correct number is ${targetNumber}`);

  }

  async askPlayAgain(): Promise<boolean> {
    console.log("\nWould you like to play again?");
    const input = await this.rl.question("Enter 'y' for yes or 'n' for no: ");
    const normalized = input.trim().toLowerCase();

    if (normalized === 'y' || normalized === 'yes') {
      return true;
    }
    if (normalized === 'n' || normalized === 'no') {
      return false;
    }

    console.log("Invalid input. Please enter 'y' or 'n'.");
    return this.askPlayAgain();
  }

  close() {
    this.rl.close();
  }
}
