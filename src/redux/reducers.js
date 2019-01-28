import { WEB_PLAYER_NOT_READY } from "./actions";
import { WEB_PLAYER_READY } from "./actions";
import { combineReducers } from "redux";
import anime from 'animejs';

// const initialState = {
//   webPlayerStatus: "WEB_PLAYER_NOT_READY"
// };

function webPlayerStatus(state, action) {
  if (typeof state === "undefined") {
    return false;
  }
  switch (action.type) {
    case "WEB_PLAYER_READY":
        let title = document.getElementsByClassName("TempoColor");

            anime({
                targets: title,
                fontSize: '44px',
                left: '20px',
                top: '20px',
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

const rootReducer = combineReducers({
  webPlayerStatus
});

export default rootReducer;
