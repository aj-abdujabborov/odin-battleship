function areCoordsEqual(coords1, coords2) {
  if (coords1.length !== coords2.length) return false;
  return coords1.every((elem, index) => elem === coords2[index]);
}

export default {
  areCoordsEqual,
  doesListIncludeCoord(coordsList, coords) {
    return coordsList.some((elem) => areCoordsEqual(elem, coords));
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
  directionToArray: {
    left: [-1, 0],
    right: [1, 0],
    up: [0, 1],
    down: [0, -1],
  },
};
