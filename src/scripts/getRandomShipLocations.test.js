import getRandomShipLocations from "./getRandomShipLocations";

test("getRandomShipLocations gives requested locations", () => {
  const locArray = getRandomShipLocations(8, [4, 3, 2, 1, 1]);
  expect(locArray.length).toBe(5);
  expect(locArray[0]).toHaveProperty("x");
  expect(locArray[0]).toHaveProperty("y");
  expect(locArray[0]).toHaveProperty("dir");
  expect(locArray[0].length).toBe(4);
});

describe("getRandomShipLocations gives initial coordinates that are within bounds", () => {
  for (let i = 0; i < 1; i += 1) {
    const locArray = getRandomShipLocations(8, [8, 3, 2, 1, 1]);
    const { x, y, length } = locArray[0];

    test("Coordinates are given", () => {
      expect(length).toBe(8);
    });

    test("Starting coordinates are within range", () => {
      expect(x).toBeGreaterThan(-1);
      expect(x).toBeLessThan(8);
      expect(y).toBeGreaterThan(-1);
      expect(y).toBeLessThan(8);
    });
  }
});

describe("getRandomShipLocations gives final coordinates that are within bounds", () => {
  for (let i = 0; i < 100; i += 1) {
    const locArray = getRandomShipLocations(8, [8, 3]);
    const { x, y, dir, length } = locArray[0];

    test("Max length will mean one of the coordinates is 0", () => {
      expect(x === 0 || y === 0).toBe(true);
    });

    if (dir === "up") {
      test("End coordinate is within range", () => {
        expect(y + length - 1).toBeLessThan(8);
      });
    }
  }
});
