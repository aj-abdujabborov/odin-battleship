import { HumanPlayer, AIPlayer } from "./Player";
import Gameboard from "./Gameboard";

const gameboard = new Gameboard();
gameboard.placeShip(0, 1, 3, "up");
gameboard.receiveAttack(3, 4);

test("Player gives move", () => {
  const move = AIPlayer.getMove(gameboard.getState(), Gameboard.getKey());
  expect(move.length).toBe(2);
});

test("Player gives ship placements", () => {
  const locations = AIPlayer.getShipPlacements(8, [4, 3]);

  expect(locations.length).toBe(2);
  expect(locations[0]).toHaveProperty("x");
  expect(locations[0]).toHaveProperty("y");
  expect(locations[0]).toHaveProperty("dir");
  expect(
    locations[0].dir === "up" ||
      locations[0].dir === "right" ||
      locations[0].dir === "left" ||
      locations[0].dir === "down",
  ).toBe(true);
  expect(locations[0]).toHaveProperty("length");
  expect(locations[0].length).toBe(4);
});
