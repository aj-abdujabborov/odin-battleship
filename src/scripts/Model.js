import view from "./View";
import game from "./Game";

export default (function Model() {
  function refreshView(turn) {
    view.refreshView({
      ...game.getGameFromPlayerPOV(),
      turn: turn || game.whoseTurn(),
    });

    if (game.isGameOver()) {
      view.announceWinner(game.didPlayerWin() ? "player" : "opponent");
    }
  }

  let acceptInputs = true;
  function playerMoves(oppX, oppY) {
    if (!acceptInputs) return;
    if (!game.applyPlayerMove(oppX, oppY)) return;
    acceptInputs = false;
    refreshView();

    if (game.isGameOver()) {
      acceptInputs = true;
      return;
    }

    game.requestAIMove();
    setTimeout(() => refreshView("opponent"), 300); // time until opponent's move is shown
    setTimeout(() => {
      refreshView();
      acceptInputs = true;
    }, 500); // time until it's player's turn again
  }

  function resetGame() {
    game.restart();
    refreshView();
  }

  refreshView();

  return {
    playerMoves,
    resetGame,
  };
})();
