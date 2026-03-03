# Number Guessing Game

https://roadmap.sh/projects/number-guessing-game
A simple command-line game where you try to guess a random number between 1 and 100.

## How to Play

1. Run the game and choose a difficulty level:
   - Easy: 10 attempts
   - Medium: 5 attempts
   - Hard: 3 attempts

2. The computer picks a random number between 1 and 100.

3. Enter your guesses and receive feedback on whether the target number is higher or lower.

4. Win by guessing correctly before running out of attempts.

## Running the Game

```bash
bun install
bun run index.ts
```

## Project Structure

The project follows a simple layered architecture:

- `index.ts` - Main entry point that orchestrates the game flow
- `src/services/GameEngine.ts` - Core game logic (number generation, guess validation, game state)
- `src/views/ConsoleView.ts` - User interface (console input/output, display messages)
- `src/models/` - Data models (Level enum, Guess enum)

This separation keeps game logic independent from user interaction, making the code easier to test and maintain.
