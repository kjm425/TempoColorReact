import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import anime from "animejs";

function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function easeRandomColor() {
  let letters = document.getElementsByClassName("colorLetter");
  for (let i = 0; i < letters.length; i++) {
    anime({
      targets: letters[i],
      color: getRandomColor(),
      duration: 2000,
      easing: "linear"
    });
  }
}

class TempoColor extends React.Component {
  componentDidMount() {
    setInterval(easeRandomColor, 2000);
  }

  render() {
    return (
      <div>
        <Typography
          className="TempoColor"
          style={{
            fontFamily: "Righteous",
            display: "inline-block",
            fontSize: "144px",
            position: "fixed",
            left: window.innerWidth / 4,
            top: window.innerHeight / 4
          }}
          variant="h3"
        >
          Tempo
          <span className="colorLetter">C</span>
          <span className="colorLetter">o</span>
          <span className="colorLetter">l</span>
          <span className="colorLetter">o</span>
          <span className="colorLetter">r</span>
        </Typography>
      </div>
    );
  }
}

TempoColor.propTypes = { webPlayerStatus: PropTypes.bool.isRequired };

export default TempoColor;
