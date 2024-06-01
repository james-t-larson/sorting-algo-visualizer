export enum Algorithms {
  Selection = "Selection Sort",
  Bubble = "Bubble Sort",
  Insertion = "Insertion Sort",
}

export type AlgorithmHandler = () => void;
export type AlgorithmsMap = {
  [K in Algorithms]: AlgorithmHandler;
};
