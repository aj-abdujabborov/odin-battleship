import Gameboard from "./Gameboard";
import AIPlayer from "./AIPlayer";
import getRandomShipLocations from "./getRandomShipLocations";
import view from "./View";

function startGame() {
  const dim = 10;
  const shipLengths = [4, 3, 3, 2, 2, 1, 1];

  const boards = {
    human: new Gameboard(dim),
    opponent: new Gameboard(dim),
  };

  Object.keys(boards).forEach((player) => {
    let shipPlacements;
    if (player === "human") {
      shipPlacements = getRandomShipLocations(dim, shipLengths);
    } else {
      shipPlacements = AIPlayer.getShipPlacements(dim, shipLengths);
    }
    shipPlacements.forEach((ship) => {
      boards[player].placeShip(ship.x, ship.y, ship.length, ship.dir);
    });
  });

  return boards;
}

export default (function Model() {
  const boards = startGame();
  let playerWon = null;

  function refreshView() {
    view.refreshView({
      playerBoard: boards.human.getInsiderKnowledge(),
      playerBoardKey: Gameboard.getInsiderKey(),
      opponentBoard: boards.opponent.getOutsiderKnowledge(),
      opponentBoardKey: Gameboard.getOutsiderKey(),
      switchTurn: true,
    });
  }

  function humanPlayerMove(oppX, oppY) {
    if (playerWon !== null) return;

    if (boards.opponent.isAttacked(oppX, oppY)) return;
    boards.opponent.receiveAttack(oppX, oppY);
    if (boards.opponent.areAllShipsDown()) {
      playerWon = true;
    }

    if (playerWon !== null) return;
    const [humanX, humanY] = AIPlayer.getMove(
      boards.human.getOutsiderKnowledge(),
      Gameboard.getOutsiderKey(),
    );
    boards.human.receiveAttack(humanX, humanY);
    if (boards.human.areAllShipsDown()) {
      playerWon = false;
    }

    refreshView();
  }

  refreshView();

  return {
    humanPlayerMove,
  };
})();
