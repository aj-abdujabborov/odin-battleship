import view from "./View";
import model from "./Model";
import dom from "./DOMElems";

export default (function Controller() {
  view.refreshView();

  dom.opponent.addEventListener("click", (e) => {
    if (!e.target.classList.contains("cell")) return;

    const { x, y } = e.target.dataset;
    model.humanPlayerMove(x, y);

    setTimeout(view.refreshView, 1000);
  });

  // add event listener to opponent's board
  // when click is triggered
  //
  // how will i implement the AI taking a sec to respond? oh, you can do it by calling a View refresh with a delay from the Controller
})();
