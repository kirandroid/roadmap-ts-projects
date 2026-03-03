import { Guess } from "./src/models/Guess";
import { GameEngine } from "./src/services/GameEngine";
import { Timer } from "./src/utils/Timer";
import { ConsoleView } from "./src/views/ConsoleView";

async function playRound(ui: ConsoleView): Promise<void> {
  const level = await ui.selectDifficulty();

  const game = new GameEngine(level);
  const remainingAttempts = game.getRemainingAttempts();
  const targetNumber = game.getTarget();
  console.log(targetNumber);

  ui.displayGameStart(level, remainingAttempts);

  const timer = new Timer();
  while (!game.isGameOver()) {
    timer.start();
    const guess = await ui.getGuess();
    if (guess === null) continue;

    const result = game.checkGuess(guess);
    if (result === Guess.win) {
      let timeElapsed = timer.stop();
      ui.displayWin(game.getAttemptsUsed());
      console.log(`Time took to solve: ${timeElapsed / 1000} seconds`);
      return;
    }

    ui.displayFeedback(result, guess);
  }
  ui.displayLoss(targetNumber);
}

async function main() {
  const ui = new ConsoleView();
  ui.displayWelcome();
  let playAgain = true;

  while (playAgain) {
    await playRound(ui);
    playAgain = await ui.askPlayAgain();
  }
  console.log("\nThanks for playing!");
  ui.close();
}

main();
