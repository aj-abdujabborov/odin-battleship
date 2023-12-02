import dom from "./DOMElems";

export default (function View() {
  function reflectBoard(board, keyToID, keyToClass, parent) {
    function findKeyByValue(object, value) {
      return Object.keys(object).find((k) => object[k] === value);
    }

    // eslint-disable-next-line no-param-reassign
    parent.textContent = "";

    const dim = board.length;

    for (let y = dim - 1; y >= 0; y -= 1) {
      for (let x = 0; x < dim; x += 1) {
        const cell = document.createElement("div");
        cell.dataset.x = x;
        cell.dataset.y = y;
        cell.classList.add(
          keyToClass[findKeyByValue(keyToID, board[x][y])],
          "cell",
        );
        parent.appendChild(cell);
      }
    }
  }

  function reflectTurn(turn) {
    dom.playerTurn.classList.remove("active");
    dom.opponentTurn.classList.remove("active");

    if (turn === "player") dom.playerTurn.classList.add("active");
    else dom.opponentTurn.classList.add("active");
  }

  function refreshView(data) {
    reflectBoard(
      data.opponentBoard,
      data.opponentBoardKey,
      {
        unknown: "empty",
        noShip: "hit",
        hitShip: "hit-ship",
        sunkShip: "sunk-ship",
      },
      dom.opponent,
    );

    reflectBoard(
      data.playerBoard,
      data.playerBoardKey,
      {
        unhitEmpty: "empty",
        hitEmpty: "hit",
        unhitShip: "unhit-ship",
        hitShip: "sunk-ship",
      },
      dom.player,
    );

    if (data.turn) reflectTurn(data.turn);
  }

  return { refreshView };
  // can rename to "home" and "away" instead of "player" and "opponent"
})();
