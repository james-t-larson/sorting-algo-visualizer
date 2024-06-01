import { useEffect, useState } from 'react';
import { bubbleSortUntilSwap, createRandomArray, insertionSortStep, selectionSortStep } from './utils';
import NumberBar from './components/NumberBar';
import './App.css';

const App = () => {
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

  useEffect(() => {
    console.log("Selction Sort State Changed: ", selectionSort);
  }, [selectionSort]);

  useEffect(() => {
    console.log("Array updated:", randomArray);
  }, [randomArray]);

  return (
    <div className="app">
      <>
        {randomArray.map((number) => (
          <NumberBar key={number} number={number} />
        ))}
        <button
          onClick={() => {
            handleSelectionSortStep();
          }}
        >
          Take Selection Sort Step Forward
        </button>
        <button
          onClick={() => {
            handleInsertionSortStep();
          }}
        >
          Take Insertion Sort Step Forward
        </button>
        <button
          onClick={() => {
            setRandomArray(bubbleSortUntilSwap([...randomArray]));
          }}
        >
          Take Bubble Sort Step Forward
        </button>
      </>
    </div>
  );
}

export default App;