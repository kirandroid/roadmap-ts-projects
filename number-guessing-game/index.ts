import { Guess } from "./src/models/Guess";
import { GameEngine } from "./src/services/GameEngine";
import { ConsoleView } from "./src/views/ConsoleView";

async function main() {
    const ui = new ConsoleView();

    ui.displayWelcome();

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
    ui.close();
}

main();
