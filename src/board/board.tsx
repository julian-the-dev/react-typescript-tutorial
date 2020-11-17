import Square from "../square/square";
import React, { useState } from "react";
import formatValue from "../services/formatValue";

const Board: React.FunctionComponent<any> = (props) => {
  const defaultLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const [lines, setLines] = useState(defaultLines);

  const renderSquare = (
    index: number,
    position: { line: number; col: number }
  ) => {
      const isWinner = typeof props.squares[index] === 'object';
    return (
      <Square value={formatValue(props.squares[index])} winner={isWinner} onClick={() => props.onClick(index, position)} />
    );
  };

  const renderLines = () => {
    return lines.map((line, indexLine) => {
      const colones = line.map((index, indexCol) => {
        return (
          <span key={indexCol}>{renderSquare(index, { line: indexLine, col: indexCol })}</span>
        );
      });
      return <div className="board-row" key={indexLine}>{colones}</div>;
    });
  };

  return <div>{renderLines()}</div>;
};

export default Board;
