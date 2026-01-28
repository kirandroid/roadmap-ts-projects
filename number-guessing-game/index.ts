import { stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline/promises";

const rl = readline.createInterface({ input, output });

enum Level {
    easy = "Easy",
    medium = "Medium",
    hard = "Hard"
}

function getLevel(choice: string): Level | undefined {
    switch (choice) {
        case "1": return Level.easy;
        case "2": return Level.medium;
        case "3": return Level.hard;
        default: return undefined;
    }
}

function getLevelChances(level: Level): number {
    switch (level) {
        case Level.easy:
            return 10;
        case Level.medium:
            return 5;
        case Level.hard:
            return 3;
    }
}

async function run() {
    const winningNumber = Math.floor(Math.random() * 100) + 1;
    console.log(winningNumber);


    console.log("Welcome to the Number Guessing Game!");

    console.log("I'm thinking of a number between 1 and 100.");
    console.log("You have 5 chances to guess the correct number.\n\n");

    console.log("Please select the difficulty level:");
    console.log("1. Easy (10 chances)");
    console.log("2. Medium (5 chances)");
    console.log("3. Hard (3 chances)");

    let levelInput = await rl.question("Enter your choice: ");
    let level = getLevel(levelInput);

    while (level == undefined) {
        console.log("**Invalid choice, choose from 1-3!**");
        levelInput = await rl.question("Enter your choice: ");
        level = getLevel(levelInput);
    }
    const levelChances = getLevelChances(level);
    let chancesLeft = levelChances;

    console.log(`Great!, You have selected the ${level} difficulty level.`);
    console.log("Let's start the game!");

    while (chancesLeft != 0) {
        const attempt = levelChances - chancesLeft;
        let userGuessInput = await rl.question("Enter your guess: ");
        let userGuess = Number(userGuessInput);
        if (isNaN(userGuess) || userGuessInput.trim() === "") {
            console.log("This is not a valid number! Please try again.");
            continue;
        }

        if (userGuess < 1 || userGuess > 100) {
            console.log("Please guess a number between 1 and 100.");
            continue;
        }

        if (userGuess === winningNumber) {
            console.log(`Congratulations! You guessed the correct number in ${attempt} attempts.`);
            break;
        }

        if (winningNumber < userGuess) {
            console.log(`Incorrect! The number is less than ${userGuess}`);
        }

        if (winningNumber > userGuess) {
            console.log(`Incorrect! The number is greater than ${userGuess}`);
        }

        chancesLeft--;
    }

    rl.close();
}

run();