// src/App.tsx

import React from 'react';

// Cukup import folder-nya saja.
// Karena file di dalamnya bernama 'index.tsx', dia akan otomatis terbaca.
import { HangmanPage } from './pages/hangman'; 

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      <HangmanPage />
    </div>
  );
};

export default App;