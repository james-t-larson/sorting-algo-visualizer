import { useState } from 'react';
import {
  bubbleSortUntilSwap,
  createRandomArray,
  insertionSortStep,
  selectionSortStep,
} from "./utils";
import NumberBar from './components/NumberBar';
import './App.css';
import { Algorithms, AlgorithmsMap } from './types';
import { Button } from 'bootstrap-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AlgoNavbar from './components/AlgoNavbar';
import { useAlgorithmState } from './hooks/useAlgorithmState';

const App = () => {
  const { state, dispatch, algorithms } = useAlgorithmState();
  const [currentAlgorithm, setCurrentAlgorithm] = useState<Algorithms>(
    Algorithms.Bubble
  );
  const [randomArray, setRandomArray] = useState(createRandomArray());
  const [insertionSort, setInsertionSort] = useState<{ currentIndex: number }>({
    currentIndex: 0,
  });
  const [selectionSort, setSelectionSort] = useState<{
    isSorting: boolean;
    currentIndex: number;
  }>({
    isSorting: false,
    currentIndex: 0,
  });

  const handleReset = () => {
    setRandomArray(createRandomArray());
  };

  const handleBubbleSortStep = () => {
    setRandomArray(bubbleSortUntilSwap([...randomArray]));
  };

  const handleInsertionSortStep = () => {
    if (insertionSort.currentIndex < randomArray.length) {
      const newArray = insertionSortStep(
        [...randomArray],
        insertionSort.currentIndex
      );
      setRandomArray(newArray);
      setInsertionSort({
        ...insertionSort,
        currentIndex: insertionSort.currentIndex + 1,
      });
    }
  };

  const handleSelectionSortStep = () => {
    if (selectionSort.isSorting || selectionSort.currentIndex === 0) {
      const [newArray, continueSorting] = selectionSortStep(
        [...randomArray],
        selectionSort.currentIndex
      );
      setRandomArray([...newArray]);
      if (continueSorting) {
        setSelectionSort({
          isSorting: continueSorting,
          currentIndex: selectionSort.currentIndex + 1,
        });
      }
    }
  };

  // const algorithms: AlgorithmsMap = {
  //   [Algorithms.Selection]: handleSelectionSortStep,
  //   [Algorithms.Insertion]: handleInsertionSortStep,
  //   [Algorithms.Bubble]: handleBubbleSortStep,
  // };

  return (
    <>
      <AlgoNavbar />
      <div className="app">
        {randomArray.map((number) => (
          <NumberBar key={number} number={number} />
        ))}
      </div>
    </>
  );
}

export default App;