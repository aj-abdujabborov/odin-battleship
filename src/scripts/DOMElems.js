const dialog = document.querySelector("dialog.winner-announcement");

export default {
  player: document.querySelector("div.player-board"),
  opponent: document.querySelector("div.opponent-board"),
  playerBeingAttacked: document.querySelector(
    ".player-container .receiving-attack",
  ),
  opponentBeingAttacked: document.querySelector(
    ".opponent-container .receiving-attack",
  ),
  resetButton: document.querySelector(".reset-button"),
  winnerDialog: {
    dialog,
    emoji: dialog.querySelector(".emoji"),
    emoji2: dialog.querySelector(".emoji2"),
    text: dialog.querySelector(".announcement"),
    close: dialog.querySelector(".close-button"),
  },
};
