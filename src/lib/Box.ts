class Box {
  isPlayer1: boolean = false;
  isPlayer2: boolean = false;
  hasBorderN: boolean = false;
  hasBorderS: boolean = false;
  hasBorderE: boolean = false;
  hasBorderW: boolean = false;
  subscriber: (owner: string) => void = (_o) => {};
}

export default Box;
