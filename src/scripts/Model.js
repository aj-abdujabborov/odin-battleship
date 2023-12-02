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
    setTimeout(() => refreshView("opponent"), 500);
    setTimeout(() => {
      refreshView();
      acceptInputs = true;
    }, 750);
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
