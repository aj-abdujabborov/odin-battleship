import Gameboard from "./Gameboard";
import AIPlayer from "./AIPlayer";
import getRandomShipLocations from "./getRandomShipLocations";
import view from "./View";

function startGame() {
  const dim = 10;
  const shipLengths = [5, 4, 4, 3, 3, 2, 2, 1];

  const boards = {
    player: new Gameboard(dim),
    opponent: new Gameboard(dim),
  };

  Object.keys(boards).forEach((player) => {
    let shipPlacements;
    if (player === "player") {
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

  function refreshView(switchTurn) {
    view.refreshView({
      playerBoard: boards.player.getInsiderKnowledge(),
      playerBoardKey: Gameboard.getInsiderKey(),
      opponentBoard: boards.opponent.getOutsiderKnowledge(),
      opponentBoardKey: Gameboard.getOutsiderKey(),
      switchTurn,
    });
  }

  function actuatePlayerMove(x, y) {
    if (boards.opponent.isAttacked(x, y)) return false;
    boards.opponent.receiveAttack(x, y);
    if (boards.opponent.areAllShipsDown()) {
      playerWon = true;
    }
    return true;
  }

  function actuateOpponentMove() {
    const [x, y] = AIPlayer.getMove(
      boards.player.getOutsiderKnowledge(),
      Gameboard.getOutsiderKey(),
    );
    boards.player.receiveAttack(x, y);
    if (boards.player.areAllShipsDown()) {
      playerWon = false;
    }
  }

  let acceptMoves = true;
  function playerMoves(oppX, oppY) {
    if (!acceptMoves) return;
    if (playerWon !== null) return;
    if (!actuatePlayerMove(oppX, oppY)) return;
    acceptMoves = false;
    refreshView(true);

    if (playerWon !== null) return;
    actuateOpponentMove();
    setTimeout(() => refreshView(false), 500);
    setTimeout(() => {
      refreshView(true);
      acceptMoves = true;
    }, 750);
  }

  refreshView(false);

  return {
    playerMoves,
  };
})();
