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

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
            <Route path='/login' component={() => { window.location = 'https://accounts.spotify.com/en/authorize?response_type=token&client_id=5cceeebf0b1e4604acdfb2e7e8a715cd&redirect_uri=http:%2F%2F127.0.0.1:3000%2F&scope=streaming%20user-read-birthdate%20user-read-email%20user-modify-playback-state%20user-read-private&show_dialog=true'; return null;} }/>
          <Route path='/' component={() => { window.token = window.location.hash.split("=")[1].split("&")[0]; return null}}/>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </Router>
    );
  }
}

export default App;
