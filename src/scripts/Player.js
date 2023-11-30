/* eslint-disable max-classes-per-file */

import getRandomShipLocations from "./getRandomShipLocations";

function prettyBoardPrinter(board, key) {
  let str = "";
  board.forEach((elem) => {
    elem.forEach((cell) => {
      let el;
      if (cell === key.unknown) el = " ";
      else if (cell === key.noShip) el = "O";
      else if (cell === key.shipHit) el = "H";
      else el = "X";
      str += `${el}|`;
    });
    console.log(str);
  });
}

class Player {
  constructor(name = "Player") {
    this.name = name;
  }
}

class HumanPlayer extends Player {
  getShipPlacements(dim) {}

  getMove(board, key) {
    // prettyBoardPrinter(board, key);
    // const temp = prompt("Enter 'x,y' coordinate to make hit");
    // return temp.split(",").map((inp) => Number(inp));
  }
}

class AIPlayer extends Player {
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

export { HumanPlayer, AIPlayer, prettyBoardPrinter };
