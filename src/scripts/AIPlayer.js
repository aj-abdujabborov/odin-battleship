/* eslint-disable max-classes-per-file */

import getRandomShipLocations from "./getRandomShipLocations";

export default class AIPlayer {
  constructor(name = "AI") {
    this.name = name;
  }

  static getShipPlacements(dim, shipLengths) {
    return getRandomShipLocations(dim, shipLengths);
  }

  static getMove(board, key) {
    // check first if any hitShip elements exist, and if so, target a neighbor

    const unknowns = [];
    board.forEach((outElem, outInd) =>
      outElem.forEach((elem, ind) => {
        if (elem === key.unknown) unknowns.push([outInd, ind]);
      }),
    );

    const cellNoToAttack = Math.floor(Math.random() * unknowns.length);
    return unknowns[cellNoToAttack];
  }
}
