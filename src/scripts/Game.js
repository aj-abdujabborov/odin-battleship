import Gameboard from "./Gameboard";
import getRandomShipLocations from "./getRandomShipLocations";
import AIPlayer from "./AIPlayer";

export default (function Game() {
  let boards;
  let playerWon;
  let AI;
  let turn;

  function advanceTurn() {
    turn = turn === "player" ? "opponent" : "player";
  }

  function restart() {
    const dim = 10;
    const shipLengths = [5, 4, 4, 3, 3, 2, 2, 1];

    boards = {
      player: new Gameboard(dim),
      opponent: new Gameboard(dim),
    };

    Object.keys(boards).forEach((player) => {
      let shipPlacements;
      if (player === "player") {
        shipPlacements = getRandomShipLocations(dim, shipLengths);
      } else {
        AI = AIPlayer();
        shipPlacements = AI.getShipPlacements(dim, shipLengths);
      }
      shipPlacements.forEach((ship) => {
        boards[player].placeShip(ship.x, ship.y, ship.length, ship.dir);
      });
    });

    turn = "player";
    playerWon = null;
  }

  function applyPlayerMove(x, y) {
    if (turn === "opponent" || playerWon !== null) return false;

    if (boards.opponent.isAttacked(x, y)) return false;
    boards.opponent.receiveAttack(x, y);
    if (boards.opponent.areAllShipsDown()) {
      playerWon = true;
    }

    advanceTurn();
    return true;
  }

  function requestAIMove() {
    if (turn === "player" || playerWon !== null) return false;

    const [x, y] = AI.getMove(
      boards.player.getOutsiderKnowledge(),
      Gameboard.getOutsiderKey(),
    );
    boards.player.receiveAttack(x, y);
    if (boards.player.areAllShipsDown()) {
      playerWon = false;
    }

    advanceTurn();
    return true;
  }

  function whoseTurn() {
    return turn;
  }

  function getGameFromPlayerPOV() {
    return {
      playerBoard: boards.player.getInsiderKnowledge(),
      playerBoardKey: Gameboard.getInsiderKey(),
      opponentBoard: boards.opponent.getOutsiderKnowledge(),
      opponentBoardKey: Gameboard.getOutsiderKey(),
    };
  }

  function isGameOver() {
    return playerWon !== null;
  }

  restart();

  return {
    restart,
    applyPlayerMove,
    requestAIMove,
    whoseTurn,
    getGameFromPlayerPOV,
    isGameOver,
  };
})();
