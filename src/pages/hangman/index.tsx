// src/pages/hangman/HangmanPage.tsx

import React from 'react';
import { Button } from '../../components/ui/button'; 
import { useHangmanGame } from '../../hooks/useHangmanGame'; 
import { HangmanVisual } from '../../components/HangmanVisual';
import { Keyboard } from '../../components/Keyboard';
import { GameStatusDisplay } from '../../components/GameStatusDisplay'; 
import { getCategories } from '../../api/words'; 
import { postPlayCount } from '../../api/playCount';

export const HangmanPage: React.FC = () => {
    const categories = getCategories();

    const { 
        selectedCategory,
        startGame,
        backToMenu,
        targetWord, 
        incorrectGuesses, 
        maxIncorrectGuesses, 
        guessedLetters, 
        displayWord, 
        status, 
        clue,
        handleGuess,
        resetGame,
        timeElapsed, 
        isPaused,    
        togglePause, 
    } = useHangmanGame();
    
    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const handleExitGame = async () => {
        try { await postPlayCount(); } catch (e) { console.error(e); }
        window.location.href = '/'; 
    };

    // --- TAMPILAN MENU ---
    if (!selectedCategory) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-black text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-black to-black z-0 pointer-events-none"></div>
                <div className="z-10 text-center mb-12">
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-emerald-400 to-emerald-700 filter drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">HANG</span>
                        <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-500 to-gray-800">MAN</span>
                    </h1>
                    <p className="text-emerald-500/80 font-mono tracking-[0.5em] text-sm mt-4 uppercase">Cyber Edition</p>
                </div>
                <div className="w-full max-w-md space-y-4 z-10">
                    {categories.map((cat) => (
                        <Button 
                            key={cat}
                            onClick={() => startGame(cat)}
                            className="w-full py-8 text-xl font-black uppercase tracking-widest bg-gray-900 border border-gray-800 text-emerald-500 hover:bg-emerald-500 hover:text-black hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] group relative overflow-hidden"
                        >
                            <span className="relative z-10">{cat}</span>
                            <div className="absolute inset-0 bg-emerald-400/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </Button>
                    ))}
                    <div className="pt-8 text-center">
                         <Button onClick={handleExitGame} variant="ghost" className="text-gray-600 hover:text-white transition-colors">
                            ← EXIT GAME
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // --- TAMPILAN GAMEPLAY ---
    return (
        <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center p-4 lg:p-8">
            
            {/* Main Container Grid */}
            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6 h-full lg:h-[85vh]">
                
                {/* 1. KOLOM KIRI: Visual Hangman & Stats */}
                <div className="lg:col-span-5 bg-emerald-500 rounded-3xl p-1 shadow-[0_0_50px_rgba(16,185,129,0.15)] flex flex-col h-full">
                    
                    {/* Inner Content (Monitor) */}
                    {/* Background diganti jadi gray-900 agar tidak terlalu gelap pekat */}
                    <div className="bg-gray-900 w-full h-full rounded-[1.3rem] border-4 border-black flex flex-col relative overflow-hidden">
                        
                        {/* Background Detail Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

                        {/* Top Bar: Stats */}
                        <div className="p-6 flex justify-between items-start z-10">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-2">Vitality</p>
                                <div className="flex space-x-1">
                                    {Array.from({ length: maxIncorrectGuesses }).map((_, i) => (
                                        <div 
                                            key={i} 
                                            className={`w-4 h-12 rounded-sm skew-x-12 border border-emerald-900/50 transition-all duration-300 ${i < (maxIncorrectGuesses - incorrectGuesses) 
                                                ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' 
                                                : 'bg-black/50'}`} 
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-1">Time</p>
                                <p className="text-3xl font-mono font-bold text-white tracking-widest drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                                    {formatTime(timeElapsed)}
                                </p>
                            </div>
                        </div>

                        {/* Center: Hangman Visual (NEON GREEN FIX) */}
                        <div className="flex-1 flex items-center justify-center p-8 relative">
                             {/* Efek Glow di belakang hangman */}
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-emerald-500/5 blur-3xl rounded-full"></div>
                             
                             {/* text-emerald-400 membuat garis jadi hijau neon, drop-shadow membuatnya bersinar */}
                             <div className="scale-125 origin-center text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.8)] filter transition-all duration-500">
                                <HangmanVisual incorrectGuesses={incorrectGuesses} maxGuesses={maxIncorrectGuesses} />
                            </div>
                        </div>

                        {/* Bottom: Controls */}
                        <div className="p-6 flex justify-between items-end z-10 bg-gradient-to-t from-black/80 to-transparent">
                            <button onClick={togglePause} className="text-xs font-bold text-emerald-600 hover:text-white hover:underline uppercase tracking-widest">
                                {isPaused ? "▶ RESUME" : "⏸ PAUSE"}
                            </button>
                            <span className="text-6xl font-black text-gray-800/50 select-none">{incorrectGuesses}</span>
                        </div>
                    </div>
                </div>

                {/* 2. KOLOM KANAN: Gameplay & Controls */}
                <div className="lg:col-span-7 flex flex-col gap-6 h-full">
                    
                    {/* Header */}
                    <div className="flex justify-between items-center bg-gray-900/50 p-4 rounded-2xl border border-gray-800">
                        <span className="bg-black text-emerald-400 border border-emerald-500/30 px-4 py-1 rounded-md text-xs font-black uppercase tracking-[0.2em]">
                            Topic: {selectedCategory}
                        </span>
                        <Button onClick={backToMenu} variant="ghost" className="text-xs text-gray-500 hover:text-white h-auto py-1">
                            EXIT TO MENU
                        </Button>
                    </div>

                    {/* Word Display Area */}
                    <div className="flex-1 bg-gray-900/30 border border-gray-800 rounded-3xl p-8 flex flex-col items-center justify-center relative group">
                        <div className="absolute top-4 left-0 w-full text-center">
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                Decryption Hint
                            </p>
                            <p className="text-white mt-2 text-sm italic opacity-80">"{clue}"</p>
                        </div>
                        
                        <div className="text-center mt-6 w-full overflow-hidden">
                            <div className="text-5xl lg:text-7xl font-mono tracking-[0.1em] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-lg break-words">
                                {displayWord}
                            </div>
                        </div>
                    </div>

                    {/* Keyboard Area */}
                    <div className="bg-black border border-gray-800 p-6 rounded-3xl">
                        <Keyboard 
                            guessedLetters={guessedLetters} 
                            onGuess={handleGuess} 
                            gameStatus={status === 'playing' && !isPaused ? 'playing' : 'lost'} 
                        />
                    </div>
                    
                    {/* Restart Button */}
                    {(status !== 'playing') && (
                        <Button 
                            onClick={() => startGame(selectedCategory!)} 
                            className="w-full py-6 text-xl bg-emerald-500 text-black hover:bg-emerald-400 font-black uppercase tracking-widest shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-pulse"
                        >
                            REBOOT SYSTEM (PLAY AGAIN)
                        </Button>
                    )}
                </div>
            </div>

            {/* Overlay Status */}
            {(status !== 'playing' || isPaused) && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-6">
                     <GameStatusDisplay 
                        status={status}
                        targetWord={targetWord}
                        onReset={resetGame}
                        timeElapsed={timeElapsed}
                        isPaused={isPaused}
                        onTogglePause={togglePause}
                        formatTime={formatTime}
                    />
                </div>
            )}
        </div>
    );
};