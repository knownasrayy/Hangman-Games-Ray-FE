// src/components/HangmanVisual.tsx

import React from 'react';

interface HangmanVisualProps {
  incorrectGuesses: number;
  maxGuesses: number;
}

export const HangmanVisual: React.FC<HangmanVisualProps> = ({ 
  incorrectGuesses, 
  maxGuesses 
}) => {
  const stage = Math.min(incorrectGuesses, maxGuesses); 
  const imagePath = `/images/hangman-${stage}.svg`;

  return (
    // REVISI: Mengubah ukuran container menjadi fleksibel (w-full) dan lebih tinggi (h-48 sm:h-64)
    // Warna tetap text-black agar garisnya hitam
    <div className="flex justify-center items-center h-48 sm:h-64 w-full text-black transition-all duration-300">
      <img 
        src={imagePath} 
        alt={`Hangman Stage ${stage}`} 
        className="h-full object-contain drop-shadow-xl" 
      />
    </div>
  );
};