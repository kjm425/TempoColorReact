import React, { Component } from "react";
import anime from "animejs";
import $ from "jquery";

function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function expandVolumeArray(segments) {
  let times = [];
  let volumes = [];

  for (let i = 0; i < segments.length; i++) {
    let nextVolStart =
      i < segments.length - 1 ? segments[i + 1].loudness_start : 0;

    times.push(segments[i].start);
    times.push(segments[i].start + segments[i].loudness_max_time / 2);
    times.push(segments[i].start + segments[i].loudness_max_time);
    times.push(
      segments[i].start +
        segments[i].loudness_max_time +
        (segments[i].duration - segments[i].loudness_max_time) / 2
    );
    volumes.push(segments[i].loudness_start);
    volumes.push((segments[i].loudness_start + segments[i].loudness_max) / 2);
    volumes.push(segments[i].loudness_max);
    volumes.push((segments[i].loudness_max + nextVolStart) / 2);
  }
  return [times, volumes];
}

function expandPitchArray(segments) {
  let times = [];
  let pitches = [];

  for (let i = 0; i < segments.length - 1; i++) {
    times.push(segments[i].start);
    times.push(segments[i].start + segments[i].duration / 2);
    pitches.push(segments[i].timbre);
    let avgPitch = [];
    for (let j = 0; j < 12; j++) {
      avgPitch.push((segments[i].pitches[j] + segments[i + 1].timbre[j]) / 2);
    }
    pitches.push(avgPitch);
  }
  return [times, pitches];
}

function easeRandomColorDot() {
  let store = window.store;
  let dots = document.getElementsByClassName("colorDot");
  let color = getRandomColor();
  for (let i = 0; i < dots.length; i++) {
    setTimeout(function() {
      anime({
        targets: dots[i],
        backgroundColor: color,
        duration: 100,
        easing: "linear"
      });
    }, 3 * i);
  }
  store.dispatch({ type: "COLOR_HISTORY_CHANGED", color });
}

function animatePitch(pitchVector) {
  let dots = document.getElementsByClassName("colorDot");
  let halfHeight = window.innerHeight / 2
  for (let i = 0; i < dots.length; i++) {
    let leftScalar = Math.floor(11 * (i / dots.length));
    let betweenValueLen = dots.length / 11;
    let betweenValuePos = (i - leftScalar * betweenValueLen) / betweenValueLen;
    let position =
      pitchVector[leftScalar + 1] * betweenValuePos +
      pitchVector[leftScalar] * (1 - betweenValuePos);
    let centering = 0;
    if (position > 0) {
      centering = halfHeight - 3 * Math.abs(position);
    } else {
      centering = halfHeight;
    }
    anime({
      top: centering,
      targets: dots[i],
      height: Math.abs(position) * 3,
      duration: 100,
      easing: "linear"
    });
  }
}

function updateDots(
  volumeTimes,
  volumes,
  pitchTimes,
  pitches,
  startTime,
  startPos
) {
  // Possibily only call at next change time, smooth transitions
  let trackTime = (Date.now() - startTime + startPos) / 1000;
  let meanVolume,
    sum = 0;
  for (let k = 0; k < volumes.length; k++) {
    sum += volumes[k];
  }
  meanVolume = sum / volumes.length;
  // console.log(pitchTimes, volumeTimes);
  for (let i = 0; i < volumeTimes.length; i++) {
    if (volumeTimes[i] >= trackTime) {
      // let scalar = Math.round((volumes[i - 1] + 25));
      if (volumes[i - 1] > meanVolume / 1.5) {
        easeRandomColorDot();
      }
      break;
    }
  }
  for (let i = 0; i < pitchTimes.length; i++) {
    if (pitchTimes[i] >= trackTime) {
      let pitchVector = pitches[i - 1];
      animatePitch(pitchVector);
      break;
    }
  }
}

class ColorDot extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentDidMount() {
    // setInterval(easeRandomColorDot, 1000);
  }

  componentWillReceiveProps(nextProps) {
    let playerState = nextProps.webPlayerInfo.state;
    if (playerState != null) {
      if (!playerState.paused) {
        let posTime = playerState.position;
        let initTime = Date.now();
        // easeRandomColorDot())
        $.ajax({
          type: "GET",
          url:
            "https://api.spotify.com/v1/audio-analysis/" +
            playerState.track_window.current_track.id,
          beforeSend: function(xhr) {
            xhr.setRequestHeader(
              "Authorization",
              "Bearer " + localStorage.getItem("tempoToken").slice(1, -1)
            );
          },
          success: function(result) {
            let segments = result.segments;
            let timesVolumes = expandVolumeArray(segments);
            let volumeTimes = timesVolumes[0];
            let volumes = timesVolumes[1];
            let timesPitches = expandPitchArray(segments);
            let pitchTimes = timesPitches[0];
            let pitches = timesPitches[1];
            if (window.interval) {
              clearInterval(window.interval);
            }
            window.interval = setInterval(
              updateDots,
              100,
              volumeTimes,
              volumes,
              pitchTimes,
              pitches,
              initTime,
              posTime
            );
          }
        });
      } else if (window.interval) {
        clearInterval(window.interval);
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  render() {
    let dots = [];
    for (let i = 0; i < 150; i++) {
      dots.push(
        <div
          style={{
            position: "absolute",
            width: 9,
            left: i * 10 + 20,
            top: window.innerHeight / 2,
            height: 10,
            margin: 0,
            backgroundColor: "black",
            borderRadius: "5px"
          }}
          key={i}
          className="colorDot"
        />
      );
    }
    return dots;
  }
}

ColorDot.propTypes = {};

export default ColorDot;
