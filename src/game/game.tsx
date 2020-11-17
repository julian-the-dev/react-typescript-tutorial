import Board from "../board/board";
import React, { useState } from "react";
import calculateWinner from "../services/winner";

const Game: React.FunctionComponent<any> = (props) => {
  const defaultHistory: any = [
    {
      squares: Array(9).fill(null),
      position: null,
      mark: "X",
    },
  ];
  const [history, setHistory] = useState(defaultHistory);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isWinner, setIsWinner] = useState(false);

  const handleClick = (
    index: number,
    position: { line: number; col: number }
  ) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const lastHistory = newHistory[newHistory.length - 1];
    const squares = lastHistory.squares.slice();
    const mark = xIsNext ? "X" : "O";
    if (isWinner || squares[index]) {
      return;
    }
    squares[index] = mark;
    const result = newHistory.concat([
      {
        squares: squares,
        position,
        mark,
      },
    ])
    setHistory(result);
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
    checkWinner(result);
  };

  const checkWinner = (newHistory: any) => {
    const currentHistory = newHistory[newHistory.length - 1];
    const currentMark = currentHistory.mark;
    const winner = calculateWinner(currentHistory.squares);
    if (winner) {
      (winner || []).forEach(
        (idx: any) =>
          (currentHistory.squares[idx] = {
            value: currentMark,
            winner: true,
          })
      );
    }
    setIsWinner(!!winner);
  };

  const jumpTo = (stepSelected: number) => {
    if(stepNumber !== stepSelected) {
      setStepNumber(stepSelected);
      setXIsNext(stepSelected % 2 === 0);
      setIsWinner(false);
    }
  };

  const getMovesRender = () => {
    return history.map((currentHistory: any, index: number) => {
      const currentPos: { line: number; col: number } = currentHistory.position;
      const description = index
        ? "Revenir au tour n°" + index
        : "Revenir au début de la partie";
      return (
        <li key={index}>
          <button onClick={() => jumpTo(index)}>{description}</button>
          {currentPos ? (
            <span>
              {currentHistory.mark} : line {currentPos.line + 1}, col:{" "}
              {currentPos.col + 1}
            </span>
          ) : null}
        </li>
      );
    });
  };

  const getStatusRender = () => {
    const currentHistory = history[stepNumber];
    const currentMark = currentHistory.mark;
    let status;
    if (isWinner) {
      status = currentMark + " a gagné";
    } else {
      status =
        stepNumber === 9
          ? "Match null "
          : "Prochain joueur : " + (xIsNext ? "X" : "O");
    }
    return status;
  };

  const getCurrentSquare = () => {
    return history[stepNumber].squares;
  };

  const render = () => {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={getCurrentSquare()}
            onClick={(index: any, position: { line: number; col: number }) =>
              handleClick(index, position)
            }
          />
        </div>
        <div className="game-info">
          <div>{getStatusRender()}</div>
          <ol>{getMovesRender()}</ol>
        </div>
      </div>
    );
  };

  return render();
};

export default Game;
