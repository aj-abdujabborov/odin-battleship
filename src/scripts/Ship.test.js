import Ship from "./Ship";

describe("Length behaves as expected", () => {
  test("Make a ship object and return its length", () => {
    expect(new Ship().length).toBe(0);
  });

  test("Setting length to 3 returns appropriate length", () => {
    expect(new Ship(3).length).toBe(3);
  });

  test("Setting length to -1 throws error", () => {
    expect(() => new Ship(-1).length).toThrow();
  });
});

describe("isSunk() works", () => {
  const ship = new Ship(3);

  test("After doing 1 hit, ship of length 3 is not sunk", () => {
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  test("After doing 3 hits, ship of length 3 is sunk", () => {
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
