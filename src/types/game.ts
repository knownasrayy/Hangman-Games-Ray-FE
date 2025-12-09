// src/types/game.ts (CODE FULL KONFIRMASI)

/**
 * Status permainan:
 * - 'playing': Permainan sedang berlangsung.
 * - 'won': Pemain berhasil menebak kata.
 * - 'lost': Pemain gagal (Hangman sudah selesai digantung).
 */
export type GameStatus = 'playing' | 'won' | 'lost';

/**
 * Interface untuk state utama game Hangman
 */
export interface HangmanState {
  targetWord: string; // Kata yang harus ditebak (uppercase)
  guessedLetters: Set<string>; // Huruf yang sudah ditebak
  incorrectGuesses: number; // Jumlah tebakan salah
  maxIncorrectGuesses: number; // Batas tebakan salah (misalnya 6 atau 7)
  status: GameStatus; // Status permainan
  clue: string; // Clue untuk kata
}