import Ship from "./Ship";

export default class Gameboard {
  constructor() {
    this.dim = 8;
    this.board = Gameboard.buildBoard(this.dim);
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

  getState() {
    const key = {
      unknown: 1,
      noShip: 2,
      hitShip: 3,
      sunkShip: 4,
    };

    const stateFunction = (cell) => {
      if (!cell.attacked) return key.unknown;
      if (!cell.ship) return key.noShip;
      if (!cell.ship.isSunk()) return key.hitShip;
      return key.sunkShip;
    };

    return { board: this.iterator(stateFunction), key };
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