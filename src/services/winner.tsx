import formatValue from "./formatValue";

const calculateWinner = (squares: any) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const indexes = lines[i];
    const [resutlA, resultB, resultC] = indexes.map(idx => formatValue(squares[idx]));
    console.log(resutlA, resultB, resultC);
    if (resutlA && resutlA === resultB && resutlA === resultC) {
      return indexes;
    }
  }
  return null;
};

export default calculateWinner;
