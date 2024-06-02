import NumberBar from './components/NumberBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import AlgoNavbar from './components/AlgoNavbar';
import { AlgorithmProvider, useAlgorithmState } from './hooks/useAlgorithmState';
import './App.css';

const AppContent = () => {
  const { state, algorithms } = useAlgorithmState();
  const { randomArray } = state;

  return (
    <>
      <AlgoNavbar />
      <div className="app">
        {randomArray.map((number) => (
          <NumberBar number={number} />
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