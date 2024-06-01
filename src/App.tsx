import { useEffect, useState } from 'react';
import { bubbleSortUntilSwap, createRandomArray, insertionSortStep } from './utils';
import NumberBar from './components/NumberBar';
import './App.css';

const App = () => {
  const [randomArray, setRandomArray] = useState(createRandomArray());
  const [insertionSort, setInsertionSort] = useState<{ currentIndex: number }>({
    currentIndex: 0,
  });

  const handleInsertionSortStep = () => {
    if (insertionSort.currentIndex< randomArray.length) {
      const newArray = insertionSortStep([...randomArray], insertionSort.currentIndex);
      setRandomArray(newArray);
      setInsertionSort({ ...insertionSort, currentIndex: insertionSort.currentIndex + 1});
    }
  };

  useEffect(() => {
    console.log('Array updated:', randomArray);
  }, [randomArray]);

  return (
    <div className="app">
      <>
        {randomArray.map((number) => (
          <NumberBar key={number} number={number} />
        ))}
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