import model from "./Model";
import dom from "./DOMElems";

export default (function Controller() {
  dom.opponent.addEventListener("click", (e) => {
    if (!e.target.classList.contains("cell")) return;

    const { x, y } = e.target.dataset;
    model.playerMoves(x, y);
  });

  dom.resetButton.addEventListener("click", () => {
    model.resetGame();
  });

  dom.winnerDialog.close.addEventListener("click", () => {
    dom.winnerDialog.dialog.close();
  });
})();
