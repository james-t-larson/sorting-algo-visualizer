import { useEffect, useState } from 'react';
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
import { AlgorithmProvider, useAlgorithmState } from './hooks/useAlgorithmState';

const AppContent = () => {
  const { state, dispatch, algorithms } = useAlgorithmState();
  const { randomArray } = state;

  useEffect(() => {
    console.log('testing')
  }, [randomArray])
  
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

const App = () => (
  <AlgorithmProvider>
    <AppContent />
  </AlgorithmProvider>
);

export default App;