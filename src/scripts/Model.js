import Gameboard from "./Gameboard";
import AIPlayer from "./AIPlayer";
import getRandomShipLocations from "./getRandomShipLocations";

export default (function Model() {
  const players = {
    human: 0,
    opponent: 1,
  };
  const dim = 10;
  const shipLengths = [4, 3, 3, 2, 2, 1, 1];

  let winner = null;

  const boards = [new Gameboard(dim), new Gameboard(dim)];
  boards.forEach((board, ind) => {
    let shipPlacements;
    if (ind === players.human) {
      shipPlacements = getRandomShipLocations(dim, shipLengths);
    } else {
      shipPlacements = AIPlayer.getShipPlacements(dim, shipLengths);
    }
    shipPlacements.forEach((ship) => {
      board.placeShip(ship.x, ship.y, ship.length, ship.dir);
    });
  });

  function humanPlayerMove(oppX, oppY) {
    if (winner !== null) return;
    if (boards[players.opponent].isAttacked(oppX, oppY)) return;

    boards[players.opponent].receiveAttack(oppX, oppY);
    if (boards[players.opponent].areAllShipsDown()) {
      winner = players.human;
      return;
    }

    const [humanX, humanY] = AIPlayer.getMove(
      boards[players.human].getOutsiderKnowledge(),
      Gameboard.getOutsiderKey(),
    );
    boards[players.human].receiveAttack(humanX, humanY);
    if (boards[players.human].areAllShipsDown()) {
      winner = players.opponent;
    }
  }

  function getPlayerBoard() {
    return boards[players.human].getInsiderKnowledge();
  }

  function getOpponentBoard() {
    return boards[players.opponent].getOutsiderKnowledge();
  }

  function getPlayerBoardKey() {
    return Gameboard.getInsiderKey();
  }

  function getOpponentBoardKey() {
    return Gameboard.getOutsiderKey();
  }

  return {
    humanPlayerMove,
    getPlayerBoard,
    getOpponentBoard,
    getPlayerBoardKey,
    getOpponentBoardKey,
  };
})();
