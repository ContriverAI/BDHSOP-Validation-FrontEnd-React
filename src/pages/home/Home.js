import React, { useState, useContext } from "react";
import {
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  Container,
  Input,
  InputAdornment,
  IconButton,
} from "@material-ui/core/";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import AlertPop from "../../components/alert/AlertPop";
import shop from "../../asset/shop1.svg";
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
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [resp, setResp] = useState("");
  const [values, setValues] = useState({ showPassword: false });

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    // alert(`Submitting : ${userName},${password}`);
    // setUserName("");
    // setPassword("");
    const response = await axios.post("http://34.71.25.223:3000/login", {
      username: userName,
      password: password,
    });
    setResp(response.data);
    // console.log(response.data);
  };
  const alertMessage = () => {
    if (resp === "Access not granted") {
      return false;
    } else if (resp.msg === "Access Granted") {
      auth.setAccessIs(resp.access);
      auth.login();
      return true;
    }
  };
  // console.log(auth);

  const SubmitButton = () => {
    if (userName.trim() && password.trim()) {
      return (
        <Button
          variant="contained"
          onClick={(e) => {
            handleSubmit(e);
            auth.setUserIs(userName);
          }}
          style={{
            margin: "1rem",
            backgroundColor: "#fdb900",
            padding: "8px 40px",
          }}
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
          style={{ margin: "1rem", padding: "8px 40px" }}
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
        height: "80vh",
      }}
    >
      <Grid
        style={{
          width: "60%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={shop} style={{ width: "80%" }} alt={"img"} />
      </Grid>
      <Grid style={{ width: "30%" }}>
        <Paper elevation={3}>
          <Typography
            variant="h5"
            style={{
              textAlign: "center",
              background: "#fdb900",
              color: "black",
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
                setUserName(e.target.value.trim());
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
