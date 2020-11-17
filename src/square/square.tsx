import React from "react";

const Square: React.FunctionComponent<{winner: boolean, value: string, onClick: any}> = (props) => {
  return (
    <button
      className={`square ${props.winner ? "winner-square" : ""}`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};

export default Square;
