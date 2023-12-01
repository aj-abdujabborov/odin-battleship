import Ship from "./Ship";

export default class Gameboard {
  constructor(dim = 10) {
    this.dim = dim;
    this.board = Gameboard.buildBoard(this.dim);
    this.ships = [];
  }

  areAllShipsDown() {
    for (let i = 0; i < this.ships.length; i += 1) {
      if (!this.ships[i].isSunk()) return false;
    }
    return true;
  }

  isShipDown(x, y) {
    if (this.board[x][y].ship) return this.board[x][y].ship.isSunk();
    return null;
  }

  isShipHitAtCoord(x, y) {
    return this.board[x][y].ship && this.board[x][y].attacked;
  }

  isAttacked(x, y) {
    return this.board[x][y].attacked;
  }

  receiveAttack(x, y) {
    if (this.board[x][y].attacked) return;

    this.board[x][y].attacked = true;
    if (this.board[x][y].ship) {
      this.board[x][y].ship.hit();
    }
  }

  static getInsiderKey() {
    return {
      unhitEmpty: 1,
      hitEmpty: 2,
      unhitShip: 3,
      hitShip: 4,
    };
  }

  getInsiderKnowledge() {
    const key = Gameboard.getInsiderKey();

    const func = (cell) => {
      if (!cell.ship) {
        if (!cell.attacked) return key.unhitEmpty;
        return key.hitEmpty;
      }
      if (!cell.attacked) return key.unhitShip;
      return key.hitShip;
    };

    return this.iterator(func);
  }

  static getOutsiderKey() {
    return {
      unknown: 1,
      noShip: 2,
      hitShip: 3,
      sunkShip: 4,
    };
  }

  getOutsiderKnowledge() {
    const key = Gameboard.getOutsiderKey();

    const func = (cell) => {
      if (!cell.attacked) return key.unknown;
      if (!cell.ship) return key.noShip;
      if (!cell.ship.isSunk()) return key.hitShip;
      return key.sunkShip;
    };

    return this.iterator(func);
  }

  placeShip(x, y, length, dir) {
    const dirStringToArray = {
      left: [-1, 0],
      right: [1, 0],
      up: [0, 1],
      down: [0, -1],
    };

    function getShipCoordinates() {
      const coords = [];
      for (let i = 0; i < length; i += 1) {
        coords.push(
          [x, y].map(
            (coord, index) => coord + dirStringToArray[dir][index] * i,
          ),
        );
      }
      return coords;
    }

    const checkPointIsWithinRange = (xCoord, yCoord) =>
      xCoord >= 0 && xCoord < this.dim && yCoord >= 0 && yCoord < this.dim;

    const coordList = getShipCoordinates();
    coordList.forEach((coord) => {
      if (!checkPointIsWithinRange(coord[0], coord[1]))
        throw Error("Ship is out of board range");
      if (this.board[coord[0]][coord[1]].ship)
        throw Error("Ship overlaps with existing ship");
    });

    const newShip = new Ship(length);
    this.ships.push(newShip);
    coordList.forEach((coord) => {
      this.board[coord[0]][coord[1]].ship = newShip;
    });
  }

  iterator(callback) {
    return this.board.map((elem) => elem.map(callback));
  }

  static buildBoard(dim) {
    const board = [];
    for (let i = 0; i < dim; i += 1) {
      board.push([]);
      for (let j = 0; j < dim; j += 1) {
        board[i].push({
          attacked: false,
        });
      }
    }
    return board;
  }
}
