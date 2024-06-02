import { ReactNode, createContext, useContext, useReducer } from 'react';
import {
  bubbleSortUntilSwap,
  completeBubbleSort,
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
  | { type: 'COMPLETE_BUBBLE_SORT' }
  | { type: 'INSERTION_SORT_STEP' }
  | { type: 'SELECTION_SORT_STEP' };

const initialState: AppState = {
  currentAlgorithm: Algorithms.Bubble,
  randomArray: createRandomArray(),
  insertionSort: { currentIndex: 0 },
  selectionSort: { isSorting: false, currentIndex: 0 },
};

const reducer = (state: AppState, action: Action): AppState => {
  console.log("ACTION", action)
  console.log("STATE", state) 
  switch (action.type) {
    case "SET_ALGORITHM":
      return {
        ...state,
        currentAlgorithm: action.payload,
        randomArray: createRandomArray(),
        insertionSort: { currentIndex: 0 },
        selectionSort: { isSorting: false, currentIndex: 0 },
      };
    case "RESET_ARRAY":
      return { ...state, randomArray: createRandomArray() };
    case "BUBBLE_SORT_STEP":
      return {
        ...state,
        randomArray: bubbleSortUntilSwap([...state.randomArray]).array,
      };
    case "COMPLETE_BUBBLE_SORT": 
      return { ...state, randomArray: completeBubbleSort(state.randomArray) }
    case "INSERTION_SORT_STEP":
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
    case "SELECTION_SORT_STEP":
      if (
        state.selectionSort.isSorting ||
        state.selectionSort.currentIndex === 0
      ) {
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
    [Algorithms.Selection]: {
      singleStep: () => void
      complete: () => void
    };
    [Algorithms.Insertion]: {
      singleStep: () => void
      complete: () => void
    };
    [Algorithms.Bubble]: {
      singleStep: () => void
      complete: () => void
    };
  };
}>({
  state: initialState,
  dispatch: () => undefined,
  algorithms: {
    [Algorithms.Selection]: {
      singleStep: () => undefined,
      complete: () => undefined
    },
    [Algorithms.Insertion]: {
      singleStep: () => undefined,
      complete: () => undefined
    },
    [Algorithms.Bubble]: {
      singleStep: () => undefined,
      complete: () => undefined
    },
  },
});

export const AlgorithmProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const algorithms = {
    [Algorithms.Selection]: {
      singleStep: () => dispatch({ type: "SELECTION_SORT_STEP" }),
      complete: () => {},
    },
    [Algorithms.Insertion]: {
      singleStep: () => dispatch({ type: "INSERTION_SORT_STEP" }),
      complete: () => {},
    },
    [Algorithms.Bubble]: {
      singleStep: () => dispatch({ type: "BUBBLE_SORT_STEP" }),
      complete: () => dispatch({ type: "COMPLETE_BUBBLE_SORT" }),
    },
  };
  return (
    <AlgorithmStateContext.Provider value={{ state, dispatch, algorithms }}>
      {children}
    </AlgorithmStateContext.Provider>
  );
};
  
export const useAlgorithmState = () => useContext(AlgorithmStateContext);