import React, { Component } from "react";
import "./App.css";
import { Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import TempoColorContainer from "./containers/TempoColorContainer";
import BottomBarContainer from "./containers/BottomBarContainer";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { createBrowserHistory } from "history";
import DotContainer from "./containers/DotContainer";
import BackPanelContainer from "./containers/BackPanelContainer";
//import SerialPort from 'serialport';

const theme = createMuiTheme({
  palette: { background: { default: "black" }, type: "dark" }
});

const history = createBrowserHistory();
// const serport = new SerialPort('COM3', { baudRate: 9600 });
// serport.on("open", () => {
//     serport.write('#50#');
//     console.log('serial port open');
// });
class App extends Component {
  render() {
    return (
      <Router history={history}>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <BackPanelContainer />
            <div style={{ color: "white" }}>
              <DotContainer />
            </div>
            <TempoColorContainer />
            <BottomBarContainer />
            <Route
              path="/"
              component={() => {
                if (!localStorage.getItem("tempoToken")) {
                  window.location =
                      // tempocolor.herokuapp.com
                      // 127.0.0.1:3000
                    "https://accounts.spotify.com/en/authorize?response_type=token&client_id=5cceeebf0b1e4604acdfb2e7e8a715cd&redirect_uri=http:%2F%2Ftempocolor.herokuapp.com%2Ftoken%2F&scope=streaming%20user-read-birthdate%20user-read-email%20user-modify-playback-state%20user-read-private&show_dialog=false";
                  return null;
                } else {
                  return <Redirect to="/player" />;
                }
              }}
            />
            <Route
              path="/token"
              component={() => {
                localStorage.setItem(
                  "tempoToken",
                  JSON.stringify(
                    window.location.hash.split("=")[1].split("&")[0]
                  )
                );
                return <Redirect to="/player" />;
              }}
            />
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
