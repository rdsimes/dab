import { FC, SetStateAction, useState } from "react";
import PlayerScores from "./PlayerScores";
import Game from "../lib/game";

const ROWS: number = 4;
const COLUMNS: number = 5;

let game = new Game(COLUMNS, ROWS);

type ObjectRowProps = {
  rowIndex: number;
  colIndex?: number;
  handlers: GameHandlers;
};

type LineProps = {
  rowIndex: number;
  colIndex?: number;
  isHorizontal: boolean;
  handlers: GameHandlers;
};
let horizontalRow = (cell: ObjectRowProps) => {
  let last = cell.colIndex === COLUMNS - 1;
  return last ? (
    <td className="dot boxborder"></td>
  ) : (
    <>
      <td className="dot boxborder"></td>
      <Line
        isHorizontal={true}
        rowIndex={cell.rowIndex}
        colIndex={cell.colIndex}
        handlers={cell.handlers}
      />
    </>
  );
};

const VerticalRow: FC<ObjectRowProps> = (cell: ObjectRowProps) => {
  const [owner, setIsOwner] = useState("");
  let last = cell.colIndex === COLUMNS - 1;

  game.subscribe(cell.rowIndex, cell.colIndex ?? 0, (owner: string) =>
    setIsOwner(owner)
  );

  return last ? (
    <Line
      isHorizontal={false}
      rowIndex={cell.rowIndex}
      colIndex={cell.colIndex}
      handlers={cell.handlers}
    />
  ) : (
    <>
      <Line
        isHorizontal={false}
        rowIndex={cell.rowIndex}
        colIndex={cell.colIndex}
        handlers={cell.handlers}
      />
      <td className="box">
        <div className={owner}>
          box {cell.rowIndex} {cell.colIndex}{" "}
        </div>
      </td>
    </>
  );
};

const ObjectRow: FC<ObjectRowProps> = ({
  rowIndex,
  colIndex,
  handlers,
}: ObjectRowProps) =>
  rowIndex === ROWS - 1 ? (
    <tr key={"h-only-" + rowIndex}>
      {[...Array(COLUMNS)].map((x, colIndex) =>
        horizontalRow({ rowIndex, colIndex, handlers })
      )}
    </tr>
  ) : (
    <>
      <tr key={"h-" + rowIndex}>
        {[...Array(COLUMNS)].map((x, colIndex) =>
          horizontalRow({ rowIndex, colIndex, handlers })
        )}
      </tr>
      <tr key={"v-" + rowIndex}>
        {[...Array(COLUMNS)].map((x, colIndex) => (
          <VerticalRow
            key={"vr-" + rowIndex + "-" + colIndex}
            rowIndex={rowIndex}
            colIndex={colIndex}
            handlers={handlers}
          />
        ))}
      </tr>
    </>
  );

const Line: FC<LineProps> = (lineProps: LineProps) => {
  const [isPlayed, setIsPlayed] = useState(Boolean);
  let lineClass =
    "boxborder " +
    (lineProps.isHorizontal ? "hline" : "vline") +
    (isPlayed ? " played" : "");
  let click = () => {
    game.play(
      lineProps.colIndex ?? 0,
      lineProps.rowIndex,
      lineProps.isHorizontal
    );

    if (isPlayed) {
      return;
    }
    setIsPlayed(true);
    if (game.isPlayer1Turn) {
      lineProps.handlers.SetPlayer1Score(game.player1Score);
    } else {
      lineProps.handlers.SetPlayer2Score(game.player2Score);
    }
    lineProps.handlers.SetIsPlayer1Turn(game.isPlayer1Turn);
  };

  return (
    <td className={lineClass} onClick={click}>
      {" "}
      {lineProps.isHorizontal ? "vl" : "hl"}{" "}
    </td>
  );
};

type GameHandlers = {
  SetIsPlayer1Turn: React.Dispatch<SetStateAction<boolean>>;
  SetPlayer1Score: React.Dispatch<SetStateAction<number>>;
  SetPlayer2Score: React.Dispatch<SetStateAction<number>>;
};

const Board: FC = () => {
  const [isPlayer1Turn, SetIsPlayer1Turn] = useState(true);
  const [player1Score, SetPlayer1Score] = useState(0);
  const [player2Score, SetPlayer2Score] = useState(0);

  const handlers: GameHandlers = {
    SetIsPlayer1Turn,
    SetPlayer1Score,
    SetPlayer2Score,
  };
  return (
    <div>
      <PlayerScores
        IsPlayer1Turn={isPlayer1Turn}
        Player1Score={player1Score}
        Player2Score={player2Score}
      />
      <table>
        <tbody key="body">
          {[...Array(ROWS)].map((x, i) => (
            <ObjectRow key={"or-" + i} rowIndex={i} handlers={handlers} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Board;
