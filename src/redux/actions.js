// action types
export const WEB_PLAYER_READY = "WEB_PLAYER_READY";
export const WEB_PLAYER_NOT_READY = "WEB_PLAYER_NOT_READY";
export const WEB_PLAYER_CONNECTED = "WEB_PLAYER_CONNECTED";

// action creators
export function webPlayerReady() {
  return { type: WEB_PLAYER_READY };
}

export function webPlayerNotReady() {
    return { type: WEB_PLAYER_NOT_READY };
}

export function webPlayerConnected() {
    return { type: WEB_PLAYER_READY };
}