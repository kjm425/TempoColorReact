import { WEB_PLAYER_NOT_READY } from "./actions";
import { WEB_PLAYER_READY } from "./actions";
import { COLOR_HISTORY_CHANGED } from "./actions";
import { WINDOW_RESIZE } from "./actions";
import { combineReducers } from "redux";
import anime from "animejs";

function webPlayerStatus(state, action) {
  if (typeof state === "undefined") {
    return null;
  }
  switch (action.type) {
    case "WEB_PLAYER_READY":
      let title = document.getElementsByClassName("TempoColor");

      anime({
        targets: title,
        fontSize: "44px",
        left: "20px",
        top: "20px",
        duration: 600,
        easing: "easeOutExpo"
      });

      return true;
    case "WEB_PLAYER_NOT_READY":
      return false;
    default:
      return state;
  }
}

function webPlayerInfo(state, action) {
  if (typeof state === "undefined") {
    return null;
  }
  switch (action.type) {
    case "WEB_PLAYER_CHANGED":
      return action;
    default:
      return state;
  }
}

function colorHistory(state, action) {
  if (typeof state === "undefined") {
    return [];
  }
  switch (action.type) {
    case "COLOR_HISTORY_CHANGED":
      state.unshift(action.color);
      if (state.length > 11) {
        state.pop();
      }
      let newColors = state;
      let panels = document.getElementsByClassName("backPanel");
      for (let i = 0; i < newColors.length - 1; i++) {
        console.log(i);
        anime({
          targets: panels[9 - i],
          backgroundColor: newColors[i + 1],
          duration: 200,
          easing: "linear"
        });
      }
      return state;
    default:
      return state;
  }
}

function windowResize(state, action) {
  if (typeof state === "undefined") {
    return { width: window.innerWidth, height: window.innerHeight };
  }
  switch (action.type) {
    case WINDOW_RESIZE:
      let panels = document.getElementsByClassName("backPanel");
      let width = window.innerWidth;
      let height = window.innerHeight;
      for (let i = 0; i < 10; i++) {
        console.log(i);
        anime({
          targets: panels[i],
          duration: 100,
          easing: "linear",
          width: width / 10,
          left: (i * width) / 10,
          top: 0,
          height: height
        });
      }
      return { width: width, height: height };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  webPlayerInfo,
  webPlayerStatus,
  colorHistory,
  windowResize
});

export default rootReducer;
