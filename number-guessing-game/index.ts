import { Guess } from "./src/models/Guess";
import { GameEngine } from "./src/services/GameEngine";
import { ConsoleView } from "./src/views/ConsoleView";

async function playRound(ui: ConsoleView): Promise<void> {
    const level = await ui.selectDifficulty();

    const game = new GameEngine(level);
    const remainingAttempts = game.getRemainingAttempts();
    const targetNumber = game.getTarget();

    ui.displayGameStart(level, remainingAttempts);

    while (!game.isGameOver()) {
        const guess = await ui.getGuess();
        if (guess === null) continue;

        const result = game.checkGuess(guess);
        if (result === Guess.win) {
            ui.displayWin(game.getAttemptsUsed());
            ui.close();
            return;
        }

        ui.displayFeedback(result, guess);
    }
    ui.displayLoss(targetNumber);
}

async function main() {
    const ui = new ConsoleView();
    ui.displayWelcome()
    let playAgain = true;

    while (playAgain) {
        await playRound(ui);
        playAgain = await ui.askPlayAgain();
    }
    console.log("\nThanks for playing!");
    ui.close();
}

main();
