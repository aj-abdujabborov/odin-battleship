import coordOps from "./CoordinateOperations";

describe("Check getSurroundingValues()", () => {
  test("A non-edge-placed box of 1 correctly gives 8 surrounding values", () => {
    const surrVals = coordOps.getSurroundingValues(3, 3, 1, "right", 8);
    expect(surrVals.length).toBe(8);
  });

  test("A corner edge placed box of length 1 correctly gives 3 values", () => {
    const surrVals = coordOps.getSurroundingValues(0, 0, 1, "right", 8);
    expect(surrVals.length).toBe(3);
  });

  test("A top-right-corner-edge-placed box of length 3 correctly returns 5 values", () => {
    const surrVals = coordOps.getSurroundingValues(7, 5, 3, "up", 8);
    expect(surrVals.length).toBe(5);
  });
});
