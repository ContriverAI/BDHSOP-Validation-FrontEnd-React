import React, { useState, useContext } from "react";
import { Paper, Grid, TextField, Button } from "@material-ui/core/";
import axios from "axios";
import AlertPop from "../alert/AlertPop";
import { AuthContext } from "../../context/AuthContext";

function ModalUpdate(props) {
  const auth = useContext(AuthContext);

  const [order, setOrder] = useState("");
  const [transaction, setTransaction] = useState("");
  const [amount, setAmount] = useState("");
  const [resp, setResp] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    // alert(`Submitting : ${order},${transaction},${amount}`);
    const response = await axios.patch(
      "http://34.122.82.176:3000/post/updateRecord",
      {
        username: auth.userIs,
        ordernumber: order,
        transactionID: transaction,
        amount: amount,
      }
    );
    setResp(response.data);
    setOrder("");
    setTransaction("");
    setAmount("");
    console.log(response.data);
  };
  const alertMessage = () => {
    if (resp === "record does not exists") {
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
          style={{ backgroundColor: "#fdb900", padding: "8px 40px" }}
          onClick={(e) => {
            handleSubmit(e);
            props.fetchData();
            props.loader();
          }}
        >
          UPDATE
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          style={{ padding: "8px 40px" }}
          color="primary"
          disabled
        >
          UPDATE
        </Button>
      );
    }
  };
  return (
    // <div style={{ margin: "1.5rem" }}>
    //   <Container
    //     fixed
    //     style={{
    //       justifyContent: "center",
    //       alignItems: "center",
    //       display: "flex",
    //       width: "100%",
    //     }}
    //   >
    <Grid style={{ width: "100%", margin: "2%" }}>
      <Paper elevation={3}>
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
            fullWidth="True"
            value={auth.userIs}
            autoComplete="off"
          />
          <TextField
            disabled={auth.accessIs === "limited"}
            style={{ marginBottom: "0.8rem" }}
            id="standard"
            label="Transaction ID"
            fullWidth="True"
            onChange={(e) => setTransaction(e.target.value.trim())}
            autoComplete="off"
            value={transaction}
          />
          <TextField
            disabled={auth.accessIs === "limited"}
            style={{ marginBottom: "0.8rem" }}
            id="standard"
            label="Order Number"
            fullWidth="True"
            onChange={(e) => setOrder(e.target.value.trim())}
            autoComplete="off"
            value={order}
          />

          <TextField
            disabled={auth.accessIs === "limited"}
            style={{ marginBottom: "0.8rem" }}
            id="standard"
            label="Amount"
            fullWidth="True"
            onChange={(e) => setAmount(e.target.value.trim())}
            autoComplete="off"
            value={amount}
          />
          <AlertPop
            pop={alertMessage()}
            success="Record updated."
            failure="Record doesn't exist."
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <SubmitButton />
            <Button
              variant="contained"
              color="secondary"
              onClick={props.close}
              style={{ padding: "8px 40px" }}
            >
              CLOSE
            </Button>
          </div>
        </div>
      </Paper>
    </Grid>
    //   </Container>
    // </div>
  );
}

export default ModalUpdate;
