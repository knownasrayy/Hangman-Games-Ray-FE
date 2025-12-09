// src/components/Keyboard.tsx

import React from 'react';
import { Button } from './ui/button'; 

interface KeyboardProps {
  guessedLetters: Set<string>;
  onGuess: (letter: string) => void;
  gameStatus: 'playing' | 'won' | 'lost'; 
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const Keyboard: React.FC<KeyboardProps> = ({ 
  guessedLetters, 
  onGuess, 
  gameStatus 
}) => {
  const isGameActive = gameStatus === 'playing';

  return (
    <div className="grid grid-cols-7 gap-2 p-2 w-full">
      {ALPHABET.map(letter => {
        const isGuessed = guessedLetters.has(letter);
        const isDisabled = isGuessed || !isGameActive; 

        // Style Ungu Solid (Sesuai Referensi)
        let customClass = "aspect-square rounded-md text-lg font-bold transition-all shadow-md ";
        
        if (isGuessed) {
            customClass += "bg-gray-900 text-gray-600 border border-gray-800 cursor-not-allowed";
        } else {
            customClass += "bg-violet-700 text-white hover:bg-violet-600 hover:scale-105 active:scale-95 border-b-4 border-violet-900";
        }

        return (
          <button
            key={letter}
            onClick={() => onGuess(letter)}
            disabled={isDisabled}
            className={customClass}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
};