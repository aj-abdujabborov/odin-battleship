import getRandomShipLocations from "./getRandomShipLocations";

test("getRandomShipLocations gives requested locations", () => {
  const locArray = getRandomShipLocations(8, [4, 3, 2, 1, 1]);
  expect(locArray.length).toBe(5);
  expect(locArray[0]).toHaveProperty("coords");
  expect(locArray[0]).toHaveProperty("dir");
  expect(locArray[0].length).toBe(4);

  const coords = locArray[0].coords;
  expect(locArray[0].coords[0]);
});

describe("getRandomShipLocations gives initial coordinates that are within bounds", () => {
  for (let i = 0; i < 1; i += 1) {
    const locArray = getRandomShipLocations(8, [8, 3, 2, 1, 1]);
    const { coords, dir, length } = locArray[0];

    test("Coordinates are given", () => {
      expect(coords.length).toBe(2);
    });

    test("Starting coordinates are within range", () => {
      expect(coords[0]).toBeGreaterThan(-1);
      expect(coords[0]).toBeLessThan(8);
      expect(coords[1]).toBeGreaterThan(-1);
      expect(coords[1]).toBeLessThan(8);
    });
  }
});

describe("getRandomShipLocations gives final coordinates that are within bounds", () => {
  for (let i = 0; i < 1; i += 1) {
    const locArray = getRandomShipLocations(8, [8, 3]);
    const { coords, dir, length } = locArray[0];

    test("Max length will mean one of the coordinates is 0", () => {
      expect(coords[0] === 0 || coords[1] === 0).toBe(true);
    });

    if (dir === "up") {
      test("End coordinate is within range", () => {
        expect(coords[1] + length - 1).toBeLessThan(8);
      });
    }
  }
});
