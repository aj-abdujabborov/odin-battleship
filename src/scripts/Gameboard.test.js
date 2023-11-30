import Gameboard from "./Gameboard";

describe("Gameboard records attacks", () => {
  test("Attacked cells are reflected", () => {
    const gameboard = new Gameboard();
    gameboard.receiveAttack(0, 0);

    expect(gameboard.isAttacked(0, 0)).toBe(true);
    expect(gameboard.isAttacked(0, 1)).toBe(false);
  });

  test("Attacked ships are reflected", () => {
    const gameboard = new Gameboard();

    gameboard.placeShip(0, 1, 3, "up");
    expect(gameboard.isShipHitAtCoord(0, 1)).toBe(false);
    expect(gameboard.isShipHitAtCoord(0, 2)).toBe(false);
    gameboard.receiveAttack(0, 2);
    expect(gameboard.isShipHitAtCoord(0, 2)).toBe(true);
  });

  test("Sunk ship is reflected", () => {
    const gameboard = new Gameboard();

    gameboard.placeShip(0, 1, 3, "up");
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 2);
    expect(gameboard.isShipDown(0, 1)).toBe(false);
    gameboard.receiveAttack(0, 3);
    expect(gameboard.isShipDown(0, 1)).toBe(true);
  });
});

describe("Gameboard can return its state", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(0, 1, 3, "up");
  gameboard.receiveAttack(3, 4);

  let temp = gameboard.getState();
  let boardState = temp.board;
  const key = temp.key;

  expect(key).toHaveProperty("sunkShip");
  expect(key).toHaveProperty("hitShip");
  expect(key).toHaveProperty("noShip");
  expect(key).toHaveProperty("unknown");

  expect(boardState[3][4] === key.noShip).toBe(true);
  expect(boardState[3][5] === key.noShip).toBe(false);
  expect(boardState[0][1] === key.unknown).toBe(true);

  expect(boardState[0][1] === key.hitShip).toBe(false);
  gameboard.receiveAttack(0, 1);
  boardState = gameboard.getState().board;
  expect(boardState[0][1] === key.hitShip).toBe(true);
  gameboard.receiveAttack(0, 2);
  gameboard.receiveAttack(0, 3);
  boardState = gameboard.getState().board;
  expect(boardState[0][1] === key.sunkShip).toBe(true);
});
