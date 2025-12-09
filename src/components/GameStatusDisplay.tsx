// src/components/GameStatusDisplay.tsx (CODE FULL NEW)

import React from 'react';
import { Button } from './ui/button';
import { GameStatus } from '../types/game';

interface GameStatusDisplayProps {
    status: GameStatus;
    targetWord: string;
    onReset: () => void;
    timeElapsed: number;
    isPaused: boolean;
    onTogglePause: () => void;
    formatTime: (seconds: number) => string;
}

/**
 * Menampilkan overlay status permainan (Menang, Kalah, atau Dijeda).
 * Ini adalah versi terpisah dari logic overlay yang ada di HangmanPage.
 */
export const GameStatusDisplay: React.FC<GameStatusDisplayProps> = ({
    status,
    targetWord,
    onReset,
    timeElapsed,
    isPaused,
    onTogglePause,
    formatTime,
}) => {
    // Jika game sedang bermain DAN tidak dijeda, jangan tampilkan overlay
    if (status === 'playing' && !isPaused) {
        return null;
    }

    // Jika game sudah selesai (Menang/Kalah)
    if (status !== 'playing') {
        const isWon = status === 'won';
        return (
            <div className={`p-8 rounded-xl shadow-2xl text-center max-w-sm ${
                isWon ? 'bg-green-700' : 'bg-red-700'
            }`}>
                <p className="text-3xl font-bold text-white mb-4">
                    {isWon ? '🎉 SELAMAT! Anda Menang!' : '💀 GAME OVER!'}
                </p>
                <p className="text-lg text-white mb-6">
                    Kata yang benar adalah: **{targetWord}**
                </p>
                <Button 
                    onClick={onReset} 
                    className="bg-white text-gray-900 hover:bg-gray-200 font-semibold"
                >
                    Mulai Permainan Baru
                </Button>
            </div>
        );
    }
    
    // Jika game dijeda (status === 'playing' && isPaused === true)
    return (
        <div className="p-8 rounded-xl shadow-2xl text-center max-w-sm bg-blue-700">
            <p className="text-3xl font-bold text-white mb-6">
                ⏸️ Permainan Dijeda
            </p>
            <p className="text-lg text-white mb-6">
                Waktu terhenti di **{formatTime(timeElapsed)}**.
            </p>
            <Button 
                onClick={onTogglePause} 
                className="bg-white text-gray-900 hover:bg-gray-200 font-semibold"
            >
                Lanjutkan Permainan
            </Button>
        </div>
    );
};