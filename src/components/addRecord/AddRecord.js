import React, { useState, useContext } from "react";
import "./AddRecord.css";
import axios from "axios";
import AlertPop from "../alert/AlertPop";
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
} from "@material-ui/core/";
import { AuthContext } from "../../context/AuthContext";
let x = '';
function AddRecord() {
  const auth = useContext(AuthContext);
  // const [userName, setUserName] = useState(auth.userIs);
  const [order, setOrder] = useState("");
  const [transaction, setTransaction] = useState("");
  const [amount, setAmount] = useState("");
  const [resp, setResp] = useState("");
  // console.log(auth);
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    // alert(`Submitting : ${order},${transaction},${amount}`);
    const response = await axios.post(
      "http://34.122.82.176:3000/post/addRecord",
      {
        username: auth.userIs,
        ordernumber: order,
        transactionID: transaction,
        amount: amount,
      }
    );
    setResp(response.data);
    setTimeout(() => {
      setAmount("");
      setOrder("");
      setTransaction("");
    }, 1500);
  alert(response.data);
  };
  // console.log(auth);
  const alertMessage = () => {
    if (resp === `record with same order number : '${order}'`) {
      return false;
    } else if (resp === "successfully updated") {
      return true;
    }
  };
  const SubmitButton = () => {
    if (order.trim() && transaction.trim() && amount.trim()) {
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
        <Button
          variant="contained"
          color="primary"
          disabled
          onClick={handleSubmit}
        >
          SUBMIT
        </Button>
      );
    }
  };
  return (
    <div style={{ margin: "1.5rem" }}>
      <Container
        fixed
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          height: "75vh",
        }}
      >
        <Grid item md={6} lg={6}>
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
              RECORD NEW ENTRY
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
                disabled
                style={{ marginBottom: "0.8rem" }}
                id="standard"
                label="Username"
                fullWidth={true}
                value={auth.userIs}
                autoComplete="off"
              />
              <TextField
                style={{ marginBottom: "0.8rem" }}
                value={transaction}
                id="standard"
                label="Transaction ID"
                fullWidth="True"
                onChange={(e) => setTransaction(e.target.value.trim())}
                autoComplete="off"
              />
              <TextField
                style={{ marginBottom: "0.8rem" }}
                value={order}
                id="standard"
                label="Order Number"
                fullWidth="True"
                onChange={(e) => setOrder(e.target.value.trim())}
                autoComplete="off"
                type="number"
              />
              <TextField
                style={{ marginBottom: "0.8rem" }}
                value={amount}
                id="standard"
                label="Amount"
                fullWidth="True"
                onChange={(e) => setAmount(e.target.value.trim())}
                autoComplete="off"
              />
              <AlertPop
                pop={alertMessage()}
                success="Record updated."
                failure={`Record already exists with order number : '${x}'`}
              />
              <SubmitButton />
            </div>
          </Paper>
        </Grid>
      </Container>
    </div>
  );
}

export default AddRecord;
