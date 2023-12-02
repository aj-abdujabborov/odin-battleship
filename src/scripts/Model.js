import view from "./View";
import game from "./Game";

export default (function Model() {
  function refreshView(turn) {
    view.refreshView({
      ...game.getGameFromPlayerPOV(),
      turn: turn || game.whoseTurn(),
    });
  }

  let acceptMoves = true;
  function playerMoves(oppX, oppY) {
    if (!acceptMoves) return;
    if (!game.applyPlayerMove(oppX, oppY)) return;
    acceptMoves = false;
    refreshView();

    if (game.isGameOver()) return;
    game.requestAIMove();
    setTimeout(() => refreshView("opponent"), 500);
    setTimeout(() => {
      refreshView();
      acceptMoves = true;
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
