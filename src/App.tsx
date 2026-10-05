import { Routes, Route, Navigate } from 'react-router-dom';
import { useGame } from './contexts/GameContext';
import { GameProvider } from './contexts/GameContext';
import NewGameScreen from './components/setup/NewGameScreen';
import Dashboard from './components/game/Dashboard';
import Story from './components/game/Story';
import Company from './components/game/Company';
import Employees from './components/game/Employees';
import Marketing from './components/game/Marketing';
import Product from './components/game/Product';
import Finance from './components/game/Finance';
import Customers from './components/game/Customers';
import Relationships from './components/game/Relationships';
import Education from './components/game/Education';
import GameOver from './components/game/GameOver';

import './App.css';

function GameContent() {
  const { state, isNewGame } = useGame();

  if (isNewGame || !state) {
    return <NewGameScreen />;
  }

  if (state.gameOver.isOver) {
    return <GameOver />;
  }

  return <Dashboard />;
}

function App() {
  return (
    <GameProvider>
      <Routes>
        <Route path="/" element={<GameContent />} />
        <Route path="/setup" element={<NewGameScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/story" element={<Story />} />
        <Route path="/company" element={<Company />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/marketing" element={<Marketing />} />
        <Route path="/product" element={<Product />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/relationships" element={<Relationships />} />
        <Route path="/education" element={<Education />} />
        <Route path="/game-over" element={<GameOver />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </GameProvider>
  );
}

export default App;
