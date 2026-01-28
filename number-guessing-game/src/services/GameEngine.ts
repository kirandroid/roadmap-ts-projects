import { Guess } from "../models/Guess";
import { Level } from "../models/Level";

export class GameEngine {
  private targetNumber: number;
  private maxAttempts: number;
  private attemptsUsed: number = 0;

  constructor(level: Level, numberGenerator?: number) {
    const generator = numberGenerator || Math.floor(Math.random() * 100) + 1;
    this.targetNumber = generator;
    this.maxAttempts = this.getMaxAttempts(level);
  }

  private getMaxAttempts(level: Level): number {
    switch (level) {
      case Level.easy:
        return 10;
      case Level.medium:
        return 5;
      case Level.hard:
        return 3;
    }
  }

  checkGuess(guess: number): Guess {
    this.attemptsUsed++;
    if (guess === this.targetNumber) return Guess.win;
    if (guess > this.targetNumber) return Guess.tooHigh;
    return Guess.tooLow;
  }

  getRemainingAttempts(): number {
    return this.maxAttempts - this.attemptsUsed;
  }

  getAttemptsUsed(): number {
    return this.attemptsUsed;
  }

  getTarget(): number {
    return this.targetNumber;
  }

  isGameOver(): boolean {
    return this.getRemainingAttempts() === 0;
  }
}
