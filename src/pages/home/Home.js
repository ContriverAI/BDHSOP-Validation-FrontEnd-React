import React, { useCallback, useState, useContext, createContext } from "react";
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
  Container,
  Input,
  InputAdornment,
  IconButton,
} from "@material-ui/core/";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { AuthContext } from "../../context/AuthContext";
import { Event } from "@material-ui/icons";
import axios from "axios";
import AlertPop from "../../components/alert/AlertPop";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Home(props) {
  const auth = useContext(AuthContext);

  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [resp, setResp] = useState("");
  const [values, setValues] = useState({ showPassword: false });

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    // alert(`Submitting : ${userName},${password}`);
    // setUserName("");
    // setPassword("");
    const response = await axios.post("http://34.122.82.176:3000/login", {
      username: userName,
      password: password,
    });
    setResp(response.data);
    console.log(response.data);
  };
  const alertMessage = () => {
    if (resp === "Access not granted") {
      return false;
    } else if (resp.msg === "Access Granted") {
      auth.login();
      return true;
    }
  };
  console.log("from context " + props.userIs);

  const SubmitButton = () => {
    if (userName.trim() && password.trim()) {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => {
            handleSubmit(e);
            auth.setUserIs(userName);
          }}
          style={{ margin: "1rem" }}
        >
          SUBMIT
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          color="primary"
          disabled
          onClick={handleSubmit}
          style={{ margin: "1rem" }}
        >
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
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "70vh",
      }}
    >
      <Grid style={{ width: "50%" }}>
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
            LOGIN
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
              fullWidth="True"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              autoComplete="off"
              value={userName}
            />
            <FormControl style={{ width: "100%" }}>
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={password}
                onChange={
                  (handleChange("password"), (e) => setPassword(e.target.value))
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
            <AlertPop
              pop={alertMessage()}
              success="Access Granted."
              failure="Access Denied."
            />
            <SubmitButton />
          </div>
        </Paper>
      </Grid>
    </Container>
  );
}

export default Home;
