import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import green from "@material-ui/core/colors/green";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  bottomBar: {
    backgroundColor: "#34515e", //"#f57c00",
    top: "auto",
    bottom: 0
  },
  toolbar: {
    alignItems: "center",
    justifyContent: "space-between"
  },

  playButton: {
    position: "absolute",
    zIndex: 1,
    top: -15,
    left: 0,
    right: 0,
    margin: "0 auto",
    backgroundColor: "#8eacbb", //'#212121',
    "&:hover": {
      backgroundColor: green[600],
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: theme.palette.primary.main
      }
    },
    color: "black"
  },
  songTitle: {
    fontSize: 24,
    textAlign: "left",
    position: "relative",
    top: 4,
    fontFamily: "Nunito",
    fontWeight: 600
  },
  artist: {
    fontSize: 20,
    textAlign: "left",
    position: "relative",
    top: -4,
    fontFamily: "Open Sans"
  },
  albumImage: {
    // position: "absolute",
    // top: -150,
    // height: 200,
    width: 200,
    float: "right",
    position: "absolute",
    left: window.innerWidth - 200,
    top: -135
  }
});

function BottomBar(props) {
  const { classes } = props;
  let playButton = props.webPlayerStatus ? (
    <Fab
      aria-label="Add"
      onClick={() => {
        window.player.togglePlay();
      }}
      className={classes.playButton}
    >
      {props.webPlayerInfo ? (
        props.webPlayerInfo.state.paused ? (
          <PlayArrowIcon />
        ) : (
          <PauseIcon />
        )
      ) : null}
    </Fab>
  ) : null;

  let trackName = props.webPlayerInfo ? (
    <Typography className={classes.songTitle}>
      {props.webPlayerInfo.state.track_window.current_track.name}
    </Typography>
  ) : null;
  let artist = props.webPlayerInfo ? (
    <Typography className={classes.artist}>
      {props.webPlayerInfo.state.track_window.current_track.artists[0].name}
    </Typography>
  ) : null;
  let albumImage = props.webPlayerInfo ? (
    <img
      src={
        props.webPlayerInfo.state.track_window.current_track.album.images[0].url
      }
      alt="album"
      className={classes.albumImage}
    />
  ) : null;

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" className={classes.bottomBar}>
        <Toolbar className={classes.toolbar}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              {trackName}
              {artist}
            </Grid>
            <Grid item xs={1}>
              {playButton}
            </Grid>
            <Grid item xs={5}>
              {albumImage}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

BottomBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BottomBar);
