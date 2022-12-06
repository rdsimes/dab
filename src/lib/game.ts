import Box from "./Box";

class Game {
  isPlayer1Turn: boolean = true;
  player1Score: number = 0;
  player2Score: number = 0;
  readonly columns: number;
  readonly rows: number;
  boxes: Box[][];

  constructor(columns: number, rows: number) {
    this.columns = columns;
    this.rows = rows;

    this.boxes = [...Array(rows - 1)].map((_x, _i) =>
      [...Array(columns - 1)].map((_x, _i) => new Box())
    );
  }

  play(x: number, y: number, isHorizontal: boolean): boolean {
    /*

        1, 1, true
        1, 0, true 
        2, 0, false
        1, 0, false
 
          0   1
        +   + - +
      0     |   |
        +   + - +
      1
        +   +   +
        
        */
    let firstBoxScored: boolean = false;
    let secondBoxScored: boolean = false;
    if ((x > 0 && !isHorizontal) || (y > 0 && isHorizontal)) {
      const box =
        this.boxes[y - (isHorizontal ? 1 : 0)][x - (isHorizontal ? 0 : 1)];
      if (box === undefined) {
        console.log(x, y, isHorizontal, this.boxes);
      }
      if (isHorizontal) {
        if (box.hasBorderS) {
          return false;
        }
        box.hasBorderS = true;
      } else {
        if (box.hasBorderE) {
          return false;
        }
        box.hasBorderE = true;
      }
      firstBoxScored = this.detectAndSetScoringPlay(box);
    }

    if (
      (x < this.rows - 1 && !isHorizontal) ||
      (y < this.columns - 1 && isHorizontal)
    ) {
      const box = this.boxes[y][x];
      if (isHorizontal) {
        if (box.hasBorderN) {
          return false;
        }
        box.hasBorderN = true;
      } else {
        if (box.hasBorderW) {
          return false;
        }
        box.hasBorderW = true;
      }
      secondBoxScored = this.detectAndSetScoringPlay(box);
    }
    if (!(firstBoxScored || secondBoxScored)) {
      this.isPlayer1Turn = !this.isPlayer1Turn;
    }
    return true;
  }

  subscribe(
    rowIndex: number,
    colIndex: number,
    callback: (owner: string) => void
  ) {
    let b = this.boxes[rowIndex][colIndex];
    if (b !== undefined) {
      b.subscriber = callback;
    } else {
      // console.log(rowIndex, colIndex, this.boxes);
    }
  }

  detectAndSetScoringPlay(box: Box) {
    if (
      !box.hasBorderN ||
      !box.hasBorderS ||
      !box.hasBorderE ||
      !box.hasBorderW
    ) {
      return false;
    }

    if (this.isPlayer1Turn) {
      box.isPlayer1 = true;
      this.player1Score++;
      box.subscriber("player1");
    } else {
      box.isPlayer2 = true;
      this.player2Score++;
      box.subscriber("player2");
    }
    return true;
  }
}

export default Game;
