import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import MenuIcon from "@material-ui/icons/Menu";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import green from "@material-ui/core/colors/green";

const styles = theme => ({
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  bottomBar: {
    backgroundColor: "black",
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
    backgroundColor: green[700],
    "&:hover": {
      backgroundColor: green[900],
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: theme.palette.primary.main
      }
    },
    color: "white"
  }
});

function BottomBar(props) {
  const { classes } = props;
  let playButton = props.webPlayerStatus ? (
    <Fab aria-label="Add" className={classes.playButton}>
      <PlayArrowIcon />
    </Fab>
  ) : null;
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" className={classes.bottomBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton color="inherit" aria-label="Open drawer">
            <MenuIcon />
          </IconButton>
            {playButton}
          <div>
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
            <IconButton color="inherit">
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

BottomBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BottomBar);
