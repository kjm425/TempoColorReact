import React, { Component } from "react";
import anime from "animejs";

class BackPanel extends Component {
  constructor(props) {
    super(props);
    this.colorHistory = props.colorHistory;
  }

  componentWillReceiveProps(nextProps) {
    let playerState = nextProps.webPlayerInfo;
    if (playerState && nextProps.colorHistory.state) {
      this.colorHistory = nextProps.colorHistory.state;
      let panels = document.getElementsByClassName("backPanel");
      for (let i = 1; i < this.colorHistory.length; i++) {
        anime({
          targets: panels[10 - i],
          backgroundColor: this.colorHistory[i + 1],
          duration: 200,
          easing: "linear"
        });
      }
    } else {
      for (let i = 0; i < 10; i++) {
        setTimeout(function() {
            let panels = document.getElementsByClassName("backPanel");
          anime({
            targets: panels[i],
            backgroundColor: "#000",
            duration: 300,
            easing: "linear"
          });
        }, 30 * i);
      }
    }
  }

  render() {
    let panels = [];
    for (let i = 0; i < 10; i++) {
      panels.push(
        <div
          style={{
            position: "absolute",
            width: window.innerWidth / 10,
            left: (i * window.innerWidth) / 10,
            top: 0,
            height: window.innerHeight,
            margin: 0,
            backgroundColor: "black"
          }}
          key={i}
          className="backPanel"
        />
      );
    }
    return panels;
  }
}

BackPanel.propTypes = {};

export default BackPanel;
