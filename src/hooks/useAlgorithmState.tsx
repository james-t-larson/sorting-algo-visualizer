import { ReactNode, createContext, useContext, useReducer } from 'react';
import {
  bubbleSortUntilSwap,
  createRandomArray,
  insertionSortStep,
  selectionSortStep,
} from "../utils";
import { Algorithms } from '../types';

interface AppState {
  currentAlgorithm: Algorithms;
  randomArray: number[];
  insertionSort: { currentIndex: number };
  selectionSort: { isSorting: boolean; currentIndex: number };
}

type Action =
  | { type: 'SET_ALGORITHM'; payload: Algorithms }
  | { type: 'RESET_ARRAY' }
  | { type: 'BUBBLE_SORT_STEP' }
  | { type: 'INSERTION_SORT_STEP' }
  | { type: 'SELECTION_SORT_STEP' };

const initialState: AppState = {
  currentAlgorithm: Algorithms.Bubble,
  randomArray: createRandomArray(),
  insertionSort: { currentIndex: 0 },
  selectionSort: { isSorting: false, currentIndex: 0 },
};

const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_ALGORITHM':
      return { ...state, currentAlgorithm: action.payload };
    case 'RESET_ARRAY':
      return { ...state, randomArray: createRandomArray() };
    case 'BUBBLE_SORT_STEP':
      return { ...state, randomArray: bubbleSortUntilSwap([...state.randomArray]) };
    case 'INSERTION_SORT_STEP':
      if (state.insertionSort.currentIndex < state.randomArray.length) {
        const newArray = insertionSortStep(
          [...state.randomArray],
          state.insertionSort.currentIndex
        );
        return {
          ...state,
          randomArray: newArray,
          insertionSort: {
            ...state.insertionSort,
            currentIndex: state.insertionSort.currentIndex + 1,
          },
        };
      }
      return state;
    case 'SELECTION_SORT_STEP':
      if (state.selectionSort.isSorting || state.selectionSort.currentIndex === 0) {
        const [newArray, continueSorting] = selectionSortStep(
          [...state.randomArray],
          state.selectionSort.currentIndex
        );
        return {
          ...state,
          randomArray: newArray,
          selectionSort: {
            isSorting: continueSorting,
            currentIndex: state.selectionSort.currentIndex + 1,
          },
        };
      }
      return state;
    default:
      return state;
  }
};

const AlgorithmStateContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
  algorithms: {
    [Algorithms.Selection]: () => void;
    [Algorithms.Insertion]: () => void;
    [Algorithms.Bubble]: () => void;
  };
}>({
  state: initialState,
  dispatch: () => undefined,
  algorithms: {
    [Algorithms.Selection]: () => undefined,
    [Algorithms.Insertion]: () => undefined,
    [Algorithms.Bubble]: () => undefined,
  },
});

export const AlgorithmProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const algorithms = {
    [Algorithms.Selection]: () => dispatch({ type: "SELECTION_SORT_STEP" }),
    [Algorithms.Insertion]: () => dispatch({ type: "INSERTION_SORT_STEP" }),
    [Algorithms.Bubble]: () => dispatch({ type: "BUBBLE_SORT_STEP" }),
  };
  return (
    <AlgorithmStateContext.Provider value={{ state, dispatch, algorithms }}>
      {children}
    </AlgorithmStateContext.Provider>
  );
};
  
export const useAlgorithmState = () => useContext(AlgorithmStateContext);