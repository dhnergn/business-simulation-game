import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { GameState, NewGameState } from '../types/gameState';
import { createNewGameState, loadGameState, saveGameState, clearGameState } from '../store/gameState';
import { GameEngine } from '../engine/GameEngine';
import { StoryNode } from '../types/story';
import { STORY_NODES } from '../data/storyNodes';

interface GameContextType {
  state: GameState | null;
  engine: GameEngine | null;
  isNewGame: boolean;
  isLoading: boolean;
  initializeGame: (config: NewGameState) => void;
  loadGame: () => void;
  resetGame: () => void;
  endTurn: () => void;
  processAction: (actionId: string) => void;
  selectStoryChoice: (choiceId: string) => void;
  selectEventChoice: (eventId: string, choiceIndex: number) => void;
  dismissEvent: (eventId: string) => void;
  startNewTurn: () => void;
  markEducationRead: (id: string) => void;
  unreadEducationCount: number;
  pendingEvents: any[];
  pendingStoryNode: StoryNode | null;
  conceptHistory: any[];
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = (): GameContextType => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
};

type GameAction =
  | { type: 'SET_STATE'; payload: { state: GameState; engine: GameEngine } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_PENDING_STORY'; payload: StoryNode | null }
  | { type: 'SET_EDUCATION_READ'; payload: string }
  | { type: 'SET_PENDING_EVENTS'; payload: any[] };

interface InternalState {
  state: GameState | null;
  engine: GameEngine | null;
  isNewGame: boolean;
  isLoading: boolean;
  pendingEvents: any[];
  pendingStoryNode: StoryNode | null;
}

function gameReducer(state: InternalState, action: GameAction): InternalState {
  switch (action.type) {
    case 'SET_STATE':
      return {
        ...state,
        state: action.payload.state,
        engine: action.payload.engine,
        isNewGame: false,
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_PENDING_EVENTS':
      return { ...state, pendingEvents: action.payload };
    case 'SET_PENDING_STORY':
      return { ...state, pendingStoryNode: action.payload };
    case 'SET_EDUCATION_READ': {
      if (!state.state) return state;
      const newHistory = state.state.educationHistory.map((e) =>
        e.id === action.payload ? { ...e, read: true } : e,
      );
      const newState = { ...state.state, educationHistory: newHistory };
      return { ...state, state: newState };
    }
    default:
      return state;
  }
}

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameReducer, {
    state: null,
    engine: null,
    isNewGame: true,
    isLoading: false,
    pendingEvents: [],
    pendingStoryNode: null,
  });

  const initializeGame = useCallback((config: NewGameState) => {
    clearGameState();
    const initialState = createNewGameState(config);
    const engine = new GameEngine(initialState);
    dispatch({ type: 'SET_STATE', payload: { state: initialState, engine } });
  }, []);

  const loadGame = useCallback(() => {
    const saved = loadGameState();
    if (saved) {
      const engine = new GameEngine(saved);
      dispatch({ type: 'SET_STATE', payload: { state: saved, engine } });
    }
  }, []);

  const resetGame = useCallback(() => {
    clearGameState();
    dispatch({ type: 'SET_STATE', payload: { state: null, engine: null } });
  }, []);

  const endTurn = useCallback(() => {
    if (!gameState.engine || !gameState.state) return;
    const { newState } = gameState.engine.processTurn();
    saveGameState(newState);
    const newEvents = newState.activeEvents;
    const nextStoryNode = STORY_NODES[newState.story.currentNode || ''] || null;
    dispatch({ type: 'SET_PENDING_EVENTS', payload: newEvents });
    dispatch({ type: 'SET_PENDING_STORY', payload: nextStoryNode });
  }, [gameState.engine, gameState.state]);

  const processAction = useCallback(
    (actionId: string) => {
      if (!gameState.engine) return;
      const { newState } = gameState.engine.processAction(actionId);
      saveGameState(newState);
      dispatch({ type: 'SET_STATE', payload: { state: newState, engine: gameState.engine } });
    },
    [gameState.engine],
  );

  const selectStoryChoice = useCallback(
    (choiceId: string) => {
      if (!gameState.engine) return;
      const { newState } = gameState.engine.applyStoryChoice(choiceId);
      saveGameState(newState);
      dispatch({ type: 'SET_STATE', payload: { state: newState, engine: gameState.engine } });
      const nextStoryNode = STORY_NODES[newState.story.currentNode || ''] || null;
      dispatch({ type: 'SET_PENDING_STORY', payload: nextStoryNode });
    },
    [gameState.engine],
  );

  const selectEventChoice = useCallback(
    (eventId: string, choiceIndex: number) => {
      if (!gameState.engine) return;
      const { newState } = gameState.engine.applyEventChoice(eventId, choiceIndex);
      saveGameState(newState);
      dispatch({ type: 'SET_STATE', payload: { state: newState, engine: gameState.engine } });
    },
    [gameState.engine],
  );

  const dismissEvent = useCallback(
    (eventId: string) => {
      if (!gameState.engine || !gameState.state) return;
      gameState.engine.dismissEvent(eventId);
      saveGameState(gameState.state);
    },
    [gameState.engine, gameState.state],
  );

  const startNewTurn = useCallback(() => {
    dispatch({ type: 'SET_PENDING_STORY', payload: null });
    dispatch({ type: 'SET_PENDING_EVENTS', payload: [] });
  }, []);

  const markEducationRead = useCallback((id: string) => {
    dispatch({ type: 'SET_EDUCATION_READ', payload: id });
  }, []);

  const unreadEducationCount = gameState.state
    ? gameState.state.educationHistory.filter((e) => !e.read).length
    : 0;

  const conceptHistory = gameState.state ? gameState.state.educationHistory : [];

  return (
    <GameContext.Provider
      value={{
        state: gameState.state,
        engine: gameState.engine,
        isNewGame: gameState.isNewGame,
        isLoading: gameState.isLoading,
        initializeGame,
        loadGame,
        resetGame,
        endTurn,
        processAction,
        selectStoryChoice,
        selectEventChoice,
        dismissEvent,
        startNewTurn,
        markEducationRead,
        unreadEducationCount,
        pendingEvents: gameState.pendingEvents,
        pendingStoryNode: gameState.pendingStoryNode,
        conceptHistory,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
