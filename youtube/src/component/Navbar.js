//import classes from '*.module.css';
import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 2,
    color: 'white',
    marginRight: theme.spacing(2),
  },
}));

const Navbar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            <Link to="/home" className={classes.title}>
              Home
            </Link>
            <Link to="/watchlater" className={classes.title}>
              WatchLater
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
