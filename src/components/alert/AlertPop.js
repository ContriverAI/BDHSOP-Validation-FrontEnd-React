import React, { useState } from "react";
import {
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  IconButton,
  Collapse,
} from "@material-ui/core/";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    width: "100%",
    "& > * + *": {
      margin: theme.spacing(2),
    },
  },
}));
function AlertPop(props) {
  const classes = useStyles();
  if (props.pop === true) {
    return (
      <div className={classes.root} style={{ margin: "1rem" }}>
        <Alert severity="success" color="success">
          {props.success}
        </Alert>
      </div>
    );
  } else if (props.pop === false) {
    return (
      <div className={classes.root} style={{ margin: "1rem" }}>
        <Alert severity="error" color="error">
          {props.failure}
        </Alert>
      </div>
    );
  } else {
    return null;
  }
}

export default AlertPop;
