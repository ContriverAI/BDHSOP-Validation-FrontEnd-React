import React, { useState } from "react";
import "./PopUp.css";
import { Container, Paper } from "@material-ui/core/";
import ModalDelete from "./ModalDelete";
import ModalUpdate from "./ModalUpdate";
function PopUp(props) {
  const [modal, setModal] = useState(true);
  return (
    <div
      style={{
        position: "relative",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      <div className="PopUp_container">
        <div className="PopUp_container_box">
          {modal ? (
            <Paper className="box">
              <div className="btn" onClick={() => setModal(false)}>
                UPDATE RECORD
              </div>
              <div
                className="btn"
                onClick={() => setModal(true)}
                style={{ background: "#fdb900", color: "black" }}
              >
                DELETE RECORD
              </div>
            </Paper>
          ) : (
            <Paper className="box">
              <div
                className="btn"
                onClick={() => setModal(false)}
                style={{ background: "#fdb900", color: "black" }}
              >
                UPDATE RECORD
              </div>
              <div className="btn" onClick={() => setModal(true)}>
                DELETE RECORD
              </div>
            </Paper>
          )}
        </div>
      </div>
      <Container
        fixed
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          width: "50%",
          height: "auto",
        }}
      >
        {modal ? (
          <ModalDelete
            close={props.close}
            fetchData={props.dataReload}
            loader={props.loader}
          />
        ) : (
          <ModalUpdate
            close={props.close}
            fetchData={props.dataReload}
            loader={props.loader}
          />
        )}
      </Container>
    </div>
  );
}

export default PopUp;
