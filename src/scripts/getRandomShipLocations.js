import arrOps from "./ArrayOperations";
import coordOps from "./CoordinateOperations";

export default function getRandomShipLocations(dim, shipLengths) {
  const shipLengs = [...shipLengths].sort();

  const takenCellsBoard = coordOps.get2DBoard(dim, () => false);
  const shipLocations = [];

  while (shipLengs.length) {
    const directions = ["up", "right"];
    const dirStr = directions[Math.floor(Math.random() * directions.length)];
    const dirArr = coordOps.directionToArray[dirStr];
    const shipLength = shipLengs[shipLengs.length - 1];

    const maxStartPos = dim - shipLength;
    if (maxStartPos < 0)
      throw Error(
        `Ship of size ${shipLength} is too large to fit into board with dimension ${dim}`,
      );

    const orthoAxisCoord = Math.floor(Math.random() * dim); // ortho axis is perpendicular to ship
    const paralAxisStart = Math.floor(Math.random() * (maxStartPos + 1));

    let startCoord;
    if (dirStr === "up") startCoord = [orthoAxisCoord, paralAxisStart];
    else startCoord = [paralAxisStart, orthoAxisCoord];

    const cellsToOccupy = [];
    for (let i = 0; i < shipLength; i += 1) {
      const cell = arrOps.plus(startCoord, arrOps.mult(dirArr, [i, i]));
      if (!takenCellsBoard[cell[0]][cell[1]]) cellsToOccupy.push(cell);
    }

    if (cellsToOccupy.length === shipLength) {
      shipLocations.push({
        x: startCoord[0],
        y: startCoord[1],
        dir: dirStr,
        length: shipLength,
      });
      shipLengs.pop();
      cellsToOccupy.forEach((coords) => {
        takenCellsBoard[coords[0]][coords[1]] = true;
      });
    }
  }
  return shipLocations;
}
