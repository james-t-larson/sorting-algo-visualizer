import { useEffect, useState } from 'react';
import { bubbleSortUntilSwap, createRandomArray } from './utils';
import NumberBar from './components/NumberBar';
import './App.css';

const App = () => {
  const [randomArray, setRandomArray] = useState(createRandomArray());

  useEffect(() => {
    console.log('testing', randomArray)
  }, [randomArray])

  return (
    <div className="app">
      <>
        {randomArray.map((number) => (
          <NumberBar key={number} number={number} />
        ))}
        <button
          onClick={() => {
            setRandomArray(bubbleSortUntilSwap([...randomArray]));
          }}
        >
          Take Step Forward
        </button>
      </>
    </div>
  );
}

export default App;