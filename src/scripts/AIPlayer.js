/* eslint-disable max-classes-per-file */

import getRandomShipLocations from "./getRandomShipLocations";
import coordOps from "./CoordinateOperations";
import arrOps from "./ArrayOperations";

export default function AIPlayer() {
  let hitShipStart = null;
  let hitShipEnd = null;
  let prevTarget = null;

  function isCoordFurtherAhead(coordA, coordB) {
    // Assumes coordinate difference is only in one axis
    return arrOps.minus(coordA, coordB).find((value) => value !== 0) > 0;
  }

  function getMove(board, key) {
    const dim = board.length;
    function isLastHitShipUnsunk() {
      return (
        hitShipStart && board[hitShipStart[0]][hitShipStart[1]] === key.hitShip
      );
    }

    function isPrevHitAnUnsunkShip() {
      return prevTarget && board[prevTarget[0]][prevTarget[1]] === key.hitShip;
    }

    function guessNextLocationOfKnownShip() {
      if (!hitShipStart) return undefined;

      const unitDirection = arrOps
        .minus(hitShipEnd, hitShipStart)
        .map((scalar) => (scalar === 0 ? 0 : 1));

      if (coordOps.areCoordsEqual(unitDirection, [0, 0])) {
        const neighbors = coordOps.get4Neighbors(
          hitShipStart[0],
          hitShipStart[1],
          dim,
        );
        const target = neighbors.find(
          (neighb) => board[neighb[0]][neighb[1]] === key.unknown,
        );
        return target;
      }

      const targetOptions = [
        arrOps.plus(hitShipEnd, unitDirection),
        arrOps.minus(hitShipStart, unitDirection),
      ];
      targetOptions.sort(() => Math.random - 0.5);

      for (let i = 0; i < targetOptions.length; i += 1) {
        const target = targetOptions[i];
        if (
          coordOps.areCoordsWithinRange(target, 0, dim - 1) &&
          board[target[0]][target[1]] === key.unknown
        ) {
          return target;
        }
      }

      return undefined;
    }

    function getRandomUnhitCoords() {
      const unknowns = [];
      board.forEach((outElem, outInd) =>
        outElem.forEach((elem, ind) => {
          if (elem === key.unknown) unknowns.push([outInd, ind]);
        }),
      );

      const cellNoToAttack = Math.floor(Math.random() * unknowns.length);
      return unknowns[cellNoToAttack];
    }

    if (isLastHitShipUnsunk() && isPrevHitAnUnsunkShip()) {
      if (isCoordFurtherAhead(prevTarget, hitShipStart)) {
        hitShipEnd = prevTarget;
      } else {
        hitShipStart = prevTarget;
      }
    } else if (isPrevHitAnUnsunkShip()) {
      hitShipStart = prevTarget;
      hitShipEnd = prevTarget;
    }

    let target = guessNextLocationOfKnownShip();

    if (!target) {
      target = getRandomUnhitCoords();
      hitShipStart = null;
      hitShipEnd = null;
    }

    prevTarget = target;
    return target;
  }

  function getShipPlacements(dim, shipLengths) {
    return getRandomShipLocations(dim, shipLengths);
  }

  return { getMove, getShipPlacements };
}
