// src/hooks/useHangmanGame.ts

import { useState, useMemo, useCallback, useEffect } from 'react';
import { HangmanState, GameStatus } from '../types/game';
import { getWordByCategory, WordData } from '../api/words';

export const useHangmanGame = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const [gameState, setGameState] = useState<HangmanState>({
        targetWord: '',
        guessedLetters: new Set<string>(),
        incorrectGuesses: 0,
        maxIncorrectGuesses: 6,
        status: 'playing',
        clue: '',
    });
    
    const [isPaused, setIsPaused] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0); 

    const playSound = (type: 'correct' | 'wrong' | 'win' | 'lose') => {
        const audio = new Audio(`/sounds/${type}.mp3`);
        audio.volume = 0.5; 
        audio.play().catch(() => {});
    };

    const startGame = useCallback((category: string) => {
        const data: WordData = getWordByCategory(category);
        
        setSelectedCategory(category);
        setGameState({
            targetWord: data.word,
            guessedLetters: new Set<string>(), // Reset huruf
            incorrectGuesses: 0,
            maxIncorrectGuesses: 6,
            status: 'playing',
            clue: data.clue,
        });
        setTimeElapsed(0);
        setIsPaused(false);
    }, []);

    // Timer
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (selectedCategory && gameState.status === 'playing' && !isPaused) {
            timer = setInterval(() => {
                setTimeElapsed(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [gameState.status, isPaused, selectedCategory]);

    // Display Word (Handle spasi dan strip)
    const displayWord = useMemo(() => {
        if (!gameState.targetWord) return '';
        return gameState.targetWord
            .split('')
            .map(letter => {
                if (letter === ' ' || letter === '-') return letter; // Tampilkan simbol langsung
                return gameState.guessedLetters.has(letter) ? letter : '_';
            })
            .join(' ');
    }, [gameState.targetWord, gameState.guessedLetters]);

    const togglePause = useCallback(() => {
        if (gameState.status === 'playing') setIsPaused(prev => !prev);
    }, [gameState.status]);

    // --- FITUR HINT (BANTUAN) ---
    const useHint = useCallback(() => {
        if (gameState.status !== 'playing' || isPaused) return;

        // Cari huruf yang belum ditebak
        const unrevealedLetters = gameState.targetWord
            .split('')
            .filter(l => !gameState.guessedLetters.has(l) && l !== ' ' && l !== '-');

        if (unrevealedLetters.length === 0) return;

        // Ambil 1 huruf acak
        const randomLetter = unrevealedLetters[Math.floor(Math.random() * unrevealedLetters.length)];
        
        // Hukuman: Tambah 2 kesalahan
        const penalty = 2;
        let newIncorrectGuesses = gameState.incorrectGuesses + penalty;
        let newStatus = gameState.status;

        // Cek apakah hukuman bikin kalah?
        if (newIncorrectGuesses >= gameState.maxIncorrectGuesses) {
            newIncorrectGuesses = gameState.maxIncorrectGuesses;
            newStatus = 'lost';
            playSound('lose');
        } else {
            playSound('correct'); // Bunyi ting
        }

        setGameState(prev => ({
            ...prev,
            guessedLetters: new Set(prev.guessedLetters).add(randomLetter),
            incorrectGuesses: newIncorrectGuesses,
            status: newStatus
        }));
    }, [gameState, isPaused]);

    // Handle Guess (Tebakan Manual)
    const handleGuess = useCallback((letter: string) => {
        if (!selectedCategory || gameState.status !== 'playing' || isPaused || gameState.guessedLetters.has(letter)) {
            return; 
        }

        const newGuessedLetters = new Set(gameState.guessedLetters).add(letter);
        let newIncorrectGuesses = gameState.incorrectGuesses;
        const isCorrectGuess = gameState.targetWord.includes(letter);

        if (!isCorrectGuess) newIncorrectGuesses += 1;

        let newStatus: GameStatus = 'playing';
        
        // Cek Menang (abaikan spasi/strip)
        const lettersToGuess = gameState.targetWord.split('').filter(l => l !== ' ' && l !== '-');
        const isWordGuessed = lettersToGuess.every(l => newGuessedLetters.has(l));
            
        if (isWordGuessed) {
            newStatus = 'won';
            setIsPaused(false); 
            playSound('win');
        } else if (newIncorrectGuesses >= gameState.maxIncorrectGuesses) {
            newStatus = 'lost';
            setIsPaused(false); 
            playSound('lose');
        } else {
            isCorrectGuess ? playSound('correct') : playSound('wrong');
        }

        setGameState(prev => ({
            ...prev,
            guessedLetters: newGuessedLetters,
            incorrectGuesses: newIncorrectGuesses,
            status: newStatus,
        }));
    }, [gameState, isPaused, selectedCategory]);
    
    const resetGame = useCallback(() => {
        if (selectedCategory) {
            startGame(selectedCategory);
        }
    }, [selectedCategory, startGame]);

    const backToMenu = useCallback(() => {
        setSelectedCategory(null);
        setGameState(prev => ({ ...prev, status: 'playing', targetWord: '' }));
    }, []);

    return {
        ...gameState,
        displayWord,
        handleGuess,
        resetGame,
        backToMenu,
        startGame,
        selectedCategory,
        timeElapsed, 
        isPaused,
        togglePause,
        useHint, // <-- Fitur Hint diekspor agar bisa dipakai di UI
    };
};