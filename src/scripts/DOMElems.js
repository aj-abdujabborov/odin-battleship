const dialog = document.querySelector("dialog.winner-announcement");

export default {
  player: document.querySelector("div.player-board"),
  opponent: document.querySelector("div.opponent-board"),
  playerTurn: document.querySelector(".player-container .turn"),
  opponentTurn: document.querySelector(".opponent-container .turn"),
  resetButton: document.querySelector(".reset-button"),
  winnerDialog: {
    dialog,
    emoji: dialog.querySelector(".emoji"),
    emoji2: dialog.querySelector(".emoji2"),
    text: dialog.querySelector(".announcement"),
    close: dialog.querySelector(".close-button"),
  },
};
