import { describe, expect, test } from "bun:test";
import { GameEngine } from "../src/services/GameEngine";
import { Level } from "../src/models/Level";
import { Guess } from "../src/models/Guess";

describe("GameEngine", () => {
    test("should set correct max attempts for Easy level", () => {
        const game = new GameEngine(Level.easy);
        expect(game.getRemainingAttempts()).toBe(10);
    });

    test("should set correct max attempts for Medium level", () => {
        const game = new GameEngine(Level.medium);
        expect(game.getRemainingAttempts()).toBe(5);
    });

    test("should set correct max attempts for Hard level", () => {
        const game = new GameEngine(Level.hard);
        expect(game.getRemainingAttempts()).toBe(3);
    });

    test("should decrease remaining attempts after a guess", () => {
        const game = new GameEngine(Level.hard);
        const initialAttempts = game.getRemainingAttempts();
        game.checkGuess(50);
        expect(game.getRemainingAttempts()).toBe(initialAttempts - 1);
        expect(game.getAttemptsUsed()).toBe(1);
    });

    test("should return win when guess matches target", () => {
        const game = new GameEngine(Level.easy, 42);
        const result = game.checkGuess(42);
        expect(result).toBe(Guess.win);
    });

    test("should return HIGH when guess number is higher than target", () => {
        const game = new GameEngine(Level.easy, 50);
        const result = game.checkGuess(55);
        expect(result).toBe(Guess.tooHigh);
    })


    test("should return LOW when guess number is smaller than target", () => {
        const game = new GameEngine(Level.easy, 50);
        const result = game.checkGuess(45);
        expect(result).toBe(Guess.tooLow);
    })

    test("should mark game as over when attempts run out", () => {
        const game = new GameEngine(Level.hard);
        game.checkGuess(1);
        game.checkGuess(2);
        expect(game.isGameOver()).toBe(false);

        game.checkGuess(3);
        expect(game.isGameOver()).toBe(true);
    });
});