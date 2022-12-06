
import Game from './game';
import Box from './Box';

test('player can play turn', () => {
    var g = new Game(3, 3);
    var p = g.play(1, 1, true);
    expect(g.isPlayer1Turn).toBeFalsy();
    expect(debugGame(g)).toBe("({}),({}S)|({}),({}N)");
  });

  test('dodoo can be calculated',() => {

    var result = dodoo(147);
    expect(result).toBe("3×7×7");

    result = dodoo(17);
    expect(result).toBe("17");

  });
  
  function dodoo(n: number) : string {
    return "" + n;
  }
  test('player can play turn', () => {
    var g = new Game(3, 3);
    var p = g.play(1, 1, true);
    expect(g.isPlayer1Turn).toBeFalsy();
    expect(debugGame(g)).toBe("({}),({}S)|({}),({}N)");
  });
  
  test('player2 can play turn', () => {
    var g = new Game(3, 3);
    var p = g.play(1, 1, true);
    g.play(1, 0, true);
    expect(g.isPlayer1Turn).toBeTruthy();
    expect(debugGame(g)).toBe("({}),({}NS)|({}),({}N)");
  });
  
  test('player can take box', () => {
    var g = new Game(3, 3);
    g.play(1, 1, true);
    g.play(1, 0, true);
    g.play(2, 0, false);
    g.play(1, 0, false);
    
    expect(g.player2Score).toBe(1);
    expect(g.player1Score).toBe(0);
    
    expect(debugGame(g)).toBe("({}E),({2}NSEW)|({}),({}N)");
  });
  
  test('players can take all boxes', () => {
    var g = new Game(3, 3);
    g.play(0, 1, true);
    g.play(0, 0, true); 
    g.play(1, 1, true);
    g.play(1, 0, true);
    g.play(2, 0, false);
    g.play(1, 0, false);
    g.play(0, 0, false);
    g.play(2, 1, true);
    g.play(2, 0, true); 
  
    
    expect(g.player2Score).toBe(2);
    expect(g.player1Score).toBe(0);
    expect(g.isPlayer1Turn).toBeFalsy();
    
    expect(debugGame(g)).toBe("({2}NSEW),({2}NSEW)|({}N),({}N)");
  });
  
  
  let debugGame = (game: Game) => game.boxes.map((row, r) => row.map((col, c) => debugCell(col, r, c)).join(",")).join("|");
  function debugCell (box:Box, r: number, c: number) : string {
    var s = `({`;
    if (box.isPlayer1){ s += "1"}
    if (box.isPlayer2){ s += "2"}
    s += "}";
    if (box.hasBorderN){ s += "N"}
    if (box.hasBorderS){ s += "S"}
    if (box.hasBorderE){ s += "E"}
    if (box.hasBorderW){ s += "W"}
    s += ")"; 
    
    return s;
  }