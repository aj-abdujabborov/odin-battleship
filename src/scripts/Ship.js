export default class Ship {
  constructor(length = 0) {
    if (!Number.isInteger(length) || length < 0) {
      throw Error("Length must be a non-negative integer.");
    }

    this.numHits = 0;
    this.length = length;
  }

  hit() {
    this.numHits += 1;
  }

  isSunk() {
    return this.numHits >= this.length;
  }
}
