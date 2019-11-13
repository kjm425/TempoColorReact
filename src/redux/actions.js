// action types
export const WEB_PLAYER_READY = "WEB_PLAYER_READY";
export const WEB_PLAYER_NOT_READY = "WEB_PLAYER_NOT_READY";
export const WEB_PLAYER_CHANGED = "WEB_PLAYER_CHANGED";
export const COLOR_HISTORY_CHANGED = "COLOR_HISTORY_CHANGED";
export const WINDOW_RESIZE = "WINDOW_RESIZE";

// action creators
export function webPlayerReady() {
  return { type: WEB_PLAYER_READY };
}

export function webPlayerNotReady() {
  return { type: WEB_PLAYER_NOT_READY };
}

export function webPlayerChange(state) {
  return { type: WEB_PLAYER_CHANGED, action: state };
}

export function colorHistoryChange(newColor) {
  return { type: COLOR_HISTORY_CHANGED, action: newColor };
}

export function windowResize() {
  return { type: WINDOW_RESIZE };
}
