export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const createRandomArray = () => {
  const length = 20;
  const array = new Array();
  for (let i = 0; i <= length; i++) {
    array.push(getRandomInt(50, 500));
  }
  return array;
}

export const selectionSortStep = (arr: number[], currentStep: number): [number[], boolean] => {
    if (currentStep >= arr.length - 1) return [arr, false];

    let minIndex = currentStep;
    for (let j = currentStep + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) {
            minIndex = j;
        }
    }

    if (minIndex !== currentStep) {
        [arr[currentStep], arr[minIndex]] = [arr[minIndex], arr[currentStep]];
        return [arr, true];
    }

    return [arr, false];
}

export const completeSelectionSort = (arr: number[]): number[] => {
    let currentStep = 0;
    let swapped = true;

    while (currentStep < arr.length - 1 && swapped) {
        let result;
        [result, swapped] = selectionSortStep(arr, currentStep);
        arr = result;
        currentStep++;
    }

    return arr;
}

export const insertionSortStep = (arr: number[], currentIndex: number): number[] => {
    if (currentIndex <= 0 || currentIndex >= arr.length) return arr;

    const currentVal = arr[currentIndex];
    let position = currentIndex;

    while (position > 0 && arr[position - 1] > currentVal) {
        arr[position] = arr[position - 1];
        position--;
    }

    arr[position] = currentVal;
    return arr;
}

export const completeInsertionSort = (arr: number[]): number[] => {
    for (let i = 1; i < arr.length; i++) {
        arr = insertionSortStep(arr, i);
    }
    return arr;
}

export const completeBubbleSort = (arr: number[]): number[] => {
    let result = bubbleSortUntilSwap(arr);
    while (result.needsSwap) {
        result = bubbleSortUntilSwap(result.array);
    }
    return result.array;
}

export const bubbleSortUntilSwap = (arr: number[]): { array: number[], needsSwap: boolean } => {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
            return { array: arr, needsSwap: true };
        }
    }
    return { array: arr, needsSwap: false };
}
