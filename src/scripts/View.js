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

  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function announceWinner(winner) {
    const loseMessages = [
      "Wouldn't be fun if you never lost :)",
      "You lost... but it's ok",
      "You lost the game, but you can win at life",
      "You lost. That doesn't mean you didn't have fun!",
    ];
    const winMessages = [
      "Ummm, should you... be a general? You won!",
      "Winner winner, blueberry pie dinner",
      "How to account for you defeating the bot? Man you are nooooon-stop!",
      "You won! ...Oh don't worry about the AI. It probably can't feel anything...",
    ];

    dom.winnerDialog.emoji.classList.remove("winner", "loser");
    dom.winnerDialog.emoji2.classList.remove("winner", "loser");
    dom.winnerDialog.emoji2.textContent = "";

    if (winner === "player") {
      dom.winnerDialog.emoji.textContent = "🥳";
      dom.winnerDialog.emoji.classList.add("winner");
      dom.winnerDialog.emoji2.textContent = "🌈";
      dom.winnerDialog.emoji2.classList.add("winner");
      dom.winnerDialog.text.textContent = getRandomElement(winMessages);
    } else {
      dom.winnerDialog.emoji.textContent = "😕";
      dom.winnerDialog.emoji.classList.add("loser");
      dom.winnerDialog.emoji2.classList.add("loser");
      dom.winnerDialog.text.textContent = getRandomElement(loseMessages);
    }

    dom.winnerDialog.dialog.showModal();
  }

  return { refreshView, announceWinner };
  // can rename to "home" and "away" instead of "player" and "opponent"
})();
