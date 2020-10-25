import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";

import Button from "@material-ui/core/Button";

import { NavLink } from "react-router-dom";
import "./Navigation.css";
import { AuthContext } from "../../context/AuthContext";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
}));

function Navigation(props) {
  const auth = useContext(AuthContext);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ flexDirection: "row", padding: "1.2rem" }}
      >
        {auth.isLoggedIn && (
          <div
            style={{
              width: "60%",
              display: "flex",
              alignItems: "center",
              marginRight: "auto",
            }}
          >
            <NavLink
              exact
              to="/add"
              className={classes.link}
              style={{ marginRight: "1.2rem", padding: "0.4rem 0.6rem" }}
              activeClassName="nav-active"
            >
              ADD RECORD
            </NavLink>

            <NavLink
              exact
              // to="/view"
              to="/"
              className={classes.link}
              style={{ marginRight: "1.2rem", padding: "0.4rem 0.6rem" }}
              activeClassName="nav-active"
            >
              VIEW DATA
            </NavLink>

            <NavLink
              exact
              to="/create"
              className={classes.link}
              style={{ marginRight: "1.2rem", padding: "0.4rem 0.6rem" }}
              activeClassName="nav-active"
            >
              CREATE USER
            </NavLink>
            {/* </Typography> */}
          </div>
        )}
        <div
          style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
        >
          <Button variant="contained" color="secondary" onClick={auth.logout}>
            <NavLink
              exact
              to="/"
              style={{ color: "white", textDecoration: "none" }}
            >
              LOG OUT
            </NavLink>
          </Button>
        </div>
      </AppBar>
    </div>
  );
}

export default Navigation;
