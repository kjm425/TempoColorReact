import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import TestContainer from "./containers/testContainer";
import BottomBar from './components/BottomBar';
import TempoColor from './components/TempoColor';
import TempoColorContainer from './containers/TempoColorContainer';
import BottomBarContainer from './containers/BottomBarContainer';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme(
    {palette: {type:'dark'}}
);

class App extends Component {
  render() {
    return (
      <Router>
          <MuiThemeProvider theme={theme}>
        <div className="App">
            {/*<TempoColor/>*/}
            <TempoColorContainer/>
            <TestContainer />
            <BottomBarContainer/>
          <Route
            path="/login"
            component={() => {
              window.location =
                "https://accounts.spotify.com/en/authorize?response_type=token&client_id=5cceeebf0b1e4604acdfb2e7e8a715cd&redirect_uri=http:%2F%2F127.0.0.1:3000%2Ftoken%2F&scope=streaming%20user-read-birthdate%20user-read-email%20user-modify-playback-state%20user-read-private&show_dialog=true";
              return null;
            }}
          />
          <Route
            path="/token"
            component={() => {
              window.token = window.location.hash.split("=")[1].split("&")[0];
              return <Redirect to="/" />;
            }}
          />
        </div>
          </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
