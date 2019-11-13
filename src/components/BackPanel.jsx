import React, { Component } from "react";
import anime from "animejs";

class BackPanel extends Component {
  constructor(props) {
    super(props);
    this.colorHistory = props.colorHistory;
  }

  componentWillReceiveProps(nextProps) {
    this.colorHistory = nextProps.colorHistory.state;
    let panels = document.getElementsByClassName("backPanel");
    for (let i = 0; i < this.colorHistory.length - 1; i++) {
      console.log(i);
      anime({
        targets: panels[9 - i],
        backgroundColor: this.colorHistory[i + 1],
        duration: 200,
        easing: "linear"
      });
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
