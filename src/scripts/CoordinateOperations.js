import arrOps from "./ArrayOperations";

export default {
  directionToArray: {
    left: [-1, 0],
    right: [1, 0],
    up: [0, 1],
    down: [0, -1],
  },
  areCoordsEqual(coords1, coords2) {
    if (coords1.length !== coords2.length) return false;
    return coords1.every((elem, index) => elem === coords2[index]);
  },
  doesListIncludeCoord(coordsList, coords) {
    return coordsList.some((elem) => this.areCoordsEqual(elem, coords));
  },
  areCoordsWithinRange(coords, min, max) {
    return coords.every((val) => val >= min && val <= max);
  },
  get2DBoard(dim, callback) {
    const board = [];
    for (let i = 0; i < dim; i += 1) {
      board.push([]);
      for (let j = 0; j < dim; j += 1) {
        board[i].push(callback(i, j));
      }
    }
    return board;
  },
  getBoxCoordinates(x, y, dir, length) {
    const coordsList = [];
    for (let i = 0; i < length; i += 1) {
      const coords = arrOps.plus(
        [x, y],
        arrOps.mult(this.directionToArray[dir], [i, i]),
      );
      coordsList.push(coords);
    }
    return coordsList;
  },
  getOrthogonalNeighbors(coords, dir) {
    const dirArrAbsInv = this.directionToArray[dir]
      .map((scalar) => Math.abs(scalar))
      .map((scalar) => !scalar);

    const coordsList = [];
    coordsList.push(arrOps.plus(coords, dirArrAbsInv));
    coordsList.push(arrOps.minus(coords, dirArrAbsInv));
    return coordsList;
  },
  getSurroundingValues(x, y, length, dir, dim) {
    const { areCoordsWithinRange } = this;
    const coordsList = {
      list: [],
      save(coords) {
        if (areCoordsWithinRange(coords, 0, dim - 1)) {
          this.list.push(coords);
        }
      },
    };

    const dirArr = this.directionToArray[dir];
    coordsList.save(arrOps.minus([x, y], dirArr)); // start - 1
    coordsList.save(arrOps.plus([x, y], arrOps.mult(dirArr, [length, length]))); // end + 1

    const oneBeforeStart = arrOps.minus([x, y], dirArr);
    this.getBoxCoordinates(
      oneBeforeStart[0],
      oneBeforeStart[1],
      dir,
      length + 2,
    ).forEach((coords) =>
      this.getOrthogonalNeighbors(coords, dir).forEach((coo) => {
        coordsList.save(coo);
      }),
    );

    return coordsList.list;
  },
};
