import React, { useState, useContext } from "react";
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
  Input,
  InputAdornment,
} from "@material-ui/core/";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import AlertPop from "../alert/AlertPop";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
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
function UpdateUser() {
  const auth = useContext(AuthContext);
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [access, setAccess] = useState("");
  const [values, setValues] = useState({ showPassword: false });
  // const [open, setOpen] = useState(false);
  const [resp, setResp] = useState("");
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    // alert(`Submitting : ${userName},${password},${access}`);
    const response = await axios.patch(
      "http://34.122.82.176:3000/post/modifyUser",
      {
        username: userName,
        password: password,
        access: access,
      }
    );
    setResp(response.data);
    setUserName("");
    setPassword("");
    setAccess("");
    console.log(response.data);
    // setOpen(!open);
  };
  const alertMessage = () => {
    if (resp === "user already exists") {
      return false;
    } else if (resp === "successfully updated") {
      return true;
    }
  };
  // const AlertBadge = () => {
  //   if (resp === "user already exists") {
  //     return (
  //       <div className={classes.root} style={{ margin: "1rem" }}>
  //         <Collapse in={open}>
  //           <Alert
  //             action={
  //               <IconButton
  //                 aria-label="close"
  //                 color="inherit"
  //                 size="small"
  //                 onClick={() => {
  //                   setOpen(false);
  //                 }}
  //               >
  //                 <CloseIcon fontSize="inherit" />
  //               </IconButton>
  //             }
  //             severity="error"
  //           >
  //             User doesn't exist.
  //           </Alert>
  //         </Collapse>
  //       </div>
  //     );
  //   } else if (resp === "successfully updated") {
  //     return (
  //       <div className={classes.root} style={{ margin: "1rem" }}>
  //         <Collapse in={open}>
  //           <Alert
  //             action={
  //               <IconButton
  //                 aria-label="close"
  //                 color="inherit"
  //                 size="small"
  //                 onClick={() => {
  //                   setOpen(false);
  //                 }}
  //               >
  //                 <CloseIcon fontSize="inherit" />
  //               </IconButton>
  //             }
  //             severity="success"
  //           >
  //             User Updated.
  //           </Alert>
  //         </Collapse>
  //       </div>
  //     );
  //   } else {
  //     return null;
  //   }
  // };
  const SubmitButton = () => {
    if (userName.trim() && password.trim() && access.trim()) {
      return (
        <Button
          variant="contained"
          style={{ backgroundColor: "#fdb900" }}
          onClick={handleSubmit}
        >
          SUBMIT
        </Button>
      );
    } else {
      return (
        <Button variant="contained" disabled onClick={handleSubmit}>
          SUBMIT
        </Button>
      );
    }
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Grid style={{ width: "100%", margin: "2%" }}>
      <Paper elevation={3}>
        <Typography
          variant="h5"
          style={{
            textAlign: "center",
            background: "#3f51b5",
            color: "white",
            padding: "0.6rem",
          }}
        >
          UPDATE USER
        </Typography>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <TextField
            style={{ marginBottom: "0.8rem" }}
            id="standard"
            label="Username"
            value={userName}
            fullWidth="True"
            onChange={(e) => setUserName(e.target.value.trim())}
            autoComplete="off"
            disabled={auth.accessIs === "limited"}
          />
          {/* <TextField
            style={{ marginBottom: "0.8rem" }}
            id="standard-password-input"
            label="Password"
            type="password"
            fullWidth="True"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          /> */}
          <FormControl style={{ width: "100%" }}>
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={password}
              disabled={auth.accessIs === "limited"}
              onChange={
                (handleChange("password"),
                (e) => setPassword(e.target.value.trim()))
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Access</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={access}
              onChange={(e) => setAccess(e.target.value)}
              fullWidth="True"
              disabled={auth.accessIs === "limited"}
            >
              <MenuItem value={"limited"}>Limited</MenuItem>
              <MenuItem value={"all"}>All</MenuItem>
            </Select>
          </FormControl>
          {/* <AlertBadge /> */}
          <AlertPop
            pop={alertMessage()}
            success="User updated."
            failure="User doesn't exist."
          />
          <SubmitButton />
        </div>
      </Paper>
    </Grid>
  );
}

export default UpdateUser;
